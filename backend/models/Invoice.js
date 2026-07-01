import mongoose from 'mongoose';

const invoiceSchema = new mongoose.Schema(
  {
    invoiceNumber: {
      type: String,
      required: true,
      unique: true,
    },
    salesOrder: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'SalesOrder',
      required: true,
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer',
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['Unpaid', 'Paid', 'Overdue', 'Cancelled'],
      default: 'Unpaid',
    },
    dueDate: {
      type: Date,
      required: true,
    },
    paidDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Invoice = mongoose.model('Invoice', invoiceSchema);
export default Invoice;
