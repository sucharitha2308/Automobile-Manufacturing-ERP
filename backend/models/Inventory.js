import mongoose from 'mongoose';

const inventorySchema = new mongoose.Schema(
  {
    rawMaterial: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'RawMaterial',
      required: true,
    },
    warehouse: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Warehouse',
      required: true,
    },
    currentStock: {
      type: Number,
      required: true,
      default: 0,
    },
    batchNumber: {
      type: String,
    },
    lastRestocked: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Inventory = mongoose.model('Inventory', inventorySchema);
export default Inventory;
