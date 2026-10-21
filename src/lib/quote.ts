export const quoteServices = [
  { id: 'logo', name: 'Logo Design', min: 5000, max: 15000 },
  { id: 'brand', name: 'Brand Identity', min: 15000, max: 40000 },
  { id: 'social', name: 'Social Media', min: 10000, max: 25000 },
  { id: 'profile', name: 'Company Profile', min: 8000, max: 20000 },
  { id: 'website', name: 'Website', min: 25000, max: 80000 },
  { id: 'printing', name: 'Printing', min: 3000, max: 15000 },
] as const

export const urgencyOptions = [
  { id: 'normal', name: 'Standard', detail: '7–14 days', multiplier: 1 },
  { id: 'rush', name: 'Rush', detail: '3–7 days · +30%', multiplier: 1.3 },
  { id: 'urgent', name: 'Urgent', detail: '1–2 days · +60%', multiplier: 1.6 },
] as const

export const businessOptions = [
  { id: 'startup', name: 'Startup', detail: '10% startup discount', multiplier: 0.9 },
  { id: 'existing', name: 'Existing business', detail: 'Standard pricing', multiplier: 1 },
] as const

export type QuoteSelection = {
  services: string[]
  quantity: number
  urgency: string
  businessType: string
}

export function validateQuoteStep(step: number, selection: QuoteSelection): string | null {
  if (step === 1 && (!selection.services.length || selection.services.some((id) => !quoteServices.some((service) => service.id === id)))) {
    return 'Select at least one service to continue.'
  }
  if (step === 2 && (!Number.isInteger(selection.quantity) || selection.quantity < 1 || selection.quantity > 100)) {
    return 'Enter a whole number from 1 to 100.'
  }
  if (step === 3 && !urgencyOptions.some((option) => option.id === selection.urgency)) {
    return 'Select a timeline to continue.'
  }
  if (step === 4 && !businessOptions.some((option) => option.id === selection.businessType)) {
    return 'Select a business type to continue.'
  }
  return null
}

export function calculateQuote(selection: QuoteSelection): { min: number; max: number } {
  const selected = quoteServices.filter((service) => selection.services.includes(service.id))
  const urgencyMultiplier = urgencyOptions.find((option) => option.id === selection.urgency)?.multiplier ?? 1
  const businessMultiplier = businessOptions.find((option) => option.id === selection.businessType)?.multiplier ?? 1
  const quantityMultiplier = selection.quantity === 1 ? 1 : selection.quantity === 2 ? 1.9 : selection.quantity === 3 ? 2.7 : selection.quantity * 0.85 + 0.4
  const round = (value: number) => Math.round(value * quantityMultiplier * urgencyMultiplier * businessMultiplier / 500) * 500
  return {
    min: round(selected.reduce((sum, service) => sum + service.min, 0)),
    max: round(selected.reduce((sum, service) => sum + service.max, 0)),
  }
}

export function buildWhatsAppUrl(selection: QuoteSelection): string {
  const services = quoteServices.filter((service) => selection.services.includes(service.id)).map((service) => `- ${service.name}`).join('\n')
  const urgency = urgencyOptions.find((option) => option.id === selection.urgency)
  const business = businessOptions.find((option) => option.id === selection.businessType)
  const quote = calculateQuote(selection)
  const message = `Hello Merit Graphics! I'd like an exact quotation.\n\nServices:\n${services}\n\nQuantity per service: ${selection.quantity}\nTimeline: ${urgency?.name} (${urgency?.detail})\nBusiness type: ${business?.name}\nEstimated range: KSh ${quote.min.toLocaleString('en-KE')} – ${quote.max.toLocaleString('en-KE')}\n\nPlease let me know the next steps.`
  return `https://wa.me/254714531574?text=${encodeURIComponent(message)}`
}
