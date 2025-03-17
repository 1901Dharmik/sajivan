import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true },
  subtotal: { type: Number, required: true }
});

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  shippingInfo: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    landmark: { type: String, required: true },
    pincode: { type: String, required: true }
  },
  paymentInfo: {
    razorpayOrderId: String,
    razorpayPaymentId: String,
    stripePaymentIntentId: String,
    stripePaymentStatus: String
  },
  paymentMethod: {
    type: String,
    required: true,
    enum: ['COD', 'Razorpay', 'Stripe','card']
  },
  orderItems: [orderItemSchema],
  totalPrice: {
    type: Number,
    required: true
  },
  totalPriceAfterDiscount: {
    type: Number,
    required: true
  },
  orderStatus: {
    type: String,
    default: 'Ordered',
    enum: ['Ordered', 'Processing', 'Shipped', 'Delivered', 'Cancelled']
  }
}, {
  timestamps: true
});

export default mongoose.models.Order || mongoose.model('Order', orderSchema);