'use client'

import { FormEvent, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import AIOrbFace from './smoothui/ai-orb-face'

type ChatMood = 'idle' | 'listening' | 'thinking' | 'streaming' | 'done' | 'error'

type ChatMessage = {
  id: string
  sender: 'user' | 'bot'
  text: string
}

const chatStorageKey = 'merit-ai-chat-v1'

const moodCopy: Record<ChatMood, { label: string; detail: string }> = {
  idle: { label: 'idle', detail: 'Ready when you are' },
  listening: { label: 'listening', detail: 'Listening' },
  thinking: { label: 'thinking', detail: 'Thinking through your question' },
  streaming: { label: 'responding', detail: 'Writing a response' },
  done: { label: 'done', detail: 'Ready for your next question' },
  error: { label: 'unavailable', detail: 'Something went wrong' },
}

function AiOrb({ mood, compact = false }: { mood: ChatMood; compact?: boolean }) {
  const copy = moodCopy[mood]

  return (
    <AIOrbFace
      aria-label={`Merit AI is ${copy.label}`}
      className={compact ? 'merit-ai-orb merit-ai-orb--compact' : 'merit-ai-orb'}
      colors={{ body: '#f97316', bodyEdge: '#ffedd5', feature: '#431407' }}
      gaze={!compact}
      size={compact ? 58 : 46}
      state={mood}
    />
  )
}

function getErrorMessage(body: unknown) {
  if (typeof body === 'object' && body && 'error' in body && typeof body.error === 'string') {
    return body.error
  }

  return 'Merit AI could not respond right now. Please try again.'
}

function storedMessages(value: unknown): ChatMessage[] {
  if (!Array.isArray(value)) return []

  return value
    .filter((item): item is ChatMessage => (
      typeof item === 'object' && item !== null &&
      'id' in item && typeof item.id === 'string' &&
      'sender' in item && (item.sender === 'user' || item.sender === 'bot') &&
      'text' in item && typeof item.text === 'string' && item.text.trim().length > 0
    ))
    .slice(-20)
}

export const LiveChat = () => {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [mood, setMood] = useState<ChatMood>('idle')
  const [error, setError] = useState<string | null>(null)
  const [isSending, setIsSending] = useState(false)
  const [hasRestoredMessages, setHasRestoredMessages] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const messageListRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isChatOpen) inputRef.current?.focus()
  }, [isChatOpen])

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(chatStorageKey)
      if (saved) setMessages(storedMessages(JSON.parse(saved)))
    } catch {
      window.localStorage.removeItem(chatStorageKey)
    } finally {
      setHasRestoredMessages(true)
    }
  }, [])

  useEffect(() => {
    if (!hasRestoredMessages) return

    try {
      const completeMessages = messages.filter(item => item.text.trim()).slice(-20)
      window.localStorage.setItem(chatStorageKey, JSON.stringify(completeMessages))
    } catch {
      // Storage can be unavailable in privacy-restricted browsers; chat remains usable for this visit.
    }
  }, [hasRestoredMessages, messages])

  useEffect(() => {
    messageListRef.current?.scrollTo({ top: messageListRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, isSending])

  const toggleChat = () => {
    setIsChatOpen(open => {
      const next = !open
      setMood(next ? 'listening' : 'idle')
      if (next) setError(null)
      return next
    })
  }

  const handleSendMessage = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const text = message.trim()
    if (!text || isSending) return

    const userMessage: ChatMessage = { id: crypto.randomUUID(), text, sender: 'user' }
    const botMessageId = crypto.randomUUID()
    const conversation = [...messages, userMessage].map(({ sender, text: messageText }) => ({ sender, text: messageText }))

    setMessages(current => [...current, userMessage, { id: botMessageId, sender: 'bot', text: '' }])
    setMessage('')
    setError(null)
    setIsSending(true)
    setMood('thinking')

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: conversation }),
      })

      if (!response.ok || !response.body) {
        let body: unknown
        try {
          body = await response.json()
        } catch {
          body = undefined
        }
        throw new Error(getErrorMessage(body))
      }

      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let buffer = ''
      let receivedResponse = false

      const appendChunk = (chunk: string) => {
        if (!chunk) return
        receivedResponse = true
        setMood('streaming')
        setMessages(current => current.map(item => item.id === botMessageId ? { ...item, text: item.text + chunk } : item))
      }

      while (true) {
        const { value, done } = await reader.read()
        if (done) break

        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n')
        buffer = lines.pop() ?? ''
        for (const line of lines) {
          if (!line.trim()) continue
          const streamEvent = JSON.parse(line) as { delta?: string }
          if (streamEvent.delta) appendChunk(streamEvent.delta)
        }
      }

      if (buffer.trim()) {
        const streamEvent = JSON.parse(buffer) as { delta?: string }
        if (streamEvent.delta) appendChunk(streamEvent.delta)
      }

      if (!receivedResponse) throw new Error('Merit AI returned an empty response. Please try again.')
      setMood('done')
    } catch (caughtError) {
      const errorMessage = caughtError instanceof Error ? caughtError.message : 'Merit AI could not respond right now. Please try again.'
      setMessages(current => current.filter(item => item.id !== botMessageId))
      setError(errorMessage)
      setMood('error')
    } finally {
      setIsSending(false)
    }
  }

  const copy = moodCopy[mood]

  return (
    <>
      <motion.button
        aria-label={isChatOpen ? 'Close AI assistant' : 'Open AI assistant'}
        animate={{ opacity: 1, scale: 1 }}
        className="fixed bottom-5 right-5 z-50 grid h-16 w-16 place-items-center rounded-full border-0 bg-transparent shadow-none transition-transform focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
        initial={{ opacity: 0, scale: 0.8 }}
        onClick={toggleChat}
        type="button"
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
      >
        <AiOrb mood={isChatOpen ? mood : 'idle'} compact />
      </motion.button>

      <AnimatePresence>
        {isChatOpen && (
          <motion.section
            aria-label="Merit AI assistant"
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="fixed bottom-24 right-4 z-50 flex h-[min(36rem,calc(100dvh-7rem))] w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-2xl dark:border-gray-700 dark:bg-gray-900 sm:right-6"
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
          >
            <header className="flex items-center gap-3 bg-slate-950 px-4 py-3 text-white">
              <AiOrb mood={mood} />
              <div className="min-w-0 flex-1">
                <h2 className="text-sm font-semibold">Merit AI</h2>
                <p className="truncate text-xs text-white/70">{copy.detail}</p>
              </div>
              <span aria-live="polite" className="rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-medium text-white/90" role="status">
                {copy.detail}
              </span>
            </header>

            <div ref={messageListRef} className="flex-1 space-y-3 overflow-y-auto p-4" role="log" aria-live="polite">
              {messages.length === 0 && !error && (
                <div className="rounded-2xl border border-primary-100 bg-primary-50 p-3 text-sm leading-6 text-primary-900 dark:border-primary-500/20 dark:bg-primary-500/10 dark:text-primary-100">
                  Hi, I&apos;m Merit AI. Ask about our design, print, motion, or web services.
                </div>
              )}
              {messages.map(item => (
                <div key={item.id} className={`flex ${item.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {item.sender === 'bot' && !item.text && isSending ? (
                    <div className="ai-loader" aria-label="Merit AI is thinking">
                      <span />
                      <span />
                      <span />
                      <span className="ai-loader__label">Thinking</span>
                    </div>
                  ) : (
                    <p className={`max-w-[86%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-sm leading-6 ${item.sender === 'user' ? 'rounded-br-md bg-primary-700 text-white' : 'rounded-bl-md bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100'}`}>
                      {item.text}
                    </p>
                  )}
                </div>
              ))}
              {error && <p className="rounded-2xl border border-red-200 bg-red-50 px-3.5 py-2.5 text-sm leading-6 text-red-800 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-100" role="alert">{error}</p>}
            </div>

            <form className="border-t border-gray-200 p-3 dark:border-gray-700" onSubmit={handleSendMessage}>
              <label className="sr-only" htmlFor="merit-ai-message">Message Merit AI</label>
              <div className="flex items-center gap-2">
                <input
                  aria-label="Message Merit AI"
                  className="min-w-0 flex-1 rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-200 disabled:cursor-not-allowed disabled:opacity-60 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:ring-primary-900"
                  disabled={isSending}
                  id="merit-ai-message"
                  onBlur={() => !isSending && setMood(messages.some(item => item.sender === 'bot') ? 'done' : 'idle')}
                  onChange={event => {
                    setMessage(event.target.value)
                    if (!isSending) setMood('listening')
                  }}
                  onFocus={() => !isSending && setMood('listening')}
                  placeholder="Ask Merit AI..."
                  ref={inputRef}
                  value={message}
                />
                <button className="inline-flex h-11 shrink-0 items-center justify-center rounded-xl bg-primary-700 px-3.5 text-sm font-semibold text-white transition-colors hover:bg-primary-800 disabled:cursor-not-allowed disabled:opacity-60" disabled={isSending || !message.trim()} type="submit">
                  <span className="sr-only">Send message</span>
                  <svg aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="m22 2-7 20-4-9-9-4Z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                    <path d="M22 2 11 13" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  </svg>
                </button>
              </div>
            </form>
          </motion.section>
        )}
      </AnimatePresence>
    </>
  )
}
