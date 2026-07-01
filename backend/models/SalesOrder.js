import mongoose from 'mongoose';

const salesOrderSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: String,
      required: true,
      unique: true,
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer',
      required: true,
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        quantity: { type: Number, required: true },
        unitPrice: { type: Number, required: true },
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
      default: 'Pending',
    },
    deliveryDate: {
      type: Date,
    },
    salesRep: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    }
  },
  {
    timestamps: true,
  }
);

const SalesOrder = mongoose.model('SalesOrder', salesOrderSchema);
export default SalesOrder;
