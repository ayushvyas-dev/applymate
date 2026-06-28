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
    structuredResume: {
      basics: {
        name: String,
        email: String,
        phone: String,
        location: String,
        summary: String,
        linkedin: String,
        github: String,
        portfolio: String,

      },

      skills: [
        {
          category: String, // Frontend, Backend, Tools
          items: [String],
        },
      ],

      experience: [
        {
          company: String,
          role: String,
          employmentType: String,
          location: String,
          startDate: String,
          endDate: String,
          currentlyWorking: Boolean,
          description: [String],
          technologies: [String],
        },
      ],

      education: [
        {
          institution: String,
          degree: String,
          fieldOfStudy: String,
          startDate: String,
          endDate: String,
          cgpa: String,
          location: String,
        },
      ],



      projects: [
        {
          name: String,
          technologies: [String],
          startDate: String,
          endDate: String,
          description: [String],
          githubUrl: String,
          liveUrl: String,
        },
      ],

      certifications: [
        {
          name: String,
          issuer: String,
          issueDate: String,
          credentialUrl: String,
        },
      ],

      achievements: [String],

      languages: [String],

      customSections: {}
    },


    isDefault: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export default mongoose.models.Resume || mongoose.model('Resume', resumeSchema);
