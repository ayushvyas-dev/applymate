'use server';

import { dbConnect } from '@/lib/db';
import Job from '@/models/Job';
import { revalidatePath } from 'next/cache';

interface createJobInput {
  title: string;
  company: string;
  url: string;
  section: string;
  salary: number;
  location: string;
  description: string;
}
export interface JobItem {
  _id: string;
  title: string;
  company: string;
  section: 'saved' | 'applied' | 'interview' | 'offered' | 'rejected';
  url: string;
  salary: number;
  location: string;
  description: string;
}

export default async function createJob(data: createJobInput) {
  try {
    await dbConnect();
    const job = await Job.create({ ...data });
    revalidatePath('/board');
    return {
      success: true,
      status: 201,
      message: 'job created successfully',
    };
  } catch (error) {
    console.error('Error creating job', error);
    return {
      success: false,
      status: 500,
      message: 'failed to create job',
    };
  }
}

export async function getJobs(): Promise<JobItem[]> {
  await dbConnect();
  const jobs = await Job.find().lean();

  return jobs.map((job) => ({
    ...job,
    _id: job._id.toString(),
  })) as unknown as JobItem[];
}

export async function getJob() {}

export async function updateJob() {}

export async function deleteJob() {}
