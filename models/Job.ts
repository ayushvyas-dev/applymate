import mongoose from 'mongoose';

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
      enum: ['saved', 'applied', 'interviewing', 'offer', 'rejected'],
      default: 'saved',
      required: true,
    },
    salary: {
      type: Number,
    },
    location: {
      type: String,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true },
);

export default mongoose.models.Job || mongoose.model('Job', jobSchema);
