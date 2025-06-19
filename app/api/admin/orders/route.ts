import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import Order from '@/models/Order';

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();

    const orders = await Order.find({})
      .populate('user', 'firstName lastName email phone phoneNumber')
      .populate('items.product', 'name price image category')
      .sort({ createdAt: -1 });

    return NextResponse.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();
    const body = await request.json();
    const { orderId, status, tracking } = body;

    console.log('Admin orders PUT request:', { orderId, status, tracking })

    if (!orderId) {
      return NextResponse.json(
        { error: 'Order ID is required' },
        { status: 400 }
      );
    }

    // Find the order first
    const order = await Order.findById(orderId);
    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    // Update the order fields
    if (status) {
      order.status = status;
    }

    if (tracking) {
      order.tracking = {
        trackingNumber: tracking.trackingNumber,
        carrier: tracking.carrier || 'USPS',
        shippedAt: status === 'shipped' ? new Date() : undefined,
        deliveredAt: status === 'delivered' ? new Date() : undefined
      };
    }

    // Save the updated order
    await order.save();

    // Fetch the updated order with populated fields
    const updatedOrder = await Order.findById(orderId)
      .populate('user', 'firstName lastName email phone phoneNumber')
      .populate('items.product');

    console.log('Updated order:', updatedOrder);

    return NextResponse.json(updatedOrder);
  } catch (error: any) {
    console.error('Error updating order:', error);
    return NextResponse.json(
      { error: 'Failed to update order', details: error.message },
      { status: 500 }
    );
  }
} 