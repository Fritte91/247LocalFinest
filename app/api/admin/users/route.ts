import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import connectDB from '@/lib/mongodb'
import User from '@/models/User'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    await connectDB()
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