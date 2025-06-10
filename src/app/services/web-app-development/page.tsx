'use client'

import React from 'react'
import { MainLayout } from '@/components/layout/main-layout'
import { ArrowRight, Code, Smartphone, Zap, Shield, Users, Clock, CheckCircle } from 'lucide-react'

const benefits = [
  {
    icon: <Code className="w-6 h-6" />,
    title: 'Custom Development',
    description: 'Tailored solutions built specifically for your business needs and goals.'
  },
  {
    icon: <Smartphone className="w-6 h-6" />,
    title: 'Responsive Design',
    description: 'Seamless experience across all devices and screen sizes.'
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: 'Performance Optimized',
    description: 'Fast loading times and smooth user interactions.'
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: 'Secure & Reliable',
    description: 'Enterprise-grade security and 99.9% uptime guarantee.'
  }
]

const deliverables = [
  {
    title: 'Custom Web Applications',
    description: 'Scalable web applications built with modern frameworks and best practices.'
  },
  {
    title: 'Mobile Apps',
    description: 'Native and cross-platform mobile applications for iOS and Android.'
  },
  {
    title: 'E-commerce Solutions',
    description: 'Feature-rich online stores with secure payment processing.'
  },
  {
    title: 'API Development',
    description: 'Robust APIs and backend services for seamless integration.'
  }
]

const process = [
  {
    title: 'Discovery & Planning',
    description: 'Understanding your requirements and creating a detailed project roadmap.'
  },
  {
    title: 'Design & Prototyping',
    description: 'Creating wireframes and interactive prototypes for your approval.'
  },
  {
    title: 'Development',
    description: 'Building your solution using industry best practices and modern technologies.'
  },
  {
    title: 'Testing & Quality Assurance',
    description: 'Rigorous testing to ensure performance, security, and reliability.'
  },
  {
    title: 'Deployment & Launch',
    description: 'Smooth deployment to production with comprehensive documentation.'
  },
  {
    title: 'Support & Maintenance',
    description: 'Ongoing support and updates to keep your application running smoothly.'
  }
]

const faqs = [
  {
    question: 'What technologies do you use?',
    answer: 'We use modern technologies including React, Next.js, Node.js, Python, and various mobile development frameworks. Our tech stack is chosen based on your specific needs, ensuring optimal performance, scalability, and maintainability for your project.'
  },
  {
    question: 'How long does development take?',
    answer: 'Project timelines vary based on complexity, typically ranging from 2-6 months. We provide a detailed timeline during our initial consultation, breaking down each phase of development. We also offer MVP development for faster time-to-market.'
  },
  {
    question: 'Do you provide ongoing support?',
    answer: 'Yes, we offer comprehensive support and maintenance packages. This includes regular updates, security patches, performance monitoring, and technical support. We also provide training and documentation to help your team manage the application.'
  },
  {
    question: 'How do you handle project changes?',
    answer: 'We use an agile development methodology that allows for flexibility and changes throughout the project. We maintain clear communication channels and regular progress updates, ensuring that any changes are properly documented and implemented efficiently.'
  }
]

export default function WebAppDevelopment() {
  const [openFaq, setOpenFaq] = React.useState<number | null>(null)

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center text-white mt-20">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Web & App Development</h1>
            <p className="text-xl mb-8">Transform your ideas into powerful digital solutions with our expert development services.</p>
            <a href="#contact" className="inline-flex items-center px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
              Start Your Project
              <ArrowRight className="ml-2 w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Development Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="text-blue-600 dark:text-blue-400 mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Deliverables Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Our Development Solutions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {deliverables.map((deliverable, index) => (
              <div key={index} className="p-6 bg-white dark:bg-gray-900 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-2">{deliverable.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{deliverable.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Our Development Process</h2>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {process.map((step, index) => (
                <div key={index} className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>
                  <div className="ml-6">
                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-gray-200 dark:border-gray-700 pb-4">
                  <button
                    className="flex justify-between items-center w-full text-left font-semibold text-gray-900 dark:text-white"
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  >
                    {faq.question}
                    <span className="ml-2">{openFaq === index ? '−' : '+'}</span>
                  </button>
                  {openFaq === index && (
                    <p className="mt-2 text-gray-600 dark:text-gray-400">{faq.answer}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-3xl font-bold mb-6">Ready to Build Your Digital Solution?</h2>
            <p className="text-xl mb-8">Let's discuss your project and create something amazing together.</p>
            <a href="#contact" className="inline-flex items-center px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
              Get Started
              <ArrowRight className="ml-2 w-5 h-5" />
            </a>
          </div>
        </div>
      </section>
    </MainLayout>
  )
} 