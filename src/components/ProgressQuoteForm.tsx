'use client'

import { useMemo, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import {
  ArrowLeft, ArrowRight, BadgeDollarSign, BriefcaseBusiness, Check, Clock3,
  FileText, Laptop, Layers3, Palette, Paintbrush, Printer, Smartphone, Target,
  type LucideIcon,
} from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa'
import { buildWhatsAppUrl, businessOptions, calculateQuote, quoteServices, urgencyOptions, validateQuoteStep } from '@/lib/quote'

const steps = [
  { label: 'Services', icon: Target },
  { label: 'Scope', icon: Layers3 },
  { label: 'Timeline', icon: Clock3 },
  { label: 'Business', icon: BriefcaseBusiness },
  { label: 'Review', icon: BadgeDollarSign },
]

const serviceIcons: Record<string, LucideIcon> = {
  logo: Palette,
  brand: Paintbrush,
  social: Smartphone,
  profile: FileText,
  website: Laptop,
  printing: Printer,
}

const focusStyle = 'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500'
const optionStyle = 'rounded-2xl border-2 text-left transition-colors duration-200 ' + focusStyle
const activeStyle = 'border-primary-500 bg-primary-50 dark:bg-primary-500/10'
const inactiveStyle = 'border-gray-200 bg-white hover:border-primary-300 dark:border-gray-700 dark:bg-gray-900 dark:hover:border-primary-500'

function StepHeading({ icon: Icon, eyebrow, title, description }: { icon: LucideIcon; eyebrow: string; title: string; description: string }) {
  return (
    <div className="mb-7 flex items-start gap-3 sm:gap-4">
      <span className="ds-icon-badge"><Icon size={22} aria-hidden="true" /></span>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-primary-600 dark:text-primary-400">{eyebrow}</p>
        <h3 className="mt-1 font-display text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400 sm:text-base">{description}</p>
      </div>
    </div>
  )
}

export function ProgressQuoteForm() {
  const [step, setStep] = useState(1)
  const [direction, setDirection] = useState(1)
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [quantity, setQuantity] = useState('1')
  const [urgency, setUrgency] = useState('normal')
  const [businessType, setBusinessType] = useState('existing')
  const [error, setError] = useState<string | null>(null)
  const reducedMotion = useReducedMotion()

  const selection = useMemo(() => ({
    services: selectedServices,
    quantity: quantity.trim() === '' ? NaN : Number(quantity),
    urgency,
    businessType,
  }), [selectedServices, quantity, urgency, businessType])
  const quote = useMemo(() => calculateQuote(selection), [selection])
  const chosenServices = quoteServices.filter((service) => selectedServices.includes(service.id))
  const chosenUrgency = urgencyOptions.find((option) => option.id === urgency)
  const chosenBusiness = businessOptions.find((option) => option.id === businessType)

  function moveTo(nextStep: number) {
    setDirection(nextStep > step ? 1 : -1)
    setError(null)
    setStep(nextStep)
  }

  function continueToNextStep() {
    const message = validateQuoteStep(step, selection)
    if (message) {
      setError(message)
      return
    }
    moveTo(step + 1)
  }

  return (
    <div className="mx-auto max-w-5xl rounded-[2rem] bg-gray-50 px-4 py-8 text-gray-900 shadow-sm dark:bg-gray-800 dark:text-white sm:px-8 sm:py-12">
      <div className="mb-8 text-center sm:mb-10">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-primary-600 dark:text-primary-400">Free instant estimate</p>
        <h2 className="ds-section-title">Build your project quote</h2>
        <p className="ds-section-intro mx-auto mt-3 max-w-xl">Tell us a little about your project, then review your estimate before contacting our team.</p>

        <ol aria-label="Quotation progress" className="mx-auto mt-8 grid max-w-2xl grid-cols-5 gap-1 sm:gap-3">
          {steps.map(({ label, icon: Icon }, index) => {
            const current = index + 1 === step
            const complete = index + 1 < step
            return (
              <li key={label} aria-current={current ? 'step' : undefined} className="flex min-w-0 flex-col items-center gap-1.5 text-[10px] font-semibold sm:text-xs">
                <span className={`flex h-9 w-9 items-center justify-center rounded-full transition-colors duration-200 sm:h-10 sm:w-10 ${current ? 'bg-primary-500 text-white shadow-md shadow-primary-500/25' : complete ? 'bg-primary-100 text-primary-700 dark:bg-primary-500/20 dark:text-primary-300' : 'bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-400'}`}>
                  {complete ? <Check size={17} aria-hidden="true" /> : <Icon size={17} aria-hidden="true" />}
                </span>
                <span className={`truncate ${current ? 'text-primary-600 dark:text-primary-400' : 'text-gray-500 dark:text-gray-400'}`}>{label}</span>
              </li>
            )
          })}
        </ol>
        <p className="sr-only" aria-live="polite">Step {step} of {steps.length}: {steps[step - 1].label}</p>
      </div>

      <div className="ds-card overflow-hidden shadow-xl">
        <div className="min-h-[340px] p-5 sm:p-8 md:p-10">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={step}
              initial={reducedMotion ? { opacity: 0 } : { opacity: 0, x: direction * 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reducedMotion ? { opacity: 0 } : { opacity: 0, x: direction * -16 }}
              transition={{ duration: reducedMotion ? 0 : 0.2, ease: 'easeOut' }}
            >
              {step === 1 && (
                <div>
                  <StepHeading icon={Target} eyebrow="Step 1 · Services" title="What do you need?" description="Choose one or more services. The prices shown are starting estimates." />
                  <div className="grid grid-cols-2 gap-3 lg:grid-cols-3" aria-label="Select services">
                    {quoteServices.map((service) => {
                      const active = selectedServices.includes(service.id)
                      const Icon = serviceIcons[service.id]
                      return (
                        <button key={service.id} type="button" aria-pressed={active} onClick={() => {
                          setSelectedServices((current) => active ? current.filter((id) => id !== service.id) : [...current, service.id])
                          setError(null)
                        }} className={`${optionStyle} ${active ? activeStyle : inactiveStyle} relative min-h-[126px] p-4 sm:p-5`}>
                          <Icon className="mb-3 text-primary-500" size={22} aria-hidden="true" />
                          <span className="block text-sm font-semibold text-gray-900 dark:text-white sm:text-base">{service.name}</span>
                          <span className="mt-1 block text-xs text-gray-500 dark:text-gray-400">From KSh {service.min.toLocaleString('en-KE')}</span>
                          {active && <span className="absolute right-3 top-3 rounded-full bg-primary-500 p-1 text-white"><Check size={13} aria-hidden="true" /></span>}
                        </button>
                      )
                    })}
                  </div>
                  <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">{selectedServices.length ? `${selectedServices.length} ${selectedServices.length === 1 ? 'service' : 'services'} selected` : 'Select at least one service to continue.'}</p>
                </div>
              )}

              {step === 2 && (
                <div>
                  <StepHeading icon={Layers3} eyebrow="Step 2 · Scope" title="How much do you need?" description="Choose the approximate number of items or deliverables per selected service." />
                  <div className="grid grid-cols-4 gap-2 sm:max-w-lg sm:gap-3">
                    {[1, 2, 3, 5].map((value) => (
                      <button key={value} type="button" aria-pressed={Number(quantity) === value} onClick={() => { setQuantity(String(value)); setError(null) }} className={`${optionStyle} ${Number(quantity) === value ? activeStyle : inactiveStyle} py-4 text-center text-lg font-semibold text-gray-900 dark:text-white`}>{value}</button>
                    ))}
                  </div>
                  <div className="mt-6 max-w-xs">
                    <label htmlFor="quote-quantity" className="block text-sm font-semibold text-gray-900 dark:text-white">Or enter a quantity</label>
                    <input id="quote-quantity" type="number" inputMode="numeric" min="1" max="100" step="1" value={quantity} onChange={(event) => { setQuantity(event.target.value); setError(null) }} aria-invalid={Boolean(error)} aria-describedby={error ? 'quote-quantity-help quote-error' : 'quote-quantity-help'} className="ds-field mt-2" />
                    <p id="quote-quantity-help" className="mt-2 text-xs leading-relaxed text-gray-500 dark:text-gray-400">Enter a whole number from 1 to 100. The same quantity is applied to each service.</p>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div>
                  <StepHeading icon={Clock3} eyebrow="Step 3 · Timeline" title="When do you need it?" description="Choose your preferred turnaround. Rush work adds a priority fee to the estimate." />
                  <div className="grid gap-3 sm:grid-cols-3">
                    {urgencyOptions.map((option) => (
                      <button key={option.id} type="button" aria-pressed={urgency === option.id} onClick={() => { setUrgency(option.id); setError(null) }} className={`${optionStyle} ${urgency === option.id ? activeStyle : inactiveStyle} p-5`}>
                        <span className="block font-semibold text-gray-900 dark:text-white">{option.name}</span>
                        <span className="mt-2 block text-sm text-gray-500 dark:text-gray-400">{option.detail}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 4 && (
                <div>
                  <StepHeading icon={BriefcaseBusiness} eyebrow="Step 4 · Business" title="Tell us about your business" description="Select the option that best describes your business. Startups receive a 10% discount in this estimate." />
                  <div className="grid gap-3 sm:grid-cols-2">
                    {businessOptions.map((option) => (
                      <button key={option.id} type="button" aria-pressed={businessType === option.id} onClick={() => { setBusinessType(option.id); setError(null) }} className={`${optionStyle} ${businessType === option.id ? activeStyle : inactiveStyle} p-5`}>
                        <span className="block font-semibold text-gray-900 dark:text-white">{option.name}</span>
                        <span className="mt-2 block text-sm text-gray-500 dark:text-gray-400">{option.detail}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 5 && (
                <div>
                  <StepHeading icon={BadgeDollarSign} eyebrow="Step 5 · Review" title="Review your project" description="Check the details below. You can edit any answer before requesting an exact quotation." />
                  <div className="grid gap-5 md:grid-cols-[1fr_0.9fr]">
                    <dl className="divide-y divide-gray-100 rounded-2xl border border-gray-200 px-4 dark:divide-gray-700 dark:border-gray-700 sm:px-5">
                      {[
                        { label: 'Services', value: chosenServices.map((service) => service.name).join(', '), editStep: 1 },
                        { label: 'Quantity per service', value: String(quantity), editStep: 2 },
                        { label: 'Timeline', value: `${chosenUrgency?.name} · ${chosenUrgency?.detail}`, editStep: 3 },
                        { label: 'Business', value: chosenBusiness?.name ?? '', editStep: 4 },
                      ].map((item) => (
                        <div key={item.label} className="flex items-start justify-between gap-3 py-4">
                          <div className="min-w-0"><dt className="text-xs font-medium text-gray-500 dark:text-gray-400">{item.label}</dt><dd className="mt-1 break-words text-sm font-semibold text-gray-900 dark:text-white">{item.value}</dd></div>
                          <button type="button" onClick={() => moveTo(item.editStep)} aria-label={`Edit ${item.label.toLowerCase()}`} className={`shrink-0 rounded-md text-sm font-semibold text-primary-600 hover:text-primary-700 dark:text-primary-400 ${focusStyle}`}>Edit</button>
                        </div>
                      ))}
                    </dl>
                    <div className="rounded-2xl bg-gradient-to-br from-primary-600 via-primary-500 to-secondary-500 p-5 text-white sm:p-6">
                      <p className="text-xs font-semibold uppercase tracking-wider text-white/80">Estimated project cost</p>
                      <p className="mt-3 text-2xl font-bold leading-tight sm:text-3xl">KSh {quote.min.toLocaleString('en-KE')} – {quote.max.toLocaleString('en-KE')}</p>
                      <p className="mt-4 text-sm leading-relaxed text-white/85">This is an estimate. Your exact quotation will depend on your project details.</p>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
          {error && <p id="quote-error" role="alert" className="mt-5 text-sm font-medium text-red-700 dark:text-red-400">{error}</p>}
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-gray-200 bg-gray-50 px-5 py-4 dark:border-gray-700 dark:bg-gray-800 sm:px-8">
          <button type="button" onClick={() => moveTo(step - 1)} disabled={step === 1} className={`inline-flex min-h-11 items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-gray-600 transition-colors hover:text-gray-900 disabled:invisible dark:text-gray-300 dark:hover:text-white ${focusStyle}`}><ArrowLeft size={18} aria-hidden="true" /> Back</button>
          {step < 5 ? (
            <button type="button" onClick={continueToNextStep} className="btn-primary">{step === 4 ? 'Review quote' : 'Continue'} <ArrowRight size={18} aria-hidden="true" /></button>
          ) : (
            <a href={buildWhatsAppUrl(selection)} target="_blank" rel="noopener noreferrer" className="btn-primary text-center"><FaWhatsapp size={19} aria-hidden="true" /> Request quote on WhatsApp</a>
          )}
        </div>
      </div>
    </div>
  )
}
