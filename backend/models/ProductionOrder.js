import mongoose from 'mongoose';

const productionOrderSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: String,
      required: true,
      unique: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['Planned', 'In Progress', 'Completed', 'Rejected'],
      default: 'Planned',
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
    },
    workCenter: {
      type: String,
      required: true,
    },
    manager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    }
  },
  {
    timestamps: true,
  }
);

const ProductionOrder = mongoose.model('ProductionOrder', productionOrderSchema);
export default ProductionOrder;
