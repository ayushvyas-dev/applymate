'use server';

import Resume from '@/models/Resume';
import { authOptions } from '@/lib/auth';
import { dbConnect } from '@/lib/db';
import { getServerSession } from 'next-auth';

export async function getUserResumes() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    throw new Error('Unauthorized');
  }
  await dbConnect();
  console.log('DB connected');

  return Resume.find({
    userId: session.user.id,
  })
    .sort({ createdAt: -1 })
    .lean();
}
