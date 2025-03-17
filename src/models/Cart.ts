import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  quantity: { type: Number, required: true, min: 1 },
  price: { type: Number },

}, {
  timestamps: true
});

export default mongoose.models.CartItem || mongoose.model('CartItem', cartItemSchema);