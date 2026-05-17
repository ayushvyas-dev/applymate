import { NextRequest, NextResponse } from 'next/server';
import Job from '@/models/Job';
import { connectDB } from '@/lib/db';
import { authOptions } from '@/lib/authOptions';
import { getServerSession } from 'next-auth';

export async function POST(req: NextRequest) {
  const fakeJobData = {
    title: 'Full Stack Development Intern',
    company: 'Acme Tech Corp',
    url: 'https://wellfound.com/jobs/12345-full-stack-intern',
    section: 'applied',
    salary: 12000,
    location: 'Remote',
    description:
      'Working with Next.js, MongoDB, and Tailwind CSS to build internal dashboards.',
  };
  try {
    // const session = await getServerSession(authOptions);
    // if (!session) {
    //   return NextResponse.json(
    //     {
    //       error: 'Unauthorized',
    //     },
    //     { status: 401 },
    //   );

    const body = await req.json();

    await connectDB();
    await Job.create({ ...body });
    console.log('Job created successfully');

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error('Error creating job', error);
    return NextResponse.json(
      { error: 'something went wrong' },
      { status: 500 },
    );
  }
}
