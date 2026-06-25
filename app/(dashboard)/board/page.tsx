import AddJob from '@/components/job-board/add-job';
import JobBoard from '@/components/job-board/board';

export default function BoardPage() {
  return (
    <div className=' flex-1 w-full h-fit   border  rounded-md'>
      <div className='flex  justify-between p-2 px-6'>
        <h1>Your Applications</h1>
        <AddJob className='cursor-pointer' />
      </div>
      <div className='  '>
        <JobBoard></JobBoard>
      </div>
    </div>
  );
}
