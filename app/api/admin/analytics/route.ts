import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import Order from '@/models/Order';
import Product from '@/models/Product';

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

    // Get date ranges for analytics
    const now = new Date();
    const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);

    // Get all orders
    const allOrders = await Order.find({ paymentStatus: 'completed' })
      .populate('items.product', 'name price category')
      .sort({ createdAt: -1 });

    // Calculate total revenue
    const totalRevenue = allOrders.reduce((sum, order) => sum + order.totalAmount, 0);

    // Calculate this month's revenue
    const thisMonthOrders = allOrders.filter(order => 
      new Date(order.createdAt) >= thisMonth
    );
    const thisMonthRevenue = thisMonthOrders.reduce((sum, order) => sum + order.totalAmount, 0);

    // Calculate last month's revenue
    const lastMonthOrders = allOrders.filter(order => {
      const orderDate = new Date(order.createdAt);
      return orderDate >= lastMonth && orderDate <= lastMonthEnd;
    });
    const lastMonthRevenue = lastMonthOrders.reduce((sum, order) => sum + order.totalAmount, 0);

    // Calculate growth percentage
    const growthPercentage = lastMonthRevenue > 0 
      ? ((thisMonthRevenue - lastMonthRevenue) / lastMonthRevenue) * 100 
      : 0;

    // Get popular products
    const productSales = {};
    allOrders.forEach(order => {
      order.items.forEach(item => {
        const productName = item.product?.name || 'Unknown Product';
        if (!productSales[productName]) {
          productSales[productName] = {
            name: productName,
            quantity: 0,
            revenue: 0,
            category: item.product?.category || 'Unknown'
          };
        }
        productSales[productName].quantity += item.quantity;
        productSales[productName].revenue += item.price * item.quantity;
      });
    });

    // Sort products by quantity sold
    const topProducts = Object.values(productSales)
      .sort((a: any, b: any) => b.quantity - a.quantity)
      .slice(0, 10);

    // Get category sales
    const categorySales = {};
    allOrders.forEach(order => {
      order.items.forEach(item => {
        const category = item.product?.category || 'Unknown';
        if (!categorySales[category]) {
          categorySales[category] = {
            category,
            quantity: 0,
            revenue: 0
          };
        }
        categorySales[category].quantity += item.quantity;
        categorySales[category].revenue += item.price * item.quantity;
      });
    });

    // Get recent orders
    const recentOrders = allOrders.slice(0, 5);

    // Get order statistics
    const totalOrders = allOrders.length;
    const thisMonthOrdersCount = thisMonthOrders.length;
    const lastMonthOrdersCount = lastMonthOrders.length;

    const analytics = {
      revenue: {
        total: totalRevenue,
        thisMonth: thisMonthRevenue,
        lastMonth: lastMonthRevenue,
        growth: growthPercentage
      },
      orders: {
        total: totalOrders,
        thisMonth: thisMonthOrdersCount,
        lastMonth: lastMonthOrdersCount
      },
      topProducts,
      categorySales: Object.values(categorySales),
      recentOrders: recentOrders.map(order => ({
        id: order._id,
        totalAmount: order.totalAmount,
        status: order.status,
        createdAt: order.createdAt,
        itemCount: order.items.length
      }))
    };

    return NextResponse.json(analytics);
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    );
  }
} 