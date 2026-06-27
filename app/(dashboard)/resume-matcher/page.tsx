import { getJobs } from '@/actions/jobs';
import { getUserResumes } from '@/actions/resume';
import ResumeMatcherClient from '@/components/resume-matcher/ResumeMatcherClient';

export default async function ResumeMatcherPage() {
  const jobs = await getJobs();
  const resumes = await getUserResumes();

  return (
    <div className='flex-1 w-full h-full border rounded-md'>
      <ResumeMatcherClient jobs={jobs} resumes={resumes} />
    </div>
  );
}
