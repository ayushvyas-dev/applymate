import { getJobs } from '@/actions/jobs';
import { getUserResumes } from '@/actions/resume';
import ResumeMatcherForm from '@/components/ResumeMatcherForm';

export default async function ResumeMatcherPage() {
  interface Job {
    _id: string;
    title: string;
  }

  const jobs = await getJobs();
  const resumes = await getUserResumes();

  return (
    <div>
      <div className='flex h-full'>
        <ResumeMatcherForm jobs={jobs} resumes={resumes} />
        <div>
          <h1>Generated cover letter </h1>
          <div></div>
        </div>
      </div>
    </div>
  );
}
