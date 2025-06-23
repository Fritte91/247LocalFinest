import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(request: Request) {
  try {
    const { 
      name, 
      email, 
      password, 
      phone,
      dateOfBirth,
      address,
      city,
      state,
      zipCode,
      buyerType = 'retail',
      role = 'user' 
    } = await request.json();

    if (!name || !email || !password || !phone || !dateOfBirth || !address || !city || !state || !zipCode || !buyerType) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate buyerType
    if (!['retail', 'wholesale'].includes(buyerType)) {
      return NextResponse.json(
        { error: 'Invalid buyer type. Must be either "retail" or "wholesale"' },
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

    // Split name into firstName and lastName
    const nameParts = name.split(' ');
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(' ');

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role,
      buyerType,
      phone,
      phoneNumber: phone, // Map phone to phoneNumber for backward compatibility
      dateOfBirth: new Date(dateOfBirth),
      address: {
        street: address,
        city,
        state,
        zipCode
      }
    });

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user.toObject();

    return NextResponse.json(userWithoutPassword, { status: 201 });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    );
  }
} 