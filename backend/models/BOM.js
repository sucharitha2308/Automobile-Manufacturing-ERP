import mongoose from 'mongoose';

const bomSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
      unique: true,
    },
    materials: [
      {
        rawMaterial: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'RawMaterial',
          required: true,
        },
        quantityRequired: {
          type: Number,
          required: true,
        },
      },
    ],
    version: {
      type: String,
      default: 'v1.0',
    },
  },
  {
    timestamps: true,
  }
);

const BOM = mongoose.model('BOM', bomSchema);
export default BOM;
