import mongoose from 'mongoose';

const shippingInfoSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  landmark: String,
  pincode: { type: String, required: true },
  isDefault: { type: Boolean, default: false },
}, {
  timestamps: true
});

export default mongoose.models.ShippingInfo || mongoose.model('ShippingInfo', shippingInfoSchema);