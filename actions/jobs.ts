'use server';

import { dbConnect } from '@/lib/db';
import Job from '@/models/Job';
import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

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
  createdAt: Date;
  updatedAt: Date;
}



export default async function createJob(data: createJobInput) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    throw new Error('Unauthorized');
  }
  try {
    await dbConnect();
    await Job.create({ ...data, userId: session.user.id });
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
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    throw new Error('Unauthorized');
  }
  await dbConnect();
  console.log('DB connected');
  const jobs = await Job.find({ userId: session.user.id })
    .sort({ createdAt: -1 })
    .lean();
  const serializedJobs = JSON.parse(JSON.stringify(jobs));

  console.log('jobs serialized');

  return serializedJobs.map((job: JobItem) => ({
    ...job,
    _id: job._id.toString(),
  })) as unknown as JobItem[];
}

export async function getJob() { }

export async function updateJob() { }

export async function deleteJob(jobId: string) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    throw new Error('Unauthorized');
  }

  try {
    await dbConnect();

    const result = await Job.deleteOne({
      _id: jobId,
      userId: session.user.id,
    });

    if (result.deletedCount === 0) {
      return {
        success: false,
        status: 404,
        message: 'Job not found',
      };
    }



    return {
      success: true,
      status: 200,
      message: 'Job deleted successfully',
    };
  } catch (error) {
    console.error('Error deleting job', error);

    return {
      success: false,
      status: 500,
      message: 'Failed to delete job',
    };
  }
}