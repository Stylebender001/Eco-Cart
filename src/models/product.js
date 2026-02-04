import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    // Basic Info
    id: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    brand: {
      type: String,
      required: true,
    },
    description: String,

    // Price (raw number)
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },

    // Category
    category: {
      type: String,
      required: true,
      enum: ['clothing', 'electronics', 'home', 'beauty', 'food', 'other'],
    },

    // Sustainability Metrics (raw data)
    carbonFootprint: {
      type: Number, // In kg
      required: true,
    },

    // Eco Score Grade
    ecoScore: {
      type: String,
      enum: ['A+', 'A', 'B', 'C', 'D', 'F'],
      required: true,
    },

    // Raw arrays (frontend will format)
    materials: [String],
    colors: [String],
    sizes: [String],

    // Stock
    stock: {
      type: Number,
      default: 10,
    },
    inStock: {
      type: Boolean,
      default: true,
    },

    // Timestamp
    timeStamps: {
      type: Date,
      default: Date.now,
    },

    updatedAt: Date, // for pre-save hook
  },
  {
    toJSON: { versionKey: false },
    toObject: { versionKey: false },
  }
);

// Update timestamp
productSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

const Product = mongoose.model('Product', productSchema);
export default Product;
