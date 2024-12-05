import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const body = await req.json()
  
  try {
    const response = await fetch('http://127.0.0.1:5000/calculate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      throw new Error('Backend server error')
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Failed to fetch from backend:', error)
    return NextResponse.json({ error: 'Failed to calculate. Please try again later.' }, { status: 500 })
  }
}

