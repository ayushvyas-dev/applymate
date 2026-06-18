import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  avatar: string;
  provider: 'credentials' | 'google';
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
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
      default: null,
      required: function (this: IUser) {
        return this.provider === 'credentials';
      },
      min: 8,
      trim: true,
    },
    provider: {
      type: String,
      enum: ['credentials', 'google'],
      required: true,
    },
    avatar: {
      type: String,
      default: null,
    },
  },
  { timestamps: true },
);

export default mongoose.models.User || mongoose.model('User', userSchema);
