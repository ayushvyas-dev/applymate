import { getJobs } from '@/actions/jobs';
import BoardColumn from './board-column';
import { BriefcaseBusiness } from 'lucide-react';

const columnConfig = [
  { key: 'saved', title: 'Saved', gradient: 'from-violet-500 to-purple-500', dotColor: 'bg-violet-500' },
  { key: 'applied', title: 'Applied', gradient: 'from-blue-500 to-cyan-500', dotColor: 'bg-blue-500' },
  { key: 'interview', title: 'Interview', gradient: 'from-amber-500 to-orange-500', dotColor: 'bg-amber-500' },
  { key: 'offered', title: 'Offered', gradient: 'from-emerald-500 to-green-500', dotColor: 'bg-emerald-500' },
  { key: 'rejected', title: 'Rejected', gradient: 'from-rose-500 to-pink-500', dotColor: 'bg-rose-500' },
] as const;

export default async function JobBoard() {
  const jobs = await getJobs();

  const groupedJobs = {
    saved: jobs.filter((job) => job.section === 'saved'),
    applied: jobs.filter((job) => job.section === 'applied'),
    interview: jobs.filter((job) => job.section === 'interview'),
    offered: jobs.filter((job) => job.section === 'offered'),
    rejected: jobs.filter((job) => job.section === 'rejected'),
  };

  if (!jobs || jobs.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center rounded-xl border border-dashed border-border/60 bg-muted/30 px-6 py-20 text-center'>
        <span className='mb-4 inline-flex size-14 items-center justify-center rounded-2xl bg-primary/10'>
          <BriefcaseBusiness className='size-6 text-primary' />
        </span>
        <h3 className='text-lg font-semibold'>No applications yet</h3>
        <p className='mt-1 max-w-sm text-sm text-muted-foreground'>
          Add your first job to start tracking your applications across every
          stage of your pipeline.
        </p>
      </div>
    );
  }

  return (
    <div className='flex flex-col gap-4 md:flex-row md:overflow-x-auto pb-4'>
      {columnConfig.map((col) => (
        <BoardColumn
          key={col.key}
          title={col.title}
          jobs={groupedJobs[col.key]}
          gradient={col.gradient}
          dotColor={col.dotColor}
        />
      ))}
    </div>
  );
}
