import mongoose from 'mongoose';

const productcategorySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true, index: true },
    description: { type: String },
    slug: { type: String, required: true, unique: true, index: true , lowercase: true },
    images: [{ public_id: String, url: String }],
}, {
    timestamps: true,
});
export default mongoose.models.Category || mongoose.model('Category', productcategorySchema);