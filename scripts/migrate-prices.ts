import { connect } from 'mongoose';
import Product from '../models/Product';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

async function migratePrices() {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }

    console.log('Connecting to MongoDB...');
    await connect(process.env.MONGODB_URI);

    console.log('Fetching all products...');
    const products = await Product.find({});
    
    console.log(`Found ${products.length} products to migrate`);

    let updatedCount = 0;
    for (const product of products) {
      // Check if product already has the new price structure
      if (product.retailPrice && product.wholesalePrice) {
        console.log(`Product "${product.name}" already has both prices, skipping...`);
        continue;
      }

      // If product has old price field, migrate it
      if ((product as any).price) {
        const oldPrice = (product as any).price;
        console.log(`Migrating product "${product.name}" from price ${oldPrice} to retailPrice and wholesalePrice`);
        
        // Set retail price to old price, wholesale price to 80% of retail (typical wholesale discount)
        const retailPrice = oldPrice;
        const wholesalePrice = Math.round(oldPrice * 0.8 * 100) / 100; // Round to 2 decimal places
        
        await Product.findByIdAndUpdate(product._id, {
          retailPrice,
          wholesalePrice,
          $unset: { price: 1 } // Remove the old price field
        });
        
        updatedCount++;
      } else {
        console.log(`Product "${product.name}" has no price field, setting default prices`);
        
        // Set default prices if no price exists
        await Product.findByIdAndUpdate(product._id, {
          retailPrice: 29.99,
          wholesalePrice: 23.99
        });
        
        updatedCount++;
      }
    }

    console.log(`Migration completed! Updated ${updatedCount} products.`);
    process.exit(0);
  } catch (error) {
    console.error('Error during migration:', error);
    process.exit(1);
  }
}

migratePrices(); 