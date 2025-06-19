import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Order from '@/models/Order';
import Product from '@/models/Product';
import User from '@/models/User';

export async function GET(request: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    let query = {};
    if (userId) {
      query = { user: userId };
    }

    const orders = await Order.find(query)
      .populate('user', 'firstName lastName email')
      .populate('items.product')
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

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();

    console.log('Received order request:', body);

    // Validate required fields
    if (!body.user || !body.items || !body.totalAmount) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Get user info
    const user = await User.findById(body.user);
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Convert cart items to proper order items
    const orderItems = [];
    
    for (const cartItem of body.items) {
      console.log('Processing cart item:', cartItem);
      console.log('Looking for product with ID:', cartItem.product);
      
      // Test: Check if the product ID format is valid
      if (!cartItem.product || typeof cartItem.product !== 'string' || cartItem.product.length !== 24) {
        console.log('Invalid product ID format:', cartItem.product);
        return NextResponse.json(
          { error: `Invalid product ID format: ${cartItem.product}` },
          { status: 400 }
        );
      }
      
      const product = await Product.findById(cartItem.product);
      console.log('Product lookup result:', product ? 'Found' : 'Not found');
      
      if (!product) {
        // Let's also check if there are any products in the database
        const allProducts = await Product.find({}).limit(5);
        console.log('Available products:', allProducts.map(p => ({ id: p._id, name: p.name })));
        
        return NextResponse.json(
          { error: `Product not found: ${cartItem.product}` },
          { status: 404 }
        );
      }
      
      orderItems.push({
        product: product._id,
        quantity: cartItem.quantity,
        price: cartItem.price,
      });
    }

    const orderData = {
      user: body.user,
      items: orderItems,
      totalAmount: body.totalAmount,
      status: 'pending',
      paymentStatus: 'completed',
      paymentMethod: 'qr_code',
      customerInfo: body.customerInfo || {
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phone: user.phoneNumber || user.phone || '',
      },
      shippingAddress: body.shippingAddress || {
        street: user.address?.street || '',
        city: user.address?.city || '',
        state: user.address?.state || '',
        zipCode: user.address?.zipCode || '',
      },
    };

    console.log('Creating order with data:', orderData);

    const order = await Order.create(orderData);
    
    const populatedOrder = await Order.findById(order._id)
      .populate('user', 'firstName lastName email')
      .populate('items.product');

    console.log('Created order:', populatedOrder);
    return NextResponse.json(populatedOrder);
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create order' },
      { status: 500 }
    );
  }
} 