'use client';

import { ResumeItem } from '@/actions/resume';
import { deleteUserResume } from '@/actions/resume';
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import {
  FileText,
  Pencil,
  Trash2,
  ExternalLink,
  FileStack,
  HardDrive,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner'






function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function ResumeCard({ resume }: { resume: ResumeItem }) {
  const router = useRouter();
  async function handleDelete(resumeId: string) {

    try {
      await deleteUserResume(resumeId);
      toast.success("Resume deleted successfully!");
      router.refresh();
    } catch (error) {
      toast.error("Failed to delete resume!");
    }
  }
  return (
    <Card className='group relative transition-shadow hover:shadow-lg'>
      <CardHeader>
        <div className='flex items-start gap-3'>
          {/* File icon */}
          <span className='mt-0.5 inline-flex size-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500/20 to-purple-500/20'>
            <FileText className='size-5 text-violet-500' />
          </span>
          <div className='min-w-0 flex-1'>

            <CardTitle className='truncate'>{resume.title}</CardTitle>




            <CardDescription className='mt-0.5 truncate'>
              {resume.fileName}
            </CardDescription>
          </div>
        </div>
        {/* Default badge */}
        {resume.isDefault && (
          <Badge variant='secondary' className='mt-2 w-fit'>
            ⭐ Default
          </Badge>
        )}


      </CardHeader>

      <CardContent>
        <Separator className='mb-4' />
        <div className='flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted-foreground'>
          <span className='inline-flex items-center gap-1.5'>
            <FileStack className='size-3.5 text-primary/70' />
            {resume.pageCount} {resume.pageCount === 1 ? 'page' : 'pages'}
          </span>
          <span className='inline-flex items-center gap-1.5'>
            <HardDrive className='size-3.5 text-primary/70' />
            {formatFileSize(resume.fileSize)}
          </span>


        </div>
      </CardContent>

      <CardFooter className='gap-2'>
        {/* View / Open */}
        <Button
          variant='ghost'
          size='sm'
          className='h-8 gap-1.5 text-xs'
          asChild
        >
          <a href={resume.fileUrl} target='_blank' rel='noopener noreferrer'>
            <ExternalLink className='size-3.5' />
            View
          </a>
        </Button>

        <div className='ml-auto flex gap-1'>
          {/* Edit */}
          <Button
            variant='ghost'
            size='sm'
            className='size-8 p-0 text-muted-foreground hover:text-primary'
            aria-label='Edit resume'
          >
            <Pencil className='size-3.5' />
          </Button>

          {/* Delete */}
          <Button
            onClick={() => handleDelete(resume._id.toString())}
            variant='ghost'
            size='sm'
            className='size-8 p-0 text-muted-foreground hover:text-destructive'
            aria-label='Delete resume'
          >
            <Trash2 className='size-3.5' />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
