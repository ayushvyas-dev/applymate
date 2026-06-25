import { useCompletion } from '@ai-sdk/react';
import { getJobs } from '@/actions/jobs';

import { getUserResumes } from '@/actions/resume';
import CoverLetterForm from '@/components/cover-letter/CoverLetterForm';

// interface Job {
//   _id: string;
//   title: string;
// }
// interface Resume {
//   _id: string;
//   title: string;
//   fileName: string;
// }

export default async function CoverLetterGenerator() {
  const jobs = await getJobs();
  const resumes = await getUserResumes();
  // Combobox or select component for select job and select resume

  return (
    <div className=' flex-1 w-full h-full  border rounded-md'>
      <div className='flex h-full'>
        <CoverLetterForm jobs={jobs} resumes={resumes} />
        <div className='flex flex-row'>
          <h1>Generated cover letter </h1>
          <div></div>
        </div>
      </div>
    </div>

    // <div className='flex flex-col gap-6 max-w-3xl mx-auto p-6'>
    //   <div className='flex justify-between items-center'>
    //     <h2 className='text-2xl font-bold '>Cover Letter Generator</h2>

    //     <Button
    //       onClick={handleGenerate}
    //       disabled={isLoading}
    //       className='bg-indigo-500 hover:bg-indigo-600'
    //     >
    //       {isLoading ? 'Crafting...' : 'Start AI Generation'}
    //     </Button>
    //   </div>

    //   {error && (
    //     <div className='text-rose-500 text-sm font-medium'>
    //       Error: {error.message}
    //     </div>
    //   )}

    //   {/* 3. The Output Area */}
    //   <Card className=' border-zinc-800 min-h-[400px]'>
    //     <CardContent className='p-6'>
    //       <ScrollArea className='h-full'>
    //         {completion ? (
    //           // The text will automatically type out here in real-time
    //           <div className='whitespace-pre-wrap  leading-relaxed'>
    //             {completion}
    //           </div>
    //         ) : (
    //           <div className=' flex items-center justify-center h-[350px]'>
    //             Your AI-generated cover letter will appear here...
    //           </div>
    //         )}
    //       </ScrollArea>
    //     </CardContent>
    //   </Card>
    // </div>
  );
}
