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
    title: "Engaging Visual Content",
    description: "Create captivating motion graphics that grab attention and communicate your message effectively."
  },
  {
    icon: <FaUsers className="w-6 h-6" />,
    title: "Enhanced Brand Storytelling",
    description: "Bring your brand story to life through dynamic animations and visual effects."
  },
  {
    icon: <FaPalette className="w-6 h-6" />,
    title: "Professional Animation",
    description: "Deliver high-quality motion graphics that elevate your brand and engage your audience."
  }
]

const deliverables = [
  "Animated Logo",
  "Motion Graphics Package",
  "Social Media Animations",
  "Explainer Videos",
  "Animated Infographics",
  "Title Sequences",
  "Background Animations",
  "Final Source Files"
]

const process = [
  {
    title: "Concept",
    description: "Develop creative concepts and storyboards that align with your brand and message."
  },
  {
    title: "Design",
    description: "Create static designs and style frames for the motion graphics elements."
  },
  {
    title: "Animation",
    description: "Bring designs to life through smooth animations and transitions."
  },
  {
    title: "Delivery",
    description: "Provide final animations in multiple formats for various platforms."
  }
]

const faqs = [
  {
    question: "What types of motion graphics do you create?",
    answer: "We create a wide range of motion graphics including animated logos, explainer videos, social media animations, title sequences, and animated infographics. Our team can handle both 2D and 3D animations, depending on your needs and project requirements."
  },
  {
    question: "How long does it take to create motion graphics?",
    answer: "The timeline varies based on complexity and scope. A simple animation might take 1-2 weeks, while more complex projects can take 4-6 weeks. We'll provide a detailed timeline during our initial consultation based on your specific requirements."
  },
  {
    question: "What formats will I receive?",
    answer: "We deliver final animations in multiple formats suitable for different platforms. This typically includes MP4, MOV, and GIF formats. We also provide source files (After Effects project files) so you can make future modifications if needed."
  },
  {
    question: "Can you help with script writing for explainer videos?",
    answer: "Yes, we offer comprehensive services including script writing, voice-over recording, and sound design. Our team can help craft a compelling narrative that effectively communicates your message and engages your audience."
  }
]

export default function MotionGraphics() {
  const [openFaq, setOpenFaq] = React.useState<number | null>(null)

  return (
    <MainLayout>
      {/* Hero Section with Gradient */}
      <section className="relative py-20 bg-gradient-to-r from-pink-600 to-orange-500">
        <div className="absolute inset-0 bg-black/50" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center text-white mt-20">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Motion Graphics Design</h1>
            <p className="text-xl mb-8">Bring your brand to life with captivating motion graphics and animations that engage and inspire.</p>
            <Link 
              href="/contact" 
              className="inline-block bg-white text-pink-600 px-8 py-3 rounded-full font-semibold hover:bg-opacity-90 transition-all"
            >
              Start Your Animation Project
            </Link>
          </div>
        </div>
      </section>
      {/* Benefits Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">Why Choose Our Motion Graphics Services?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <div className="text-pink-600 dark:text-pink-400 mb-4">{benefit.icon}</div>
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
                <FaCheckCircle className="text-pink-600 dark:text-pink-400 flex-shrink-0" />
                <span className="text-gray-700 dark:text-gray-200">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Process Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">Our Animation Process</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <div className="text-pink-600 dark:text-pink-400 mb-4">
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
                    <span className="text-pink-600 dark:text-pink-400">
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
      <section className="py-20 bg-gradient-to-r from-pink-600 to-orange-500">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Animate Your Brand?</h2>
          <p className="text-white text-xl mb-8">Let's create motion graphics that bring your message to life.</p>
          <Link 
            href="/contact" 
            className="inline-block bg-white text-pink-600 px-8 py-3 rounded-full font-semibold hover:bg-opacity-90 transition-all"
          >
            Get Started Today
          </Link>
        </div>
      </section>
    </MainLayout>
  )
} 