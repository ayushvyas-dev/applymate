import { getUserResumes } from '@/actions/resume';
import UploadFileButton from '@/components/UploadFileButton';
import ResumeCard from '@/components/ResumeCard';

export default async function DocumentPage() {
  const resumes = await getUserResumes();
  console.log('Fetched resumes:', resumes);
  return (
    <div className='max-w-6xl mx-auto p-6 space-y-10'>
      {/* Header */}
      <div>
        <div className=''>
          <h1 className='text-xl font-bold'>Documents</h1>
          <div className='flex justify-between'>
            <p className='0 mt-2'>
              Upload your resume to get your AI score and improvement tips.
            </p>
            <UploadFileButton />
          </div>
        </div>
      </div>

      {/* All uploaded resumes */}
      <section className='max-w-7xl  border-2 border-dashed  rounded-md p-2   transition'>
        <div className='flex  justify-end'>
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
