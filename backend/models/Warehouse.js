import mongoose from 'mongoose';

const warehouseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    location: {
      type: String,
      required: true,
    },
    capacity: {
      type: Number,
      required: true, // Capacity in volume or abstract units
    },
    manager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

const Warehouse = mongoose.model('Warehouse', warehouseSchema);
export default Warehouse;
