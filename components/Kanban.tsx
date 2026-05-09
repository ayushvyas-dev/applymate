export default function Kanban() {
  const columns = [
    {
      title: 'Applied',
      count: 3,
      jobs: [
        { role: 'Frontend Intern', company: 'Google' },
        { role: 'Web Developer', company: 'StartupX' },
      ],
    },
    {
      title: 'OA',
      count: 2,
      jobs: [
        { role: 'SDE Intern', company: 'Amazon' },
        { role: 'Backend Intern', company: 'Paytm' },
      ],
    },
    {
      title: 'Interview',
      count: 1,
      jobs: [{ role: 'React Intern', company: 'Zomato' }],
    },
    {
      title: 'Rejected',
      count: 1,
      jobs: [{ role: 'Software Intern', company: 'Infosys' }],
    },
    {
      title: 'Offer',
      count: 1,
      jobs: [{ role: 'Frontend Developer', company: 'Swiggy' }],
    },
  ];
  return (
    <section className=''>
      <div className='grid grid-cols-5 gap-4 min-w-300'>
        {columns.map((column) => (
          <div
            key={column.title}
            className='bg-surface rounded-xl p-4 border border-zinc-800 min-h-150'
          >
            {/* Column Header */}
            <div className='bg-slate-400 flex justify-center items-center mb-4'>
              <h3 className='text-white font-semibold text-lg'>
                {column.title}
              </h3>

              <span className=' text-zinc-300 text-sm px-2 py-1 rounded-md'>
                {column.count}
              </span>
            </div>

            {/* Cards */}
            <div className='space-y-3'>
              {column.jobs.map((job, index) => (
                <div
                  key={index}
                  className='bg-slate-400 rounded-lg p-3 border border-zinc-700 hover:border-violet-500 transition cursor-pointer'
                >
                  <h4 className='text-white font-medium'>{job.role}</h4>

                  <p className='text-zinc-400 text-sm mt-1'>{job.company}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
