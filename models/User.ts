import mongoose, { Schema, Document } from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: false,
    },
    username: {
      type: String,
      required: false,
      unique: true,
      lowercase: true,
      trim: true,
      minLength: 3,
      maxLength: 20,
      match: /^[a-z0-9_-]+$/,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      min: 8,
      trim: true,
    },
    image: {
      type: String,
      default: null,
    },
  },
  { timestamps: true },
);

export default mongoose.models.User || mongoose.model('User', userSchema);
