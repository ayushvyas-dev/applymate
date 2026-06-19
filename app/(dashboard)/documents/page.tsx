'use client';
import { UploadButton } from '@/lib/uploadthing/uploadthing';

export default function DocumentPage() {
  return (
    // <div>
    //   <main className='p-8 max-w-xl mx-auto space-y-4'>
    //     <h1 className='text-2xl font-bold'>Upload Your Resume</h1>
    //     <p className='text-gray-500 text-sm'>Upload your PDF resume.</p>

    //     <UploadButton
    //       endpoint='resumeUploader'
    //       onClientUploadComplete={(res) => {
    //         console.log('Files: ', res);
    //         alert('Upload successful! File processing initiated.');
    //       }}
    //       onUploadError={(error: Error) => {
    //         alert(`Upload failed: ${error.message}`);
    //       }}
    //     />
    //   </main>
    // </div>

    <div className='max-w-6xl mx-auto p-6 space-y-10'>
      {/* Header */}
      <div>
        <h1 className='text-3xl font-bold text-gray-900'>Resume Dashboard</h1>
        <p className='text-gray-500 mt-2'>
          Upload your resume to get your AI score and improvement tips.
        </p>
      </div>

      {/* Section 1: Upload Area */}
      <section className='border-2 border-dashed border-gray-300 rounded-xl p-12 text-center bg-gray-50 hover:bg-gray-100 transition'>
        <div className='flex flex-col items-center justify-center'>
          {/* Replace with an icon */}
          <svg
            className='w-12 h-12 text-gray-400 mb-4'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12'
            ></path>
          </svg>
          <p className='text-lg font-medium text-gray-700'>
            Drag & drop your PDF here
          </p>
          <p className='text-sm text-gray-500 mt-1'>or click to browse files</p>
          <button className='mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700'>
            Select PDF
          </button>
        </div>
      </section>

      {/* Section 2: Uploaded Resumes */}
      <section>
        <h2 className='text-xl font-semibold text-gray-800 mb-4'>
          Past Analyses
        </h2>

        {/* Grid for Resume Cards */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {/* Sample Card */}
          <div className='border border-gray-200 rounded-lg p-5 shadow-sm bg-white flex flex-col justify-between'>
            <div>
              <div className='flex justify-between items-start mb-4'>
                <h3 className='font-medium text-gray-900 truncate'>
                  Software_Eng_Resume.pdf
                </h3>
                {/* AI Score Badge */}
                <span className='px-3 py-1 bg-green-100 text-green-800 text-sm font-bold rounded-full'>
                  85/100
                </span>
              </div>
              <p className='text-sm text-gray-500'>Uploaded: 12 April 2026</p>
            </div>
            <button className='mt-6 w-full py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 text-sm font-medium'>
              View AI Feedback
            </button>
          </div>

          {/* Add more cards here dynamically via map() */}
        </div>
      </section>
    </div>
  );
}
