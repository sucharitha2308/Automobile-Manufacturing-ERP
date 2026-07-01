import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ['Sedan', 'SUV', 'Truck', 'Coupe', 'Hatchback', 'Electric'],
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    stockQuantity: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);
export default Product;
