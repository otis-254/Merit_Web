'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { MainLayout } from '../../components/layout/main-layout'
import { FaCheckCircle } from 'react-icons/fa'

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
  { id: 'logo', name: 'Logo Design', baseMin: 5000, baseMax: 15000, icon: '🎨', description: 'Unique logo design with multiple concepts' },
  { id: 'brand', name: 'Brand Identity', baseMin: 15000, baseMax: 40000, icon: '✨', description: 'Complete brand guidelines & identity system' },
  { id: 'social', name: 'Social Media Package', baseMin: 10000, baseMax: 25000, icon: '📱', description: 'Monthly social media graphics & content' },
  { id: 'profile', name: 'Company Profile', baseMin: 8000, baseMax: 20000, icon: '📋', description: 'Professional company profile / brochure' },
  { id: 'website', name: 'Website', baseMin: 25000, baseMax: 80000, icon: '💻', description: 'Responsive modern website design' },
  { id: 'printing', name: 'Printing', baseMin: 3000, baseMax: 15000, icon: '🖨️', description: 'Business cards, banners, flyers & more' },
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
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(schema) as any,
  })

  const [showSuccessModal, setShowSuccessModal] = useState(false)
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
              <div className="pt-6">
                <h2 className="font-display text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
                  Contact Information
                </h2>
                <p className="mt-4 max-w-md text-lg leading-relaxed text-slate-600 dark:text-gray-400">
                  Fill out the form and we'll get back to you within 24 hours.
                </p>

                <div className="mt-10 space-y-7">
                  <div className="flex items-center gap-4 text-lg text-slate-700 dark:text-gray-200">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full border border-orange-200 bg-orange-50 text-orange-500">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
                        <path d="M4 7.5A2.5 2.5 0 0 1 6.5 5h11A2.5 2.5 0 0 1 20 7.5v9A2.5 2.5 0 0 1 17.5 19h-11A2.5 2.5 0 0 1 4 16.5v-9Z" />
                        <path d="m5 7 7 5 7-5" />
                      </svg>
                    </span>
                    <span>meritmediapro007@gmail.com</span>
                  </div>

                  <div className="flex items-center gap-4 text-lg text-slate-700 dark:text-gray-200">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full border border-orange-200 bg-orange-50 text-orange-500">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.86 19.86 0 0 1 3.08 4.18 2 2 0 0 1 5.06 2h3a2 2 0 0 1 2 1.72c.13.89.5 1.75 1.1 2.47l-1.3 1.3a15.9 15.9 0 0 0 7.48 7.48l1.3-1.3c.72.6 1.58 1 2.47 1.1A2 2 0 0 1 22 16.92Z" />
                      </svg>
                    </span>
                    <span>(+254) 714-531 574</span>
                  </div>

                  <div className="flex items-center gap-4 text-lg text-slate-700 dark:text-gray-200">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full border border-orange-200 bg-orange-50 text-orange-500">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
                        <path d="M12 21s6-5.5 6-11a6 6 0 1 0-12 0c0 5.5 6 11 6 11Z" />
                        <circle cx="12" cy="10" r="2.5" />
                      </svg>
                    </span>
                    <span>Roysambu, Nairobi</span>
                  </div>
                </div>

                <div className="mt-12">
                  <h3 className="font-display text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                    Follow Us
                  </h3>
                  <div className="mt-5 flex flex-wrap gap-6 text-xl text-slate-700 dark:text-gray-200">
                    <a href="#" className="transition-colors hover:text-primary-600 dark:hover:text-primary-400">
                      Instagram
                    </a>
                    <a href="#" className="transition-colors hover:text-primary-600 dark:hover:text-primary-400">
                      LinkedIn
                    </a>
                    <a href="#" className="transition-colors hover:text-primary-600 dark:hover:text-primary-400">
                      Twitter
                    </a>
                  </div>
                </div>
              </div>

              <div className="rounded-[26px] border border-slate-200 bg-[#f3f4f5] p-6 shadow-[0_12px_30px_rgba(15,23,42,0.04)] dark:border-gray-700 dark:bg-gray-800 md:p-8">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <div>
                    <label htmlFor="name" className="mb-2 block text-base font-medium text-slate-700 dark:text-gray-200">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      {...register('name')}
                      className="block w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-800 shadow-sm outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    />
                    {errors.name && (
                      <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="mb-2 block text-base font-medium text-slate-700 dark:text-gray-200">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      {...register('email')}
                      className="block w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-800 shadow-sm outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    />
                    {errors.email && (
                      <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="phone" className="mb-2 block text-base font-medium text-slate-700 dark:text-gray-200">
                      Phone (optional)
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      {...register('phone')}
                      className="block w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-800 shadow-sm outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    />
                    {errors.phone && (
                      <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.phone.message}</p>
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
                      className="block w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-800 shadow-sm outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    />
                  </div>

                  <div>
                    <label htmlFor="service" className="mb-2 block text-base font-medium text-slate-700 dark:text-gray-200">
                      Service Interested In
                    </label>
                    <select
                      id="service"
                      {...register('service')}
                      className="block w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-800 shadow-sm outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    >
                      <option value="">Select a service</option>
                      {services.map((service) => (
                        <option key={service.id} value={service.id}>
                          {service.name}
                        </option>
                      ))}
                    </select>
                    {errors.service && (
                      <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.service.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="message" className="mb-2 block text-base font-medium text-slate-700 dark:text-gray-200">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      {...register('message')}
                      className="block w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-800 shadow-sm outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    />
                    {errors.message && (
                      <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.message.message}</p>
                    )}
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex w-full items-center justify-center gap-3 rounded-xl bg-[#f77a2c] px-5 py-3.5 text-base font-semibold text-white shadow-[0_10px_20px_rgba(247,122,44,0.25)] transition hover:bg-[#ea6d1d] focus:outline-none focus:ring-2 focus:ring-orange-200 disabled:cursor-not-allowed disabled:opacity-70"
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
                      <p className="mt-3 text-center text-sm text-red-600 dark:text-red-400">{submitError}</p>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccessModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowSuccessModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-gray-900 rounded-2xl max-w-md w-full p-8 text-center"
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <FaCheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Message Sent Successfully!
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Thank you for reaching out to Merit Graphics Solutions.
              </p>
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-6">
                <p className="text-sm text-blue-800 dark:text-blue-300 font-medium">
                  We will revert to you within 2 business hours.
                </p>
              </div>
              <button
                onClick={() => setShowSuccessModal(false)}
                className="w-full rounded-md bg-primary-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </MainLayout>
  )
} 