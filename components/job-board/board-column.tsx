import JobCard from './job-card';
import { Job } from '@/types/job';

interface BoardColumnProps {
  title: string;
  jobs: Job[];
}

export default function BoardColumn({ title, jobs }: BoardColumnProps) {
  return (
    <div className='w-full min-h-98 sm:w-48 shrink-0 flex flex-col mx-2  rounded-xl border'>
      <div className='border-b  px-2 py-1'>
        <h1 className='text-center '>
          {title}({jobs.length})
        </h1>
      </div>
      <div className='p-2'>
        {jobs.length > 0 ? (
          jobs.map((job) => <JobCard key={job._id} job={job} />)
        ) : (
          <p>No jobs to show</p>
        )}
      </div>
    </div>
  );
}
