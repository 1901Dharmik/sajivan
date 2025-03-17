import mongoose from "mongoose";

const ingredientsSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  });
  const problemToCareSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    images: [
      {
        public_id: String,
        url: String,
      },
    ],
  });

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    index: true,
    lowercase: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: [String],
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  sold: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: String,
      url: String,
    },
  ],
  tags: [String],
  care_for: [String],
  who_should_use: [String],
  dosage: [String],
  problem_to_cure: [problemToCareSchema],
  ingredients: [ingredientsSchema],

  ratings: [
    {
      star: Number,
      comment: String,
      postedby: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      createdAt: { type: Date, default: Date.now },
      updatedAt: { type: Date, default: Date.now },
    },
  ],
  totalrating: {
    type: String,
    default: 0,
  },
});

//Export the model
productSchema.index({ _id: 1 });

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

export default Product;