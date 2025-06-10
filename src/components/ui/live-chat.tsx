'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const getBotResponse = (message: string) => {
  const lowerMessage = message.toLowerCase()
  
  if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
    return "Hello! How can I help you today?"
  }
  
  if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('pricing')) {
    return "Our pricing varies based on project requirements. Would you like to schedule a consultation to discuss your specific needs?"
  }
  
  if (lowerMessage.includes('service') || lowerMessage.includes('offer') || lowerMessage.includes('provide')) {
    return "We offer a wide range of services including brand identity design, UI/UX design, motion graphics, and print design. Which area are you interested in?"
  }
  
  if (lowerMessage.includes('contact') || lowerMessage.includes('reach') || lowerMessage.includes('get in touch')) {
    return "You can reach us through our contact form on the website, or we can schedule a call to discuss your project in detail."
  }
  
  if (lowerMessage.includes('portfolio') || lowerMessage.includes('work') || lowerMessage.includes('projects')) {
    return "You can view our portfolio on our website. We have a diverse range of projects showcasing our expertise in various design disciplines."
  }
  
  if (lowerMessage.includes('time') || lowerMessage.includes('duration') || lowerMessage.includes('how long')) {
    return "Project timelines vary depending on scope and complexity. We'll provide a detailed timeline during our initial consultation."
  }
  
  if (lowerMessage.includes('process') || lowerMessage.includes('how do you work') || lowerMessage.includes('workflow')) {
    return "Our process typically involves discovery, strategy, design, and delivery phases. We work closely with clients throughout to ensure their vision is realized."
  }
  
  if (lowerMessage.includes('experience') || lowerMessage.includes('years') || lowerMessage.includes('expertise')) {
    return "We have over 10 years of experience in the design industry, working with clients across various sectors to create impactful visual solutions."
  }
  
  if (lowerMessage.includes('team') || lowerMessage.includes('people') || lowerMessage.includes('designers')) {
    return "Our team consists of experienced designers, strategists, and project managers who collaborate to deliver exceptional results."
  }
  
  if (lowerMessage.includes('thank')) {
    return "You're welcome! Is there anything else you'd like to know?"
  }
  
  return "I'm here to help! Could you please provide more details about your inquiry?"
}

export const LiveChat = () => {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<{ text: string; sender: 'user' | 'bot' }[]>([])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim()) {
      setMessages([...messages, { text: message, sender: 'user' }])
      setMessage('')
      // Add bot response
      setTimeout(() => {
        const botResponse = getBotResponse(message)
        setMessages(prev => [...prev, { 
          text: botResponse, 
          sender: 'bot' 
        }])
      }, 1000)
    }
  }

  return (
    <>
      {/* Live Chat Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="fixed bottom-6 right-6 z-50 p-4 bg-primary-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
      >
        {isChatOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-50 w-72 sm:w-80 bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden"
          >
            <div className="p-4 bg-primary-500 text-white">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="h-10 w-10 rounded-full overflow-hidden ring-2 ring-white/20">
                    <img
                      src="/team/Chat.jpg"
                      alt="Support Agent"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-400 rounded-full ring-2 ring-white"></div>
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Chat with us</h3>
                  <p className="text-xs text-white/80">We're here to help!</p>
                </div>
              </div>
            </div>
            <div className="p-4 h-64 overflow-y-auto">
              {messages.length === 0 ? (
                <div className="text-center text-sm text-gray-500 dark:text-gray-400">
                  Start a conversation with our team
                </div>
              ) : (
                <div className="space-y-3">
                  {messages.map((msg, index) => (
                    <div
                      key={index}
                      className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg px-4 py-2 text-sm ${
                          msg.sender === 'user'
                            ? 'bg-primary-500 text-white'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100'
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex space-x-3">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2.5 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <button 
                  type="submit"
                  className="inline-flex items-center justify-center px-4 py-2.5 bg-primary-500 text-white text-sm font-medium rounded-lg hover:bg-primary-600 transition-colors shadow-sm hover:shadow-md"
                >
                  <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  Send
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
} 