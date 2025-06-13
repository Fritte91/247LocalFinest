import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(request: Request) {
  try {
    const { firstName, lastName, email, password, phoneNumber, dateOfBirth, address, role = 'user' } = await request.json();

    if (!firstName || !lastName || !email || !password || !phoneNumber || !dateOfBirth || !address) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    await connectDB();

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user with all required fields
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phoneNumber,
      dateOfBirth,
      address,
      role,
    });

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user.toObject();

    return NextResponse.json(userWithoutPassword, { status: 201 });
  } catch (error) {
    console.error('Registration error:', error);
    // Log the full error details in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Full error details:', {
        message: error?.message,
        stack: error?.stack,
        name: error?.name
      });
    }
    return NextResponse.json(
      { 
        error: 'Failed to create user', 
        details: error?.message || 'Unknown error occurred',
        // Only include stack trace in development
        ...(process.env.NODE_ENV === 'development' ? { stack: error?.stack } : {})
      },
      { status: 500 }
    );
  }
} 