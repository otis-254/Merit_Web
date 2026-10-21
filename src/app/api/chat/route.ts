import { NextRequest, NextResponse } from 'next/server'

type IncomingMessage = { sender?: unknown; text?: unknown }

const systemInstruction = 'You are Merit AI, a concise, friendly assistant for Merit Graphics Solutions in Nairobi. Help visitors understand Merit\'s brand identity, UI/UX, motion graphics, print, web, and app-development services. Do not invent prices, timelines, or guarantees. When details require a tailored answer, recommend the contact form or an enquiry.'

function jsonError(error: string, status: number) {
  return NextResponse.json({ error }, { status })
}

function responseText(event: unknown) {
  if (!event || typeof event !== 'object') return ''
  const candidate = (event as { candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }> }).candidates?.[0]
  return candidate?.content?.parts?.map(part => part.text ?? '').join('') ?? ''
}

async function geminiError(response: Response) {
  let providerError: { error?: { message?: string; status?: string } } | undefined
  try {
    providerError = await response.json()
  } catch {
    providerError = undefined
  }

  console.error('Gemini chat request failed:', {
    status: response.status,
    providerStatus: providerError?.error?.status,
    providerMessage: providerError?.error?.message,
  })

  if (response.status === 401 || response.status === 403) {
    return jsonError('Gemini rejected the API key. Check GEMINI_API_KEY and its Google AI Studio restrictions.', 503)
  }
  if (response.status === 404) {
    return jsonError('The configured Gemini model is unavailable. Set GEMINI_MODEL to a model available to this API key.', 503)
  }
  if (response.status === 429) {
    return jsonError('Merit AI is at its Gemini usage limit. Please wait a moment and try again.', 429)
  }
  if (response.status >= 500) {
    return jsonError('Gemini is temporarily unavailable. Please try again shortly.', 503)
  }

  return jsonError('Merit AI could not respond right now. Please try again.', 502)
}

export async function POST(request: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) return jsonError('AI assistant is not configured yet.', 503)

  try {
    const body = await request.json() as { messages?: IncomingMessage[] }
    if (!Array.isArray(body.messages) || body.messages.length === 0 || body.messages.length > 24) {
      return jsonError('Please send a valid conversation.', 400)
    }

    const contents = body.messages.map(message => ({
      role: message.sender === 'bot' ? 'model' : 'user',
      parts: [{ text: typeof message.text === 'string' ? message.text.trim().slice(0, 4000) : '' }],
    })).filter(content => content.parts[0].text)
    if (!contents.length) return jsonError('Please enter a message before sending.', 400)

    const model = process.env.GEMINI_MODEL || 'gemini-3.8-flash'
    if (!/^[a-zA-Z0-9.-]+$/.test(model)) return jsonError('The configured AI model is invalid.', 500)

    const geminiResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:streamGenerateContent?alt=sse`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-goog-api-key': apiKey },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: systemInstruction }] },
        contents,
        generationConfig: { maxOutputTokens: 500, temperature: 0.55 },
      }),
      signal: request.signal,
    })
    if (!geminiResponse.ok || !geminiResponse.body) {
      return geminiError(geminiResponse)
    }

    const encoder = new TextEncoder()
    const decoder = new TextDecoder()
    const stream = new ReadableStream({
      async start(controller) {
        const reader = geminiResponse.body!.getReader()
        let buffer = ''
        const emitEvent = (rawEvent: string) => {
          const data = rawEvent.split('\n').filter(line => line.startsWith('data:')).map(line => line.slice(5).trim()).join('')
          if (!data || data === '[DONE]') return
          try {
            const text = responseText(JSON.parse(data))
            if (text) controller.enqueue(encoder.encode(`${JSON.stringify({ delta: text })}\n`))
          } catch {
            // Ignore malformed upstream events; valid events continue streaming.
          }
        }

        try {
          while (true) {
            const { value, done } = await reader.read()
            if (done) break
            buffer += decoder.decode(value, { stream: true })
            const events = buffer.split('\n\n')
            buffer = events.pop() ?? ''
            events.forEach(emitEvent)
          }
          if (buffer.trim()) emitEvent(buffer)
          controller.enqueue(encoder.encode('{"done":true}\n'))
          controller.close()
        } catch (error) {
          console.error('Gemini chat stream failed:', error)
          controller.error(error)
        } finally {
          reader.releaseLock()
        }
      },
      cancel() {
        geminiResponse.body?.cancel()
      },
    })

    return new Response(stream, {
      headers: { 'Cache-Control': 'no-store', 'Content-Type': 'application/x-ndjson; charset=utf-8' },
    })
  } catch (error) {
    console.error('Merit AI request failed:', error)
    return jsonError('Merit AI could not respond right now. Please try again.', 500)
  }
}
