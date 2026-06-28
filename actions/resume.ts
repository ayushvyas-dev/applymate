'use server';

import Resume from '@/models/Resume';
import { authOptions } from '@/lib/auth';
import { dbConnect } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { groqModel } from '@/lib/ai/models';
import { resumeMatcherPrompt } from '@/lib/ai/prompts';
import { generateText } from 'ai';
import { resumeToJSONPrompt } from '@/lib/ai/prompts';

interface ResumeMatcherInput {
  description: string;
  structuredResume: object;
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
  structuredResume: object;

  isDefault: boolean;
}

interface CreateResumeProps {
  userId: string;
  file: {
    name: string;
    ufsUrl: string;
    key: string;
    size: number;
  }
  resumeText: string;
  pageCount: number;
  isDefault: boolean;
}

export async function createUserResume({ userId, file, resumeText, pageCount, isDefault }: CreateResumeProps) {
  console.log('createUserResume is running')


  try {
    const result = await generateText({ model: groqModel, prompt: resumeToJSONPrompt(resumeText) });
    const structuredResume = JSON.parse(result.text);


    await dbConnect();

    const resume = await Resume.create({
      userId: userId,
      title: file.name.replace('.pdf', ''),
      fileName: file.name,
      fileUrl: file.ufsUrl,
      fileKey: file.key,
      fileSize: file.size,
      pageCount,
      resumeText,
      structuredResume,
      isDefault,
    });
    console.log('resume created')

    return {
      success: true,
      data: resume,
    };
  } catch (error) {
    console.error('Error parsing JSON resume', error);
  }




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

export async function deleteUserResume(resumeId: string) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    throw new Error('Unauthorized');
  }

  await dbConnect();
  const resume = await Resume.findById(resumeId);

  if (!resume) {
    throw new Error('Resume not found');
  }

  if (resume.userId.toString() !== session.user.id) {
    throw new Error('Unauthorized');
  }

  await resume.deleteOne();
  return { success: true };
}

export async function matchResume({ structuredResume, description }: ResumeMatcherInput) {
  try {
    const result = await generateText({
      model: groqModel,
      prompt: resumeMatcherPrompt(structuredResume, description),
    });

    const cleanedText = result.text
      .replace(/```json/g, '')
      .replace(/```/g, '')
      .trim();


    const value = JSON.parse(cleanedText)

    console.log('AI response:', value);

    return {
      success: true,
      data: JSON.parse(cleanedText),
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      error: 'Failed to match resume',
    };
  }
}
