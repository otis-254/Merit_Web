"use client"

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
    title: "Professional Print Materials",
    description: "Create high-quality print designs that make a lasting impression on your audience."
  },
  {
    icon: <FaUsers className="w-6 h-6" />,
    title: "Brand Consistency",
    description: "Ensure your print materials align perfectly with your digital brand presence."
  },
  {
    icon: <FaPalette className="w-6 h-6" />,
    title: "Creative Excellence",
    description: "Deliver innovative and eye-catching designs that stand out in the physical world."
  }
]

const deliverables = [
  "Business Cards",
  "Brochures & Flyers",
  "Packaging Design",
  "Banners & Signage",
  "Print-Ready Files",
  "Brand Guidelines",
  "Marketing Materials",
  "Production Specifications"
]

const process = [
  {
    title: "Consultation",
    description: "Understand your needs, target audience, and project requirements."
  },
  {
    title: "Design",
    description: "Create initial concepts and designs for your print materials."
  },
  {
    title: "Refinement",
    description: "Refine designs based on feedback and prepare for production."
  },
  {
    title: "Production",
    description: "Provide print-ready files and specifications for production."
  }
]

const faqs = [
  {
    question: "What types of print materials do you design?",
    answer: "We design a wide range of print materials including business cards, brochures, flyers, packaging, banners, signage, and marketing materials. Our team can handle both small and large format printing projects, ensuring high-quality results for all your print needs."
  },
  {
    question: "Do you handle the printing process?",
    answer: "While we focus on design and providing print-ready files, we can recommend trusted printing partners and provide detailed specifications for production. We ensure all files are properly prepared for printing, including correct color profiles, bleeds, and resolution."
  },
  {
    question: "Will I get print-ready files?",
    answer: "Yes, we provide all final designs in print-ready formats, typically including PDF files with proper bleeds, color profiles, and production specifications. We also provide source files (Adobe Creative Suite files) so you can make future modifications if needed."
  },
  {
    question: "How do you ensure color accuracy?",
    answer: "We use industry-standard color profiles (CMYK for print) and provide detailed color specifications. We can also coordinate with your printer to ensure color accuracy and quality control throughout the production process."
  }
]

export default function PrintDesign() {
  const [openFaq, setOpenFaq] = React.useState<number | null>(null)

  return (
    <MainLayout>
      {/* Hero Section with Gradient */}
      <section className="relative py-20 bg-gradient-to-r from-green-600 to-teal-500">
        <div className="absolute inset-0 bg-black/50" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center text-white mt-20">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Print Design Services</h1>
            <p className="text-xl mb-8">Create stunning print materials that make a lasting impression and effectively communicate your brand message.</p>
            <Link 
              href="/contact" 
              className="inline-block bg-white text-green-600 px-8 py-3 rounded-full font-semibold hover:bg-opacity-90 transition-all"
            >
              Start Your Print Project
            </Link>
          </div>
        </div>
      </section>
      {/* Benefits Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">Why Choose Our Print Design Services?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <div className="text-green-600 dark:text-green-400 mb-4">{benefit.icon}</div>
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
                <FaCheckCircle className="text-green-600 dark:text-green-400 flex-shrink-0" />
                <span className="text-gray-700 dark:text-gray-200">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Process Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">Our Design Process</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <div className="text-green-600 dark:text-green-400 mb-4">
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
                    <span className="text-green-600 dark:text-green-400">
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
      <section className="py-20 bg-gradient-to-r from-green-600 to-teal-500">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Transform Your Print Materials?</h2>
          <p className="text-white text-xl mb-8">Let's create print designs that make your brand stand out.</p>
          <Link 
            href="/contact" 
            className="inline-block bg-white text-green-600 px-8 py-3 rounded-full font-semibold hover:bg-opacity-90 transition-all"
          >
            Get Started Today
          </Link>
        </div>
      </section>
    </MainLayout>
  )
} 