import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

function SkeletonCard() {
  return (
    <Card className='bg-card/80'>
      <CardHeader className='px-3 pt-3 pb-2'>
        <Skeleton className='h-4 w-3/4' />
      </CardHeader>
      <CardContent className='px-3 pb-3 pt-0 space-y-2'>
        <div className='flex items-center gap-1.5'>
          <Skeleton className='size-5 rounded' />
          <Skeleton className='h-3 w-20' />
        </div>
        <div className='flex items-center gap-1.5'>
          <Skeleton className='size-5 rounded' />
          <Skeleton className='h-3 w-16' />
        </div>
        <Separator className='my-2' />
        <div className='flex items-center justify-between'>
          <Skeleton className='h-3 w-16' />
          <div className='flex gap-1'>
            <Skeleton className='size-5 rounded' />
            <Skeleton className='size-5 rounded' />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function SkeletonColumn() {
  return (
    <Card className='w-full md:w-64 md:min-w-[16rem] shrink-0 flex flex-col shadow-lg'>
      <CardHeader className='pb-3 pt-4 px-4'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <Skeleton className='size-2.5 rounded-full' />
            <Skeleton className='h-4 w-16' />
          </div>
          <Skeleton className='h-5 w-6 rounded-full' />
        </div>
        <Skeleton className='mt-2 h-0.5 w-full rounded-full' />
      </CardHeader>
      <CardContent className='flex-1 px-3 pb-3 pt-0'>
        <div className='space-y-3'>
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      </CardContent>
    </Card>
  );
}

export default function Loading() {
  return (
    <div className='relative min-h-full'>
      {/* Background blobs matching hero / auth / profile / documents pages */}
      <div
        aria-hidden
        className='pointer-events-none fixed inset-0 -z-10 overflow-hidden'
      >
        <div className='absolute -top-40 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-primary/8 blur-3xl' />
        <div className='absolute -bottom-20 -right-20 h-[300px] w-[300px] rounded-full bg-chart-2/8 blur-3xl' />
        <div className='absolute top-60 -left-20 h-[250px] w-[250px] rounded-full bg-chart-3/6 blur-3xl' />
      </div>

      <div className='mx-auto max-w-7xl px-4 py-6'>
        {/* Page header skeleton */}
        <div className='mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between'>
          <div>
            <Skeleton className='h-9 w-60' />
            <Skeleton className='mt-2 h-4 w-80' />
          </div>
          <Skeleton className='h-9 w-24 rounded-md' />
        </div>

        <Separator className='mb-8' />

        {/* Board columns skeleton */}
        <div className='flex flex-col gap-4 md:flex-row md:overflow-x-auto pb-4'>
          <SkeletonColumn />
          <SkeletonColumn />
          <SkeletonColumn />
          <SkeletonColumn />
          <SkeletonColumn />
        </div>
      </div>
    </div>
  );
}
