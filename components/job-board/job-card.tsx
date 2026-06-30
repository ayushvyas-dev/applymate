'use client';

import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Job } from '@/types/job';
import { Trash, SquarePen, Building2, MapPin, DollarSign, Calendar } from 'lucide-react';
import { formatDate } from '@/lib/validations/format-date';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';
import { Separator } from '../ui/separator';

import { deleteJob } from '@/actions/jobs';

interface JobCardProps {
  job: Job;
}

export default function JobCard({ job }: JobCardProps) {
  const router = useRouter();

  async function handleDelete() {
    if (!window.confirm('Are you sure you want to delete this job?'))
      return;
    try {
      await deleteJob(job._id);
      router.refresh();
    }
    catch (error) {
      console.log("Error deleting job", error);

    }
  }
  return (
    <Card className='group relative transition-all duration-200 hover:shadow-md hover:border-primary/30 bg-card/80 backdrop-blur-sm'>
      <CardHeader className='px-3 pt-3 pb-2'>
        <CardTitle className='text-sm font-semibold leading-tight line-clamp-2'>
          {job.title}
        </CardTitle>
      </CardHeader>
      <CardContent className='px-3 pb-3 pt-0'>
        {/* Company & location */}
        <div className='space-y-1.5'>
          <div className='flex items-center gap-1.5'>
            <span className='inline-flex size-5 shrink-0 items-center justify-center rounded bg-primary/10'>
              <Building2 className='size-3 text-primary' />
            </span>
            <span className='text-xs font-medium truncate'>{job.company}</span>
          </div>

          {job.location && (
            <div className='flex items-center gap-1.5'>
              <span className='inline-flex size-5 shrink-0 items-center justify-center rounded bg-primary/10'>
                <MapPin className='size-3 text-primary' />
              </span>
              <span className='text-xs text-muted-foreground truncate'>
                {job.location}
              </span>
            </div>
          )}

          {job.salary > 0 && (
            <div className='flex items-center gap-1.5'>
              <span className='inline-flex size-5 shrink-0 items-center justify-center rounded bg-primary/10'>
                <DollarSign className='size-3 text-primary' />
              </span>
              <span className='text-xs text-muted-foreground'>
                {job.salary.toLocaleString()}
              </span>
            </div>
          )}
        </div>

        <Separator className='my-2' />

        {/* Footer: date & actions */}
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-1 text-muted-foreground'>
            <Calendar className='size-3' />
            <span className='text-[10px] tabular-nums'>
              {formatDate(job.createdAt)}
            </span>
          </div>

          <div className='flex items-center gap-0.5 opacity-0 transition-opacity group-hover:opacity-100'>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant='ghost'
                    size='icon'
                    className='size-7'
                    onClick={handleDelete}
                  >
                    <Trash className='size-3.5 text-destructive' />
                    <span className='sr-only'>Delete job</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Delete</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant='ghost'
                    size='icon'
                    className='size-7'
                  >
                    <SquarePen className='size-3.5 text-muted-foreground' />
                    <span className='sr-only'>Edit job</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Edit</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
