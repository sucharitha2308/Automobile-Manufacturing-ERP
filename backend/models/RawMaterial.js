import mongoose from 'mongoose';

const rawMaterialSchema = new mongoose.Schema(
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
      enum: ['Metals', 'Plastics', 'Electronics', 'Fabrics', 'Fluids', 'Other'],
    },
    unit: {
      type: String,
      required: true,
      enum: ['kg', 'L', 'pcs', 'm'],
    },
    minimumStock: {
      type: Number,
      required: true,
      default: 0,
    },
    maximumStock: {
      type: Number,
      required: true,
      default: 10000,
    },
    pricePerUnit: {
      type: Number,
      required: true,
      default: 0,
    },
    barcode: {
      type: String,
    }
  },
  {
    timestamps: true,
  }
);

const RawMaterial = mongoose.model('RawMaterial', rawMaterialSchema);
export default RawMaterial;
