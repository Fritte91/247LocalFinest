import { NextResponse } from 'next/server'
import { connect } from 'mongoose'
import User from '../../../../models/User'

export async function GET() {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined in environment variables')
    }

    await connect(process.env.MONGODB_URI)
    
    const totalUsers = await User.countDocuments()
    
    return NextResponse.json({ totalUsers })
  } catch (error) {
    console.error('Error fetching user count:', error)
    return NextResponse.json(
      { error: 'Failed to fetch user count' },
      { status: 500 }
    )
  }
} 