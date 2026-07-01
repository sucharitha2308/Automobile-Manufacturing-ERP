import mongoose from 'mongoose';

const purchaseOrderSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: String,
      required: true,
      unique: true,
    },
    supplier: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Supplier',
      required: true,
    },
    items: [
      {
        rawMaterial: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'RawMaterial',
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
      enum: ['Pending', 'Approved', 'Shipped', 'Delivered', 'Cancelled'],
      default: 'Pending',
    },
    orderedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    deliveryDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const PurchaseOrder = mongoose.model('PurchaseOrder', purchaseOrderSchema);
export default PurchaseOrder;
