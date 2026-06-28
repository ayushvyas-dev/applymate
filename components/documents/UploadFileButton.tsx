'use client';

import { UploadButton } from '@/lib/uploadthing/uploadthing';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Upload } from 'lucide-react';

export default function UploadFileButton() {
  const router = useRouter();

  return (
    <div className='inline-flex items-center gap-2 rounded-lg bg-primary/10 px-3 py-2 ring-1 ring-primary/20 transition-colors hover:bg-primary/15'>
      <Upload className='size-4 text-primary' />
      <UploadButton
        endpoint='resumeUploader'
        className='ut-button:bg-primary ut-button:text-primary-foreground ut-button:text-sm ut-button:font-medium ut-button:h-8 ut-button:px-4 ut-button:rounded-md ut-button:shadow-sm ut-button:transition-colors ut-button:hover:bg-primary/90 ut-allowed-content:hidden'
        onClientUploadComplete={(res) => {
          console.log('Files: ', res);
          toast.success('Resume uploaded successfully!');
          router.refresh();
        }}
        onUploadError={(error: Error) => {
          toast.error(`Upload failed: ${error.message}`);
        }}
      />
    </div>
  );
}
