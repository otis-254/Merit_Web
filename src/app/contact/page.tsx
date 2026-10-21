'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { MainLayout } from '../../components/layout/main-layout'
import { FaCheckCircle } from 'react-icons/fa'
import { FileText, Laptop, Palette, Paintbrush, Printer, Smartphone } from 'lucide-react'

const schema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup.string().matches(/^[0-9-+()]*$/, 'Invalid phone number').optional(),
  company: yup.string().optional(),
  message: yup.string().required('Message is required').min(10, 'Message must be at least 10 characters'),
  service: yup.string().required('Please select a service'),
}).required()

type FormData = yup.InferType<typeof schema>

const services = [
  { id: 'branding', name: 'Brand Identity' },
  { id: 'ui-ux', name: 'UI/UX Design' },
  { id: 'motion', name: 'Motion Graphics' },
  { id: 'print', name: 'Print Design' },
]

const quoteServices = [
  { id: 'logo', name: 'Logo Design', baseMin: 5000, baseMax: 15000, icon: Palette, description: 'Unique logo design with multiple concepts' },
  { id: 'brand', name: 'Brand Identity', baseMin: 15000, baseMax: 40000, icon: Paintbrush, description: 'Complete brand guidelines & identity system' },
  { id: 'social', name: 'Social Media Package', baseMin: 10000, baseMax: 25000, icon: Smartphone, description: 'Monthly social media graphics & content' },
  { id: 'profile', name: 'Company Profile', baseMin: 8000, baseMax: 20000, icon: FileText, description: 'Professional company profile / brochure' },
  { id: 'website', name: 'Website', baseMin: 25000, baseMax: 80000, icon: Laptop, description: 'Responsive modern website design' },
  { id: 'printing', name: 'Printing', baseMin: 3000, baseMax: 15000, icon: Printer, description: 'Business cards, banners, flyers & more' },
]

const urgencyLevels = [
  { id: 'normal', name: 'Normal (7–14 days)', multiplier: 1, description: 'Standard turnaround' },
  { id: 'rush', name: 'Rush (3–7 days)', multiplier: 1.3, description: '+30% expedited fee' },
  { id: 'urgent', name: 'Urgent (1–2 days)', multiplier: 1.6, description: '+60% priority fee' },
]

const businessTypes = [
  { id: 'startup', name: 'Startup', multiplier: 0.9, description: '10% startup discount' },
  { id: 'existing', name: 'Existing Business', multiplier: 1, description: 'Standard pricing' },
]

type QuoteSelection = {
  services: string[]
  quantity: number
  urgency: string
  businessType: string
}

function calculateQuote(selection: QuoteSelection) {
  if (selection.services.length === 0) {
    return { min: 0, max: 0 }
  }
  let totalMin = 0
  let totalMax = 0
  for (const sid of selection.services) {
    const svc = quoteServices.find(s => s.id === sid)
    if (svc) {
      totalMin += svc.baseMin
      totalMax += svc.baseMax
    }
  }
  const qty = selection.quantity
  let qtyMult = 1
  if (qty === 1) qtyMult = 1
  else if (qty === 2) qtyMult = 1.9
  else if (qty === 3) qtyMult = 2.7
  else qtyMult = qty * 0.85 + 0.4
  const urg = urgencyLevels.find(u => u.id === selection.urgency) || urgencyLevels[0]
  const biz = businessTypes.find(b => b.id === selection.businessType) || businessTypes[1]
  const min = Math.round(totalMin * qtyMult * urg.multiplier * biz.multiplier / 500) * 500
  const max = Math.round(totalMax * qtyMult * urg.multiplier * biz.multiplier / 500) * 500
  return { min, max }
}

function buildWhatsAppMessage(selection: QuoteSelection, quote: { min: number; max: number }) {
  const svcs = selection.services
    .map(id => {
      const s = quoteServices.find(q => q.id === id)
      return s ? `– ${s.name}` : ''
    })
    .filter(Boolean)
    .join('%0A')
  const urg = urgencyLevels.find(u => u.id === selection.urgency)
  const biz = businessTypes.find(b => b.id === selection.businessType)
  const range = quote.min && quote.max
    ? `KSh ${quote.min.toLocaleString()} – ${quote.max.toLocaleString()}`
    : 'To be confirmed'
  return `Hello Merit Graphics! I'd like to request a design quote.%0A%0A*Services needed:*%0A${svcs}%0A%0A*Quantity/Scope:* ${selection.quantity}%0A*Urgency:* ${urg?.name || 'Normal'}%0A*Business:* ${biz?.name || 'Existing Business'}%0A%0A*Estimated range:* ${range}%0A%0APlease send me the exact quotation. Thank you!`
}

export default function Contact() {
  const [formReady, setFormReady] = useState(false)
  useEffect(() => setFormReady(true), [])
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(schema) as any,
  })

  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const successCloseRef = useRef<HTMLButtonElement>(null)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [quoteSelection, setQuoteSelection] = useState<QuoteSelection>({
    services: [],
    quantity: 1,
    urgency: 'normal',
    businessType: 'existing',
  })
  const quote = calculateQuote(quoteSelection)
  const whatsappNumber = '254714531574'
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${buildWhatsAppMessage(quoteSelection, quote)}`

  const onSubmit = async (data: FormData) => {
    try {
      setSubmitError(null)
      
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit form')
      }

      setShowSuccessModal(true)
      reset()
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitError('There was an error submitting your message. Please try again.')
    }
  }

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative py-40 overflow-hidden">
        <div
          className="absolute inset-0 bg-center bg-cover bg-no-repeat"
          style={{
            backgroundImage:
              "url('/brands/Get-in-touch.jpg')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/65 via-gray-900/50 to-black/65" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/30" />
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mt-20"
          >
            {/* Decorative Element */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="absolute -inset-1 bg-white/20 rounded-full blur-xl" />
                <div className="relative flex items-center justify-center w-24 h-24 bg-white/10 rounded-full backdrop-blur-sm">
                  <svg
                    className="w-12 h-12 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <h1 className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
              Get in Touch
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-white/90">
              Have a project in mind? Let's discuss how we can help bring your vision to life.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="bg-white py-24 dark:bg-gray-900">
        <div className="container">
          <div className="mx-auto max-w-5xl">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.1fr_1.2fr] lg:items-start">
              <div className="ds-card p-6 md:p-8">
                <h2 className="font-display text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
                  Contact Information
                </h2>
                <p className="mt-4 max-w-md text-lg leading-relaxed text-slate-600 dark:text-gray-400">
                  Tell us about your project, or reach us using the details below.
                </p>

                <div className="mt-10 space-y-7">
                  <div className="flex items-center gap-4 text-lg text-slate-700 dark:text-gray-200">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full border border-orange-200 bg-orange-50 text-orange-500">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
                        <path d="M4 7.5A2.5 2.5 0 0 1 6.5 5h11A2.5 2.5 0 0 1 20 7.5v9A2.5 2.5 0 0 1 17.5 19h-11A2.5 2.5 0 0 1 4 16.5v-9Z" />
                        <path d="m5 7 7 5 7-5" />
                      </svg>
                    </span>
                    <a className="min-w-0 break-all hover:text-primary-600 dark:hover:text-primary-400" href="mailto:meritmediapro007@gmail.com">meritmediapro007@gmail.com</a>
                  </div>

                  <div className="flex items-center gap-4 text-lg text-slate-700 dark:text-gray-200">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full border border-orange-200 bg-orange-50 text-orange-500">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.86 19.86 0 0 1 3.08 4.18 2 2 0 0 1 5.06 2h3a2 2 0 0 1 2 1.72c.13.89.5 1.75 1.1 2.47l-1.3 1.3a15.9 15.9 0 0 0 7.48 7.48l1.3-1.3c.72.6 1.58 1 2.47 1.1A2 2 0 0 1 22 16.92Z" />
                      </svg>
                    </span>
                    <a className="hover:text-primary-600 dark:hover:text-primary-400" href="tel:+254714531574">(+254) 714-531 574</a>
                  </div>

                  <div className="flex items-center gap-4 text-lg text-slate-700 dark:text-gray-200">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full border border-orange-200 bg-orange-50 text-orange-500">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
                        <path d="M12 21s6-5.5 6-11a6 6 0 1 0-12 0c0 5.5 6 11 6 11Z" />
                        <circle cx="12" cy="10" r="2.5" />
                      </svg>
                    </span>
                    <a className="hover:text-primary-600 dark:hover:text-primary-400" href="https://www.google.com/maps/search/?api=1&query=Roysambu%2C+Nairobi" target="_blank" rel="noopener noreferrer">Roysambu, Nairobi</a>
                  </div>
                </div>

                <div className="mt-12">
                  <h3 className="font-display text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                    Follow Us
                  </h3>
                  <div className="mt-5 flex flex-wrap gap-6 text-xl text-slate-700 dark:text-gray-200">
                    <a href="https://www.instagram.com/meritgraphics_254?igsh=Z2M1dHM1eXdkYTB4&utm_source=qr" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-primary-600 dark:hover:text-primary-400">
                      Instagram
                    </a>
                    <a href="https://www.facebook.com/profile.php?id=100084530301305" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-primary-600 dark:hover:text-primary-400">
                      Facebook
                    </a>
                  </div>
                </div>
              </div>

              <div className="ds-card p-6 md:p-8">
                <form noValidate onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <p className="text-sm text-slate-600 dark:text-gray-400">Fields marked <span aria-hidden="true">*</span> are required.</p>
                  <fieldset disabled={!formReady || isSubmitting} className="space-y-5">
                  <div>
                    <label htmlFor="name" className="mb-2 block text-base font-medium text-slate-700 dark:text-gray-200">
                      Name <span aria-hidden="true">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? 'name-error' : undefined}
                      {...register('name')}
                      className="ds-field"
                    />
                    {errors.name && (
                      <p id="name-error" className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="mb-2 block text-base font-medium text-slate-700 dark:text-gray-200">
                      Email <span aria-hidden="true">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                      {...register('email')}
                      className="ds-field"
                    />
                    {errors.email && (
                      <p id="email-error" className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="phone" className="mb-2 block text-base font-medium text-slate-700 dark:text-gray-200">
                      Phone (optional)
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      aria-invalid={!!errors.phone}
                      aria-describedby={errors.phone ? 'phone-error' : undefined}
                      {...register('phone')}
                      className="ds-field"
                    />
                    {errors.phone && (
                      <p id="phone-error" className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.phone.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="company" className="mb-2 block text-base font-medium text-slate-700 dark:text-gray-200">
                      Company (optional)
                    </label>
                    <input
                      type="text"
                      id="company"
                      {...register('company')}
                      className="ds-field"
                    />
                  </div>

                  <div>
                    <label htmlFor="service" className="mb-2 block text-base font-medium text-slate-700 dark:text-gray-200">
                      Service Interested In <span aria-hidden="true">*</span>
                    </label>
                    <select
                      id="service"
                      required
                      aria-invalid={!!errors.service}
                      aria-describedby={errors.service ? 'service-error' : undefined}
                      {...register('service')}
                      className="ds-field"
                    >
                      <option value="">Select a service</option>
                      {services.map((service) => (
                        <option key={service.id} value={service.id}>
                          {service.name}
                        </option>
                      ))}
                    </select>
                    {errors.service && (
                      <p id="service-error" className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.service.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="message" className="mb-2 block text-base font-medium text-slate-700 dark:text-gray-200">
                      Message <span aria-hidden="true">*</span>
                    </label>
                    <textarea
                      id="message"
                      required
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? 'message-error' : undefined}
                      rows={5}
                      {...register('message')}
                      className="ds-field"
                    />
                    {errors.message && (
                      <p id="message-error" className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.message.message}</p>
                    )}
                  </div>

                  <div className="pt-2">
                    <span role="status" aria-live="polite" className="sr-only">{isSubmitting ? 'Sending your message...' : ''}</span>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-primary w-full"
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                      <svg
                        className="h-4 w-4 rotate-45"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9-2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </button>
                    {submitError && (
                      <p role="alert" className="mt-3 text-center text-sm text-red-600 dark:text-red-400">{submitError}</p>
                    )}
                  </div>
                  </fieldset>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Modal */}
      <Dialog open={showSuccessModal} onClose={() => setShowSuccessModal(false)} initialFocus={successCloseRef} className="fixed inset-0 z-50">
        <DialogBackdrop className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
        <div className="fixed inset-0 flex items-center justify-center overflow-y-auto p-4">
            <DialogPanel className="bg-white dark:bg-gray-900 rounded-2xl max-w-md w-full p-8 text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <FaCheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
              </div>
              <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Message Sent Successfully!
              </DialogTitle>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Thank you for reaching out to Merit Graphics Solutions.
              </p>
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-6">
                <p className="text-sm text-blue-800 dark:text-blue-300 font-medium">
                  We have received your message and will be in touch.
                </p>
              </div>
              <button
                ref={successCloseRef}
                data-autofocus
                onClick={() => setShowSuccessModal(false)}
                className="btn-primary w-full"
              >
                Close
              </button>
            </DialogPanel>
        </div>
      </Dialog>
    </MainLayout>
  )
}
