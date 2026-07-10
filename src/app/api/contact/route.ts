import { NextRequest, NextResponse } from 'next/server'
import { insertContactSubmission, initDatabase } from '@/lib/neon'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, company, service, message } = body

    // Validate required fields
    if (!name || !email || !service || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Initialize database if needed
    await initDatabase()

    // Store submission in Neon
    const submission = await insertContactSubmission({
      name,
      email,
      phone,
      company,
      service,
      message,
    })

    // Send email notifications using EmailJS HTTP API
    const emailResults = {
      adminEmail: false,
      userConfirmation: false,
    }

    try {
      // Send notification to admin (olelecaleb176@gmail.com)
      const adminEmailPayload = {
        service_id: process.env.EMAILJS_SERVICE_ID || 'service_v7x763l',
        template_id: process.env.EMAILJS_TEMPLATE_ID || 'template_lye9sab',
        user_id: process.env.EMAILJS_PUBLIC_KEY || '12pmQhGYvWzg9n1Z0',
        template_params: {
          subject: `New message from ${name}`,
          from_name: name,
          from_email: email,
          to_email: 'olelecaleb176@gmail.com',
          phone: phone || 'Not provided',
          company: company || 'Not provided',
          service,
          message,
        },
      }
      
      console.log('Sending admin email with payload:', JSON.stringify(adminEmailPayload, null, 2))
      
      const adminEmailResponse = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(adminEmailPayload),
      })

      const adminResponseText = await adminEmailResponse.text()
      console.log('Admin email response status:', adminEmailResponse.status)
      console.log('Admin email response body:', adminResponseText)

      if (adminEmailResponse.ok) {
        emailResults.adminEmail = true
      } else {
        console.error('Admin email failed:', adminResponseText)
      }
    } catch (adminEmailError) {
      console.error('Error sending admin email:', adminEmailError)
    }

    try {
      // Send confirmation email to user
      const userEmailPayload = {
        service_id: process.env.EMAILJS_SERVICE_ID || 'service_1tfclub',
        template_id: process.env.EMAILJS_USER_TEMPLATE_ID || 'template_lye9sab',
        user_id: process.env.EMAILJS_PUBLIC_KEY || '12pmQhGYvWzg9n1Z0',
        template_params: {
          to_name: name,
          to_email: email,
          from_name: 'Merit Graphics',
          from_email: 'olelecaleb176@gmail.com',
          subject: 'Thank you for contacting Merit Graphics',
          service,
          message: 'Thank you for contacting Merit Graphics. We have received your message and will revert to you within 2 business hours.',
        },
      }
      
      console.log('Sending user confirmation email with payload:', JSON.stringify(userEmailPayload, null, 2))
      
      const userConfirmResponse = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userEmailPayload),
      })

      const userResponseText = await userConfirmResponse.text()
      console.log('User email response status:', userConfirmResponse.status)
      console.log('User email response body:', userResponseText)

      if (userConfirmResponse.ok) {
        emailResults.userConfirmation = true
      } else {
        console.error('User confirmation email failed:', userResponseText)
      }
    } catch (userEmailError) {
      console.error('Error sending user confirmation email:', userEmailError)
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Contact form submitted successfully',
        submissionId: submission.id,
        emailResults,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error processing contact form:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
