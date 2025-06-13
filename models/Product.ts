import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
  },
  category: {
    type: String,
    required: [true, 'Product category is required'],
    enum: ['flowers', 'glassware', 'artwork'],
  },
  // Subcategory supports all possible values for all categories
  subcategory: {
    type: String,
    enum: [
      // Flowers
      'sativa', 'indica', 'hybrid',
      // Glassware
      'bongs', 'pipes', 'accessories',
      // Artwork
      'prints', 'sculptures', 'photography'
    ],
  },
  price: {
    type: Number,
    required: [true, 'Product price is required'],
    min: [0, 'Price cannot be negative'],
  },
  stock: {
    type: Number,
    required: [true, 'Product stock is required'],
    min: [0, 'Stock cannot be negative'],
  },
  status: {
    type: String,
    enum: ['active', 'low_stock', 'out_of_stock'],
    default: 'active',
  },
  // Optional fields for flowers
  thc: { type: String },
  cbd: { type: String },
  effects: { type: String }, // comma-separated string
  terpenes: { type: String }, // comma-separated string
  flavors: { type: String }, // comma-separated string
  grower: { type: String },
  // Optional fields for artwork/glassware
  artist: { type: String },
  // General fields
  description: { type: String },
  images: [{ type: String }], // Array of image URLs
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update the updatedAt timestamp before saving
productSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.models.Product || mongoose.model('Product', productSchema); 