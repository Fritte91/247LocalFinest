import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    await connectDB();
    
    const products = await Product.find({});
    
    // If user is logged in, return appropriate price based on buyer type
    if (session?.user) {
      const productsWithPrice = products.map(product => {
        const productObj = product.toObject();
        const price = session.user.buyerType === 'wholesale' ? productObj.wholesalePrice : productObj.retailPrice;
        return {
          ...productObj,
          price, // Add the appropriate price for the user
          retailPrice: productObj.retailPrice, // Keep both prices for admin use
          wholesalePrice: productObj.wholesalePrice
        };
      });
      return NextResponse.json(productsWithPrice);
    }
    
    // For non-authenticated users, return retail prices
    const productsWithRetailPrice = products.map(product => {
      const productObj = product.toObject();
      return {
        ...productObj,
        price: productObj.retailPrice, // Default to retail price
        retailPrice: productObj.retailPrice,
        wholesalePrice: productObj.wholesalePrice
      };
    });
    
    return NextResponse.json(productsWithRetailPrice);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const product = await Product.create(body);
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
} 