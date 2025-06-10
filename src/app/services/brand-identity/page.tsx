'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { MainLayout } from '@/components/layout/main-layout'
import Image from 'next/image'
import Link from 'next/link'
import { CheckIcon, ArrowRightIcon } from '@heroicons/react/24/outline'
import { FaCheckCircle, FaFileAlt, FaUsers, FaLightbulb, FaPalette, FaRegLightbulb } from 'react-icons/fa'

const benefits = [
  {
    icon: <FaRegLightbulb className="w-6 h-6" />,
    title: "Strong Brand Recognition",
    description: "Create a memorable and distinctive brand identity that stands out in your market."
  },
  {
    icon: <FaUsers className="w-6 h-6" />,
    title: "Consistent Brand Experience",
    description: "Ensure your brand message and visual identity are consistent across all touchpoints."
  },
  {
    icon: <FaPalette className="w-6 h-6" />,
    title: "Professional Visual Identity",
    description: "Develop a cohesive visual language that reflects your brand's values and personality."
  }
]

const deliverables = [
  "Brand Strategy Document",
  "Logo Design (Multiple Formats)",
  "Brand Guidelines",
  "Color Palette",
  "Typography System",
  "Brand Voice Guidelines",
  "Visual Identity Elements",
  "Brand Application Examples"
]

const process = [
  {
    title: "Discovery",
    description: "We start by understanding your business, target audience, and market positioning through in-depth research and analysis."
  },
  {
    title: "Strategy",
    description: "Develop a comprehensive brand strategy that defines your brand's purpose, values, and unique positioning."
  },
  {
    title: "Design",
    description: "Create visual elements that bring your brand to life, including logo, color palette, and typography."
  },
  {
    title: "Guidelines",
    description: "Develop detailed brand guidelines to ensure consistent application across all platforms and materials."
  }
]

const faqs = [
  {
    question: "What is brand identity?",
    answer: "Brand identity is the visual and emotional representation of your brand, including your logo, color palette, typography, and overall design language. It's how your brand looks, feels, and communicates with your audience."
  },
  {
    question: "How long does it take to develop a brand identity?",
    answer: "The timeline varies based on project scope and complexity. A complete brand identity package typically takes 4-6 weeks, including research, concept development, design iterations, and final delivery of all brand assets."
  },
  {
    question: "What files will I receive?",
    answer: "You'll receive all necessary files for both digital and print use, including vector files (AI, EPS), raster files (PNG, JPG), and a comprehensive brand guidelines document. We also provide source files for future modifications."
  },
  {
    question: "Can you help with brand strategy?",
    answer: "Yes, we offer comprehensive brand strategy services including market research, competitor analysis, brand positioning, and messaging development. This helps ensure your brand identity aligns with your business goals."
  }
]

export default function BrandIdentity() {
  const [openFaq, setOpenFaq] = React.useState<number | null>(null)

  return (
    <MainLayout>
      {/* Hero Section with Gradient */}
      <section className="relative py-20 bg-gradient-to-r from-purple-600 to-indigo-600">
        <div className="absolute inset-0 bg-black/50" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center text-white mt-20">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Brand Identity Design</h1>
            <p className="text-xl mb-8">Create a powerful and memorable brand identity that resonates with your audience and sets you apart from the competition.</p>
            <Link 
              href="/contact" 
              className="inline-block bg-white text-purple-600 px-8 py-3 rounded-full font-semibold hover:bg-opacity-90 transition-all"
            >
              Start Your Brand Project
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">Why Choose Our Brand Identity Services?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <div className="text-purple-600 dark:text-purple-400 mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{benefit.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Deliverables Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">What You'll Receive</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {deliverables.map((item, index) => (
              <div key={index} className="flex items-center space-x-3 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow-sm">
                <FaCheckCircle className="text-purple-600 dark:text-purple-400 flex-shrink-0" />
                <span className="text-gray-700 dark:text-gray-200">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">Our Brand Identity Process</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <div className="text-purple-600 dark:text-purple-400 mb-4">
                  <FaFileAlt className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{step.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border dark:border-gray-700 rounded-lg overflow-hidden">
                <button
                  className="w-full px-6 py-4 text-left bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-900 dark:text-white">{faq.question}</span>
                    <span className="text-purple-600 dark:text-purple-400">
                      {openFaq === index ? '−' : '+'}
                    </span>
                  </div>
                </button>
                {openFaq === index && (
                  <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700">
                    <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-indigo-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Transform Your Brand?</h2>
          <p className="text-white text-xl mb-8">Let's create a brand identity that makes you stand out.</p>
          <Link 
            href="/contact" 
            className="inline-block bg-white text-purple-600 px-8 py-3 rounded-full font-semibold hover:bg-opacity-90 transition-all"
          >
            Get Started Today
          </Link>
        </div>
      </section>
    </MainLayout>
  )
} 