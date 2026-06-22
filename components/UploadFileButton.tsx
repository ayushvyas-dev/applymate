'use client';
import { Button } from './ui/button';
import { UploadButton } from '@/lib/uploadthing/uploadthing';

export default function UploadFileButton() {
  return (
    <div>
      <Button className=''>
        <UploadButton
          endpoint='resumeUploader'
          onClientUploadComplete={(res) => {
            console.log('Files: ', res);
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
