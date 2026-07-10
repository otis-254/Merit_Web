import { neon } from '@neondatabase/serverless'

if (!process.env.NEON_DATABASE_URL) {
  throw new Error('NEON_DATABASE_URL environment variable is not set')
}

export const sql = neon(process.env.NEON_DATABASE_URL)

// Initialize database schema
export async function initDatabase() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS contact_submissions (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50),
        company VARCHAR(255),
        service VARCHAR(100) NOT NULL,
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        status VARCHAR(50) DEFAULT 'new'
      )
    `
    console.log('Database initialized successfully')
  } catch (error) {
    console.error('Error initializing database:', error)
    throw error
  }
}

// Insert contact submission
export async function insertContactSubmission(data: {
  name: string
  email: string
  phone?: string
  company?: string
  service: string
  message: string
}) {
  try {
    const result = await sql`
      INSERT INTO contact_submissions (name, email, phone, company, service, message)
      VALUES (${data.name}, ${data.email}, ${data.phone || null}, ${data.company || null}, ${data.service}, ${data.message})
      RETURNING id, created_at
    `
    return result[0]
  } catch (error) {
    console.error('Error inserting contact submission:', error)
    throw error
  }
}
