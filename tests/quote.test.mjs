import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import ts from 'typescript'

const source = await readFile(new URL('../src/lib/quote.ts', import.meta.url), 'utf8')
const javascript = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2020 } }).outputText
const { buildWhatsAppUrl, calculateQuote, validateQuoteStep } = await import(`data:text/javascript;base64,${Buffer.from(javascript).toString('base64')}`)

const selection = {
  services: ['logo'],
  quantity: 2,
  urgency: 'rush',
  businessType: 'startup',
}

test('requires at least one known service before continuing', () => {
  assert.ok(validateQuoteStep(1, { ...selection, services: [] }))
  assert.ok(validateQuoteStep(1, { ...selection, services: ['unknown'] }))
  assert.equal(validateQuoteStep(1, selection), null)
})

test('rejects incomplete, fractional, and out-of-range quantities', () => {
  for (const quantity of [0, 1.5, 101, Number.NaN]) {
    assert.ok(validateQuoteStep(2, { ...selection, quantity }))
  }
  assert.equal(validateQuoteStep(2, selection), null)
})

test('rejects unknown timeline and business options', () => {
  assert.ok(validateQuoteStep(3, { ...selection, urgency: 'unknown' }))
  assert.ok(validateQuoteStep(4, { ...selection, businessType: 'unknown' }))
})

test('calculates rounded estimates using scope, urgency and business discounts', () => {
  assert.deepEqual(calculateQuote(selection), { min: 11000, max: 33500 })
  assert.deepEqual(calculateQuote({ ...selection, services: ['logo', 'website'], quantity: 1, urgency: 'normal', businessType: 'existing' }), { min: 30000, max: 95000 })
})

test('WhatsApp handoff includes readable review details and the estimate', () => {
  const url = new URL(buildWhatsAppUrl(selection))
  assert.equal(url.origin, 'https://wa.me')
  assert.equal(url.pathname, '/254714531574')
  const message = url.searchParams.get('text')
  assert.match(message, /Logo Design/)
  assert.match(message, /2/)
  assert.match(message, /Rush.*3–7 days/)
  assert.match(message, /Startup/)
  assert.match(message, /11,000.*33,500/)
})
