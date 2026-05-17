import mongoose, { Schema, Document } from 'mongoose';

export interface Job extends Document {
  title: string;
  company: string;
}

const jobSchema: Schema<Job> = new mongoose.Schema(
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
      enum: ['saved', 'applied', 'interviewing', 'offered', 'rejected'],
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
  },
  { timestamps: true },
);

export default (mongoose.models.Job as mongoose.Model<Job>) ||
  mongoose.model<Job>('Job', jobSchema);
