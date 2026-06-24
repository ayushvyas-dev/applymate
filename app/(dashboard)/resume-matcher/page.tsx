import { getJobs } from '@/actions/jobs';
import { getUserResumes } from '@/actions/resume';
import ResumeMatcherClient from '@/components/ResumeMatcherClient';

export default async function ResumeMatcherPage() {
  const jobs = await getJobs();
  const resumes = await getUserResumes();

  return (
    <div>
      <div className='flex h-full'>
        <ResumeMatcherClient jobs={jobs} resumes={resumes} />
      </div>
    </div>
  );
}
