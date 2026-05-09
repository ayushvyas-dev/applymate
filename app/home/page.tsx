'use client';

import HomeNavbar from '@/components/HomeNavbar';
import JobCard from '@/components/JobCard';

async function createJob() {}

import { Plus } from 'lucide-react';
import { X } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function HomePage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  return (
    <div className='min-h-screen bg-gray-100'>
      <HomeNavbar />

      <main className='max-w-304 mx-auto px-4 py-4 '>
        <section>
          <div className='flex justify-between items-center '>
            <h2 className='text-black text-xl '>Your Jobs</h2>
            <button
              onClick={() => setIsFormOpen(true)}
              className='flex  text-center text-sm gap-1 bg-blue-600 text-white py-1 px-4 rounded-md cursor-pointer '
            >
              <div className='flex items-center'>
                <Plus />
              </div>
              <p>Add Job</p>
            </button>
          </div>
        </section>
        {/* Kanban Board */}
        <section>
          <div className='flex gap-4 max-w-304 h-108 bg-white border-2 border-zinc-300 rounded-md p-2 my-2'>
            <div className=' bg-[#E6EEFB] w-75 rounded-md'>
              <div className='text-black flex justify-between p-2'>
                <div>Saved</div>
                <div className='bg-[#CFE2FC] rounded-md p-1 text-sm'>
                  0 Jobs
                </div>
              </div>
              <JobCard />
            </div>
            <div className=' bg-[#E6EEFB] w-75 rounded-md'>
              <div className='text-black flex'>
                <div>Saved</div>
                <div></div>
              </div>
            </div>
            <div className=' bg-[#E6EEFB] w-75 rounded-md'>
              <div className='text-black flex'>
                <div>Saved</div>
                <div></div>
              </div>
            </div>
            <div className=' bg-[#E6EEFB] w-75 rounded-md'>
              <div className='text-black flex'>
                <div>Saved</div>
                <div></div>
              </div>
            </div>
            <div className=' bg-[#E6EEFB] w-75 rounded-md'>
              <div className='text-black flex'>
                <div>Saved</div>
                <div></div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <AnimatePresence>
        {isFormOpen && (
          <motion.div // Fade in/out the background overlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='bg-black/60 fixed inset-0 z-50 p-2 '
          >
            <motion.main
              // Scale and fade the actual form box
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', duration: 0.3 }}
              className='bg-white max-w-sm mx-auto    border rounded'
            >
              <div className='flex justify-between items-center  p-2 px-4 border-b border-gray-200 rounded-md'>
                <h2 className='text-md  text-black '>Add Job</h2>

                <button
                  type='button'
                  onClick={() => setIsFormOpen(false)}
                  className='text-zinc-500 cursor-pointer'
                >
                  <X />
                </button>
              </div>

              {/* 3. Connect the form to the Server Action */}
              <form
                action={createJob}
                className='flex flex-col gap-4 text-black text-sm'
              >
                <div className=''>
                  <div className='flex flex-col items-center space-y-2'>
                    <div className='space-y-0.5'>
                      <div className='mt-2'>Job Title</div>
                      <input
                        type='text'
                        name='title' // The 'name' attribute is mandatory to read data on the server
                        placeholder='Job Title'
                        required
                        className='w-80 text-sm border border-slate-500 p-2 rounded'
                      />
                    </div>
                    <div className=''>
                      <div className=''>Company Name</div>
                      <input
                        type='text'
                        name='title' // The 'name' attribute is mandatory to read data on the server
                        placeholder='Company Name'
                        required
                        className='w-80 text-sm border border-slate-500 p-2 rounded'
                      />
                    </div>
                    <div>
                      <div>Job Url</div>
                      <input
                        type='text'
                        name='title' // The 'name' attribute is mandatory to read data on the server
                        placeholder='Job Url'
                        required
                        className='w-80 text-sm border border-slate-500 p-2 rounded'
                      />
                    </div>
                    <div>
                      <div>Section</div>
                      <input
                        type='text'
                        name='title' // The 'name' attribute is mandatory to read data on the server
                        placeholder=''
                        required
                        className='w-80 text-sm border border-slate-500 p-2 rounded'
                      />
                    </div>
                    <div>
                      <div>Salary</div>
                      <input
                        type='text'
                        name='title' // The 'name' attribute is mandatory to read data on the server
                        placeholder='50000'
                        required
                        className='w-80 text-sm border border-slate-500 p-2 rounded'
                      />
                    </div>
                    <div>
                      <div>Location</div>
                      <input
                        type='text'
                        name='title' // The 'name' attribute is mandatory to read data on the server
                        placeholder='Location'
                        required
                        className='w-80 text-sm border border-slate-500 p-2 rounded'
                      />
                    </div>
                    <div>
                      <div>Description</div>
                      <input
                        type='text'
                        name='title' // The 'name' attribute is mandatory to read data on the server
                        placeholder='Paste or Type the Job Description'
                        required
                        className='w-80 text-sm border border-slate-500 p-2 rounded'
                      />
                    </div>
                  </div>
                </div>
                <div className='flex items-center justify-center gap-4'>
                  <button
                    type='button'
                    onClick={() => setIsFormOpen(false)}
                    className='bg-white text-blue-500 p-2 px-6 border border-blue-500 rounded-md cursor-pointer hover:bg-blue-80 '
                  >
                    Cancel
                  </button>

                  <button
                    type='submit'
                    className='bg-blue-500 text-white p-2 px-6 rounded-md cursor-pointer hover:bg-blue-400'
                  >
                    Submit
                  </button>
                </div>
              </form>
            </motion.main>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
