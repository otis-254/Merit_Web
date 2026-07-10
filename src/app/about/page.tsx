'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MainLayout } from '@/components/layout/main-layout'
import Image from 'next/image'
import Link from 'next/link'
import { FaLinkedin, FaTwitter, FaInstagram, FaTimes } from 'react-icons/fa'
import { MdEmail, MdPhone, MdLocationOn } from 'react-icons/md'
import { BsArrowRight } from 'react-icons/bs'

const team = [
  {
    name: 'Sarah Johnson',
    role: 'Creative Director',
    image: '/team/Sarah.jpg',
    bio: 'With over 15 years of experience in creative direction, Sarah leads our team with passion and innovation.',
  },
  {
    name: 'Michael Chen',
    role: 'Lead Designer',
    image: '/team/michael.jpg',
    bio: 'Michael brings a unique perspective to every project, combining traditional design principles with modern techniques.',
  },
  {
    name: 'Emily Rodriguez',
    role: 'UX/UI Specialist',
    image: '/team/emily.jpg',
    bio: 'Emily specializes in creating intuitive and engaging user experiences that delight and inspire.',
  },
]

const values = [
  {
    title: 'Innovation',
    description: 'We push boundaries and explore new possibilities in every project.',
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    title: 'Excellence',
    description: 'We strive for perfection in every detail, delivering work that exceeds expectations.',
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
  },
  {
    title: 'Collaboration',
    description: 'We believe in the power of teamwork and close client partnerships.',
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
]

const sections = [
  {
    id: "about-us",
    title: "About Us",
    content: `Merit Graphics is a creative agency dedicated to transforming brands through innovative design, strategic thinking, and a passion for visual storytelling. Our mission is to empower businesses with compelling visual identities and digital experiences that captivate audiences and drive results.

We believe in the power of creativity to inspire change and make a lasting impact. From branding and UI/UX design to motion graphics and print, our team combines expertise with a collaborative approach to deliver solutions tailored to your unique needs.`
  },
  {
    id: "vision-mission",
    title: "Vision & Mission",
    content: `Our Vision:
To be the leading creative force in East Africa, known for innovative design solutions that transform businesses and create lasting impact.

Our Mission:
To empower businesses with exceptional design solutions that drive growth, enhance brand value, and create meaningful connections with their audience. We achieve this through:
• Innovative Design Thinking
• Strategic Brand Development
• Client-Centric Approach
• Excellence in Execution
• Continuous Innovation`
  },
  {
    id: "our-team",
    title: "Our Team",
    content: `Our team consists of passionate creatives, strategists, and technologists who work together to deliver exceptional results. Each team member brings unique expertise and perspective to every project, ensuring comprehensive solutions that meet and exceed client expectations.`
  }
]

const catSection = {
  title: "Let's Build with You!",
  description: "Ready to transform your brand's visual identity? Let's create something extraordinary together.",
  cta: {
    primary: {
      text: "Get Started",
      href: "/contact",
      description: "Start your project with us today"
    },
    secondary: {
      text: "View Our Work",
      href: "/portfolio",
      description: "Explore our portfolio of successful projects"
    }
  }
}

const teamMembers = [
  {
    name: "Caleb Otis",
    role: "Creative Director",
    image: "/team/Team 01.jpeg",
    description: "Visionary leader with 10+ years of experience in creative direction and brand strategy.",
    email: "caleb@meritgraphics.com",
    phone: "+254-714-531-574",
    socials: {
      linkedin: "https://linkedin.com/in/calebotis",
      twitter: "https://twitter.com/calebotis",
      instagram: "https://instagram.com/calebotis"
    },
    fullBio: "Caleb Otis is the Creative Director at Merit Graphics with over 10 years of experience in creative direction and brand strategy. He has led numerous successful branding campaigns for major Kenyan and international brands. His expertise spans across brand identity development, visual storytelling, and creative team leadership. Caleb is passionate about mentoring young designers and pushing creative boundaries in the African market."
  },
  {
    name: "Grace Nafula",
    role: "Senior Designer",
    image: "/team/Team 02.jpeg",
    description: "Award-winning designer specializing in brand identity and digital experiences.",
    email: "grace@meritgraphics.com",
    phone: "+254-712-345-678",
    socials: {
      linkedin: "https://linkedin.com/in/gracenafula",
      twitter: "https://twitter.com/gracenafula",
      instagram: "https://instagram.com/gracenafula"
    },
    fullBio: "Grace Nafula is an award-winning Senior Designer at Merit Graphics, specializing in brand identity and digital experiences. With a keen eye for detail and a passion for innovative design, Grace has created memorable brand identities for startups and established companies across East Africa. Her work has been recognized in several design competitions and she regularly speaks at design conferences."
  },
  {
    name: "James Ochieng",
    role: "UX/UI Specialist",
    image: "/team/Team 04.jpeg",
    description: "Passionate about creating intuitive and engaging user experiences that drive results.",
    email: "james@meritgraphics.com",
    phone: "+254-723-456-789",
    socials: {
      linkedin: "https://linkedin.com/in/jamesochieng",
      twitter: "https://twitter.com/jamesochieng",
      instagram: "https://instagram.com/jamesochieng"
    },
    fullBio: "James Ochieng is a UX/UI Specialist at Merit Graphics, passionate about creating intuitive and engaging user experiences that drive results. With a background in psychology and design, James approaches UX from a user-centric perspective, ensuring that every design decision is backed by research and data. He has worked on numerous web and mobile projects for clients in Kenya and beyond."
  },
  {
    name: "Mildred Kerubo",
    role: "Project Manager",
    image: "/team/Team 03.jpeg",
    description: "Expert in managing complex projects and ensuring seamless client communication.",
    email: "mildred@meritgraphics.com",
    phone: "+254-734-567-890",
    socials: {
      linkedin: "https://linkedin.com/in/mildredkerubo",
      twitter: "https://twitter.com/mildredkerubo",
      instagram: "https://instagram.com/mildredkerubo"
    },
    fullBio: "Mildred Kerubo is the Project Manager at Merit Graphics, expert in managing complex projects and ensuring seamless client communication. With excellent organizational skills and a talent for bringing teams together, Mildred ensures that every project is delivered on time and exceeds client expectations. Her background in business administration and project management makes her an invaluable asset to the team."
  }
]

export default function About() {
  const [selectedMember, setSelectedMember] = useState<typeof teamMembers[0] | null>(null)

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative py-24 min-h-[80vh] flex items-center bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-left"
            >
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight bg-gradient-to-r from-primary-600 via-primary-500 to-secondary-600 bg-clip-text text-transparent">
                Crafting Digital Excellence
              </h1>
              <p className="mt-6 text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
                At Merit Graphics, we're more than just a design agency. We're your creative partners in building exceptional digital experiences that leave lasting impressions.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <motion.a
                  href="/portfolio"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 md:text-lg"
                >
                  View Our Work
                </motion.a>
                <motion.a
                  href="/contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center justify-center px-6 py-3 border border-primary-600 text-base font-medium rounded-md text-primary-600 bg-transparent hover:bg-primary-50 md:text-lg"
                >
                  Get in Touch
                </motion.a>
              </div>
            </motion.div>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: 200 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.6, 0.01, 0.05, 0.95], delay: 0.2 }}
              className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-secondary-500/20 mix-blend-multiply rounded-2xl z-10" />
              <Image
                src="/portfolio/001.jpg"
                alt="Merit Graphics Workspace"
                fill
                className="object-cover rounded-2xl"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="font-display text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Our Values
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-400">
              The principles that guide our work and shape our culture.
            </p>
          </div>
          <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((value) => (
              <motion.div
                key={value.title}
                whileHover={{ y: -5 }}
                className="relative rounded-2xl bg-gray-50 p-8 dark:bg-gray-800"
              >
                <div className="text-primary-600 dark:text-primary-400">
                  {value.icon}
                </div>
                <h3 className="mt-6 font-display text-xl font-semibold text-gray-900 dark:text-white">
                  {value.title}
                </h3>
                <p className="mt-4 text-gray-600 dark:text-gray-400">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Us and Vision & Mission Section */}
      <section className="py-24 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* About Us Card */}
            <div className="relative bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
              <div className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">About Us</h2>
                <div className="space-y-4">
                  {sections[0].content.split('\n').map((paragraph, index) => (
                    <p key={index} className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            {/* Vision & Mission Card */}
            <div className="relative bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 via-yellow-500 to-orange-500"></div>
              <div className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Vision & Mission</h2>
                <div className="space-y-4">
                  {sections[1].content.split('\n').map((paragraph, index) => (
                    <p key={index} className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section id="our-team" className="py-24 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
              Our Team
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Meet the talented individuals behind our creative success
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
            <motion.div
                key={member.name}
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden group relative"
              >
                <div className="relative h-64 overflow-hidden bg-gray-100 dark:bg-gray-800">
              <Image
                    src={member.image}
                    alt={member.name}
                fill
                className="object-contain transition-transform duration-300 group-hover:scale-110 p-2"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <button
                    onClick={() => setSelectedMember(member)}
                    className="absolute top-4 left-1/2 -translate-x-1/2 bg-primary-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-primary-700 z-10 transition-all duration-300 opacity-0 -translate-y-12 group-hover:opacity-100 group-hover:translate-y-0"
                  >
                    More Info
                  </button>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {member.name}
                  </h3>
                  <p className="mt-1 text-primary-600 dark:text-primary-400">
                    {member.role}
                  </p>
                  <p className="mt-4 text-gray-600 dark:text-gray-300">
                    {member.description}
                  </p>
                </div>
            </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Careers Section */}
      <section id="careers" className="py-24 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
              Careers at Merit
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 dark:text-gray-400">
              Join our creative team and help us transform brands around the world
            </p>
          </motion.div>

          {/* Open Positions */}
          <div className="mt-20">
            <h3 className="font-display text-2xl font-bold text-gray-900 dark:text-white mb-8">
              Open Positions
            </h3>
            <div className="grid grid-cols-1 gap-6">
              {[
                {
                  title: "Senior Graphic Designer",
                  location: "Nairobi, Kenya (Hybrid)",
                  type: "Full-time",
                  description: "We're looking for an experienced graphic designer to lead our brand identity projects and mentor junior designers.",
                  requirements: ["5+ years of graphic design experience", "Strong portfolio of brand identity work", "Proficiency in Adobe Creative Suite", "Excellent communication skills"]
                },
                {
                  title: "UI/UX Designer",
                  location: "Remote",
                  type: "Full-time",
                  description: "Design intuitive and engaging user experiences for web and mobile applications.",
                  requirements: ["3+ years of UI/UX design experience", "Proficiency in Figma or Sketch", "Understanding of user research methodologies", "Strong visual design skills"]
                },
                {
                  title: "Frontend Developer",
                  location: "Nairobi, Kenya",
                  type: "Full-time",
                  description: "Build modern, responsive websites and applications using React and Next.js.",
                  requirements: ["3+ years of frontend development experience", "Strong proficiency in React and Next.js", "Experience with Tailwind CSS", "Understanding of responsive design principles"]
                },
                {
                  title: "Motion Graphics Artist",
                  location: "Remote",
                  type: "Contract",
                  description: "Create captivating motion graphics and animations for our clients.",
                  requirements: ["3+ years of motion graphics experience", "Proficiency in After Effects and Premiere Pro", "Strong portfolio of animation work", "Ability to meet tight deadlines"]
                }
              ].map((job, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {job.title}
                      </h4>
                      <div className="flex flex-wrap gap-4 mt-2">
                        <span className="inline-flex items-center text-sm text-gray-600 dark:text-gray-400">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {job.location}
                        </span>
                        <span className="inline-flex items-center text-sm text-gray-600 dark:text-gray-400">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          {job.type}
                        </span>
                      </div>
                      <p className="mt-4 text-gray-600 dark:text-gray-400">
                        {job.description}
                      </p>
                      <ul className="mt-4 space-y-2">
                        {job.requirements.map((req, i) => (
                          <li key={i} className="flex items-start text-sm text-gray-600 dark:text-gray-400">
                            <svg className="w-4 h-4 text-primary-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Link
                      href="/contact"
                      className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 transition-colors duration-300"
                    >
                      Apply Now
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* How to Get Hired Section */}
          <div className="mt-20">
            <h3 className="font-display text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              How to Get Hired at Merit
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  step: 1,
                  title: "Submit Your Application",
                  description: "Send us your resume, portfolio, and a brief cover letter telling us why you want to join our team.",
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  )
                },
                {
                  step: 2,
                  title: "Initial Screening",
                  description: "We'll review your application and portfolio to see if you're a good fit for the role.",
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  )
                },
                {
                  step: 3,
                  title: "Interview",
                  description: "We'll have a conversation to learn more about your skills, experience, and what you're looking for in your next role.",
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  )
                },
                {
                  step: 4,
                  title: "Join the Team",
                  description: "If everything goes well, we'll make you an offer and welcome you to the Merit family!",
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-800 dark:to-gray-800 rounded-2xl p-8 text-center"
                >
                  <div className="w-16 h-16 mx-auto bg-primary-600 rounded-full flex items-center justify-center text-white mb-4">
                    {item.icon}
                  </div>
                  <div className="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                    {item.step}
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {item.title}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-br from-primary-50 to-primary-100 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
              {catSection.title}
              </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              {catSection.description}
            </p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {catSection.cta.primary.text}
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                {catSection.cta.primary.description}
              </p>
              <Link
                href={catSection.cta.primary.href}
                className="mt-4 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
              >
                Contact Us
              </Link>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {catSection.cta.secondary.text}
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                {catSection.cta.secondary.description}
              </p>
              <Link
                href={catSection.cta.secondary.href}
                className="mt-4 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-primary-600 bg-primary-50 hover:bg-primary-100 dark:text-primary-400 dark:bg-gray-700 dark:hover:bg-gray-600"
              >
                View Portfolio
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Team Member Modal */}
      <AnimatePresence>
        {selectedMember && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedMember(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-gray-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="relative h-96 md:h-[28rem]">
                <Image
                  src={selectedMember.image}
                  alt={selectedMember.name}
                  fill
                  className="object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <button
                  onClick={() => setSelectedMember(null)}
                  className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-colors"
                >
                  <FaTimes className="w-6 h-6" />
                </button>
                <div className="absolute bottom-6 left-6 right-6">
                  <h2 className="text-3xl font-bold text-white">{selectedMember.name}</h2>
                  <p className="text-primary-400 text-lg">{selectedMember.role}</p>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Contact Info */}
                  <div className="md:col-span-1 space-y-4">
                    <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                      <MdEmail className="w-5 h-5 text-primary-600" />
                      <a href={`mailto:${selectedMember.email}`} className="hover:text-primary-600 transition-colors">
                        {selectedMember.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                      <MdPhone className="w-5 h-5 text-primary-600" />
                      <a href={`tel:${selectedMember.phone}`} className="hover:text-primary-600 transition-colors">
                        {selectedMember.phone}
                      </a>
                    </div>
                    <div className="flex gap-4 pt-4">
                      <a
                        href={selectedMember.socials.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-blue-600 transition-colors"
                      >
                        <FaLinkedin className="w-6 h-6" />
                      </a>
                      <a
                        href={selectedMember.socials.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-blue-400 transition-colors"
                      >
                        <FaTwitter className="w-6 h-6" />
                      </a>
                      <a
                        href={selectedMember.socials.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-pink-600 transition-colors"
                      >
                        <FaInstagram className="w-6 h-6" />
                      </a>
                    </div>
                  </div>

                  {/* Bio */}
                  <div className="md:col-span-2">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">About</h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {selectedMember.fullBio}
                    </p>
                  </div>
                </div>

                {/* Other Team Members */}
                <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Other Team Members</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {teamMembers
                      .filter((m) => m.name !== selectedMember.name)
                      .length > 0 ? (
                      teamMembers
                        .filter((m) => m.name !== selectedMember.name)
                        .map((member) => (
                          <button
                            key={member.name}
                            onClick={() => setSelectedMember(member)}
                            className="group relative aspect-square rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800"
                          >
                            <Image
                              src={member.image}
                              alt={member.name}
                              fill
                              className="object-contain transition-transform duration-300 group-hover:scale-110 p-2"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                              <div className="text-white">
                                <p className="text-sm font-medium">{member.name}</p>
                                <p className="text-xs text-gray-300">{member.role}</p>
                              </div>
                            </div>
                          </button>
                        ))
                    ) : (
                      <p className="text-gray-500 dark:text-gray-400 col-span-full">No other team members available</p>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </MainLayout>
  )
} 