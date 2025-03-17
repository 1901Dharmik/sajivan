import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: String,
    image: String,
    // role: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Role",
    // },
    emailVerified: Date,
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  {
    // Add a middleware hook using the schema options
    timestamps: true,
    // This is the Next.js 15 friendly approach
  }
);

// Create or retrieve the model
const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
