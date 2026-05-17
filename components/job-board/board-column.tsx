import JobCard from './job-card';

export default function BoardColumn() {
  return (
    <div className='w-full sm:w-75 shrink-0 flex flex-col gap-3   bg-background'>
      <div className='flex justify-between bg-gray-600'>
        <h1>Category</h1>
        <span>0 Jobs</span>
      </div>

      <JobCard></JobCard>
    </div>
  );
}
