import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import Order from '@/models/Order';
import User from '@/models/User';

export async function GET(request: Request) {
  try {
    console.log('Test API called');
    
    const session = await getServerSession(authOptions);
    console.log('Session:', session);
    
    if (!session) {
      return NextResponse.json(
        { error: 'No session found' },
        { status: 401 }
      );
    }
    
    if (session.user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized - not admin' },
        { status: 401 }
      );
    }

    console.log('Connecting to database...');
    await connectDB();
    console.log('Database connected');

    // Test basic operations
    const userCount = await User.countDocuments();
    const orderCount = await Order.countDocuments();
    
    console.log('User count:', userCount);
    console.log('Order count:', orderCount);

    // Try to fetch a few orders
    const sampleOrders = await Order.find({}).limit(3);
    console.log('Sample orders:', sampleOrders.length);

    return NextResponse.json({
      success: true,
      userCount,
      orderCount,
      sampleOrders: sampleOrders.length,
      session: {
        id: session.user.id,
        role: session.user.role,
        firstName: session.user.firstName,
        lastName: session.user.lastName
      }
    });
  } catch (error) {
    console.error('Error in test API:', error);
    return NextResponse.json(
      { 
        error: 'Test failed', 
        details: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined
      },
      { status: 500 }
    );
  }
} 