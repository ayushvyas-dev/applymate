'use server';

import Resume from '@/models/Resume';
import { authOptions } from '@/lib/auth';
import { dbConnect } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { groqModel } from '@/lib/ai/models';
import { resumeMatcherPrompt } from '@/lib/ai/prompts';
import { generateText } from 'ai';

interface ResumeMatcherInput {
  description: string;
  resumeText: string;
}

export interface ResumeItem {
  _id: string;

  title: string;

  fileUrl: string;

  fileKey: string;

  fileName: string;

  fileSize: number;

  pageCount: number;

  resumeText: string;

  isDefault: boolean;
}

export async function getUserResumes() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    throw new Error('Unauthorized');
  }
  await dbConnect();
  console.log('DB connected');

  const resumes = await Resume.find({ userId: session.user.id })
    .sort({ createdAt: -1 })
    .lean();

  const serializedResumes = JSON.parse(JSON.stringify(resumes));

  return serializedResumes.map((resume: ResumeItem) => ({
    ...resume,
    _id: resume._id.toString(),
  }));
}

export async function matchResume(data: ResumeMatcherInput) {
  try {
    const result = await generateText({
      model: groqModel,
      prompt: resumeMatcherPrompt(data),
    });

    return {
      success: true,
      data: JSON.parse(result.text),
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      error: 'Failed to match resume',
    };
  }
}
