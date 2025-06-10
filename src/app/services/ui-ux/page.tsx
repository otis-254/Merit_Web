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
    title: "Enhanced User Experience",
    description: "Create intuitive and engaging user experiences that keep your audience coming back."
  },
  {
    icon: <FaUsers className="w-6 h-6" />,
    title: "User-Centered Design",
    description: "Design solutions based on real user needs and behaviors, ensuring maximum usability."
  },
  {
    icon: <FaPalette className="w-6 h-6" />,
    title: "Beautiful Interfaces",
    description: "Develop visually appealing interfaces that align with your brand and engage users."
  }
]

const deliverables = [
  "User Research Report",
  "User Personas",
  "User Journey Maps",
  "Wireframes",
  "Interactive Prototypes",
  "UI Design System",
  "Usability Testing Report",
  "Design Documentation"
]

const process = [
  {
    title: "Research",
    description: "Conduct user research, analyze competitors, and gather insights to inform the design process."
  },
  {
    title: "Strategy",
    description: "Develop user personas, journey maps, and information architecture to guide the design."
  },
  {
    title: "Design",
    description: "Create wireframes and high-fidelity designs that address user needs and business goals."
  },
  {
    title: "Testing",
    description: "Validate designs through user testing and iterate based on feedback."
  }
]

const faqs = [
  {
    question: "What's the difference between UI and UX design?",
    answer: "UI (User Interface) design focuses on the visual elements and layout of a product, while UX (User Experience) design focuses on the overall user journey and interaction. We combine both to create intuitive, engaging, and user-friendly digital experiences."
  },
  {
    question: "How long does a typical UI/UX project take?",
    answer: "Project timelines vary based on complexity and scope. A complete UI/UX project typically takes 6-12 weeks, including research, wireframing, design, prototyping, and testing. We'll provide a detailed timeline during our initial consultation."
  },
  {
    question: "Do you provide interactive prototypes?",
    answer: "Yes, we create interactive prototypes using industry-standard tools like Figma and Adobe XD. These prototypes allow you to experience and test the design before development, ensuring the final product meets your needs and expectations."
  },
  {
    question: "Can you help with existing products?",
    answer: "Absolutely! We offer UI/UX redesign services for existing products. We'll analyze current user experience, identify pain points, and propose improvements to enhance usability and engagement."
  }
]

export default function UIUX() {
  const [openFaq, setOpenFaq] = React.useState<number | null>(null)

  return (
    <MainLayout>
      {/* Hero Section with Gradient */}
      <section className="relative py-20 bg-gradient-to-r from-blue-600 to-cyan-500">
        <div className="absolute inset-0 bg-black/50" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center text-white mt-20">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">UI/UX Design Services</h1>
            <p className="text-xl mb-8">Create intuitive, engaging, and user-friendly digital experiences that delight your users and drive business growth.</p>
            <Link 
              href="/contact" 
              className="inline-block bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-opacity-90 transition-all"
            >
              Start Your Design Project
            </Link>
          </div>
        </div>
      </section>
      {/* Benefits Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">Why Choose Our UI/UX Design Services?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <div className="text-blue-600 dark:text-blue-400 mb-4">{benefit.icon}</div>
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
                <FaCheckCircle className="text-blue-600 dark:text-blue-400 flex-shrink-0" />
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
                <div className="text-blue-600 dark:text-blue-400 mb-4">
                  <FaFileAlt className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{step.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Portfolio Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">UI/UX Portfolio</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Example project */}
            <div className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-lg">
              <div className="relative h-48">
                <Image src="/portfolio/uiux.png" alt="UI/UX Project" fill className="object-cover" />
              </div>
              <div className="p-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">App Redesign</h3>
                <p className="text-gray-600 dark:text-gray-400">Modern, user-friendly interface for a fintech app.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Pricing Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Pricing</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">UI/UX design packages start at $1,800</p>
            <Link href="/contact" className="inline-flex items-center px-6 py-3 rounded-lg bg-primary-600 text-white hover:bg-primary-700 transition-colors">Get a Custom Quote<ArrowRightIcon className="ml-2 h-5 w-5" /></Link>
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
                    <span className="text-blue-600 dark:text-blue-400">
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
      <section className="py-20 bg-gradient-to-r from-blue-600 to-cyan-500">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Transform Your Digital Experience?</h2>
          <p className="text-white text-xl mb-8">Let's create a user experience that delights your customers.</p>
          <Link 
            href="/contact" 
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-opacity-90 transition-all"
          >
            Get Started Today
          </Link>
        </div>
      </section>
    </MainLayout>
  )
} 