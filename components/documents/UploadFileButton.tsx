'use client';
import { Button } from '../ui/button';
import { UploadButton } from '@/lib/uploadthing/uploadthing';
import { useRouter } from 'next/navigation';

export default function UploadFileButton() {
  const router = useRouter();
  return (
    <div>
      <Button className=''>
        <UploadButton
          endpoint='resumeUploader'
          className='h-8'
          onClientUploadComplete={(res) => {
            console.log('Files: ', res);
            router.refresh();
            alert('Upload successful! File processing initiated.');
          }}
          onUploadError={(error: Error) => {
            alert(`Upload failed: ${error.message}`);
          }}
        />
      </Button>
    </div>
  );
}
