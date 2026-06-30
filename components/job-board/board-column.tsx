import JobCard from './job-card';
import { Job } from '@/types/job';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

interface BoardColumnProps {
  title: string;
  jobs: Job[];
  gradient: string;
  dotColor: string;
}

export default function BoardColumn({ title, jobs, gradient, dotColor }: BoardColumnProps) {
  return (
    <Card className='w-full md:w-64 md:min-w-[16rem] shrink-0 flex flex-col shadow-lg'>
      {/* Column header with gradient accent */}
      <CardHeader className='pb-3 pt-4 px-4'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <span className={`inline-block size-2.5 rounded-full ${dotColor}`} />
            <h3 className='text-sm font-semibold tracking-tight'>
              {title}
            </h3>
          </div>
          <Badge variant='secondary' className='text-[10px] tabular-nums'>
            {jobs.length}
          </Badge>
        </div>
        {/* Gradient accent bar */}
        <div className={`mt-2 h-0.5 w-full rounded-full bg-gradient-to-r ${gradient} opacity-60`} />
      </CardHeader>

      {/* Job cards list */}
      <CardContent className='flex-1 px-3 pb-3 pt-0'>
        {jobs.length > 0 ? (
          <ScrollArea className='max-h-[60vh] md:max-h-[calc(100vh-20rem)]'>
            <div className='space-y-3 pr-2'>
              {jobs.map((job) => (
                <JobCard key={job._id} job={job} />
              ))}
            </div>
          </ScrollArea>
        ) : (
          <div className='flex flex-col items-center justify-center rounded-lg border border-dashed border-border/50 bg-muted/20 px-4 py-8 text-center'>
            <p className='text-xs text-muted-foreground'>No jobs here yet</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
