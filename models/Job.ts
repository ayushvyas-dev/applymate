import mongoose, { Schema, Document } from 'mongoose';

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    company: {
      type: String,
      required: true,
      trim: true,
    },
    url: {
      type: String,
      trim: true,
    },
    section: {
      type: String,
      enum: ['saved', 'applied', 'interview', 'offered', 'rejected'],
      default: 'saved',
      required: true,
    },
    salary: {
      type: Number,
    },
    location: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.models.Job || mongoose.model('Job', jobSchema);
