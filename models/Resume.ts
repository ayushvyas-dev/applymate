import mongoose, { Schema, Document } from 'mongoose';

const resumeSchema = new mongoose.Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },

    title: {
      type: String,
      required: true,
    },

    fileUrl: {
      type: String,
      required: true,
    },

    fileKey: {
      type: String,
      required: true,
    },

    fileName: {
      type: String,
      required: true,
    },

    fileSize: {
      type: Number,
      required: true,
    },

    pageCount: {
      type: Number,
      default: 1,
    },

    resumeText: {
      type: String,
      required: true,
    },

    isDefault: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export default mongoose.models.Resume || mongoose.model('Resume', resumeSchema);
