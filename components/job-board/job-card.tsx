import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Job } from '@/types/job';

interface JobCardProps {
  job: Job;
}

export default function JobCard({ job }: JobCardProps) {
  return (
    <Card className='cursor-grab active:cursor-grabbing hover:border-primary/50 transition-colors  my-4'>
      <CardHeader>
        <CardTitle className=''>{job.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className=''>{job.company}</p>
      </CardContent>
    </Card>
  );
}
