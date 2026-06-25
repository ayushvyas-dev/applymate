import { getUserResumes } from '@/actions/resume';
import UploadFileButton from '@/components/documents/UploadFileButton';
import ResumeCard from '@/components/documents/ResumeCard';

export default async function DocumentPage() {
  const resumes = await getUserResumes();

  return (
    <div className=' h-full w-full border rounded-md  '>
      {/* Header */}
      <div>
        <div className='p-2'>
          <h1 className='text-xl font-bold'>Documents</h1>
          <div className='flex justify-between'>
            <p className=' mt-2'>
              Upload your resume to get your AI score and improvement tips.
            </p>
            <UploadFileButton />
          </div>
        </div>
      </div>

      {/* All uploaded resumes */}
      <section className='max-w-7xl     rounded-md p-2   transition'>
        <div className='flex  '>
          <div className='grid gap-6 md:grid-cols-2 xl:grid-cols-3'>
            {resumes.map((resume) => (
              <ResumeCard
                key={resume._id.toString()}
                resume={JSON.parse(JSON.stringify(resume))}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
