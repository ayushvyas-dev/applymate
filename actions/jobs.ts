'use server';

import { dbConnect } from '@/lib/db';
import Job from '@/models/Job';
import { revalidatePath } from 'next/cache';

interface CreateJobInput {
  title: string;
  company: string;
  url: string;
  section: string;
  salary: number;
  location: string;
  description: string;
}

export default async function CreateJob(data: CreateJobInput) {
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

export async function GetJobs() {
  await dbConnect();
  const jobs = await Job.find().lean();

  return jobs.map((job) => ({
    ...job,
    _id: job._id.toString(),
  }));
}

export async function GetJob() {}

export async function UpdateJob() {}

export async function DeleteJob() {}
