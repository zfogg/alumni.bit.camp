// api/join.ts  —  POST /api/join
// Validates an alumni signup form submission and appends a row to the Members tab.
import type { VercelRequest, VercelResponse } from '@vercel/node'
import { v4 as uuid } from 'uuid'
import { appendRow } from '../lib/sheets'

const ALLOWED_ORIGINS = [
  'https://alumni.bit.camp',
  'http://localhost:3000',
  'http://localhost:5173',
]

function setCors(req: VercelRequest, res: VercelResponse) {
  const origin = req.headers.origin ?? ''
  if (ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin)
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
}

const VALID_ROLES = ['Hacker', 'Organizer', 'Sponsor', 'Staff', 'Other']

export default async function handler(req: VercelRequest, res: VercelResponse) {
  setCors(req, res)

  if (req.method === 'OPTIONS') return res.status(204).end()
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  try {
    const {
      name,
      email,
      year,
      role,
      school,
      what_i_did,
      headshot_url,
      linkedin,
      github,
      website,
      // honeypot — bots fill this in, real users never see it
      website_url,
    } = req.body ?? {}

    // Honeypot: silently succeed so bots don't know they were filtered
    if (website_url) return res.status(200).json({ success: true })

    // Validation
    if (!name || typeof name !== 'string' || name.trim().length < 1) {
      return res.status(400).json({ error: 'Name is required' })
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: 'Valid email is required' })
    }
    if (!year) {
      return res.status(400).json({ error: 'Year is required' })
    }
    if (!VALID_ROLES.includes(role)) {
      return res.status(400).json({ error: 'Invalid role' })
    }

    await appendRow('Members', [
      uuid(),                            // id
      name.trim(),                       // name
      email.trim().toLowerCase(),        // email
      String(year),                      // year
      role,                              // role
      school?.trim() ?? '',              // school
      what_i_did?.trim() ?? '',          // what_i_did
      headshot_url?.trim() ?? '',        // headshot_url
      linkedin?.trim() ?? '',            // linkedin
      github?.trim() ?? '',              // github
      website?.trim() ?? '',             // website
      new Date().toISOString(),          // created_at
      'FALSE',                           // featured — set manually in Sheets
      'FALSE',                           // approved — set manually in Sheets
    ])

    return res.status(200).json({ success: true })
  } catch (err) {
    console.error('[/api/join] Error:', err)
    return res.status(500).json({ error: 'Something went wrong. Please try again.' })
  }
}
