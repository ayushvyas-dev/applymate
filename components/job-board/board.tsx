import { GetJobs } from '@/actions/jobs';
import BoardColumn from './board-column';

export default async function JobBoard() {
  const jobs = await GetJobs();

  const groupedJobs = {
    saved: jobs.filter((job) => job.section === 'saved'),
    applied: jobs.filter((job) => job.section === 'applied'),
    interview: jobs.filter((job) => job.section === 'interview'),
    offered: jobs.filter((job) => job.section === 'offered'),
    rejected: jobs.filter((job) => job.section === 'rejected'),
  };

  return (
    <div className='flex   min-h-100   sm:overflow-x-auto pb-4'>
      {jobs ? (
        <div className='flex '>
          <BoardColumn title='Saved' jobs={groupedJobs.saved}></BoardColumn>
          <BoardColumn title='Applied' jobs={groupedJobs.applied}></BoardColumn>
          <BoardColumn
            title='Interview'
            jobs={groupedJobs.interview}
          ></BoardColumn>
          <BoardColumn title='Offered' jobs={groupedJobs.offered}></BoardColumn>
          <BoardColumn
            title='Rejected'
            jobs={groupedJobs.rejected}
          ></BoardColumn>
        </div>
      ) : (
        <div className='m-4'>Add jobs to view</div>
      )}
    </div>
  );
}
