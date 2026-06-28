import { dbConnect } from '@/lib/db';
import Resume from '@/models/Resume';
import { createUploadthing, type FileRouter } from 'uploadthing/next';
import { UploadThingError } from 'uploadthing/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

import { createUserResume } from '@/actions/resume';
import { extractResumeText } from '@/lib/extractResumeText';

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  resumeUploader: f({
    pdf: {
      maxFileSize: '4MB',
      maxFileCount: 1,
    },
  })
    // Set permissions and file types for this FileRoute
    .middleware(async () => {
      // This code runs on your server before upload
      const session = await getServerSession(authOptions);
      // If you throw, the user will not be able to upload
      if (!session?.user?.id) {
        throw new UploadThingError('Unauthorized');
      }

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: session.user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log('File uploaded to uploadthing');

      const existingResume = await Resume.countDocuments({
        userId: metadata.userId,
      });

      const extractedResume = await extractResumeText(file.ufsUrl)

      const resumeText = extractedResume.resumeText;
      console.log(resumeText);
      const pageCount = extractedResume.pageCount;

      const isDefault = existingResume === 0;
      console.log(metadata.userId)

      await createUserResume({
        userId: metadata.userId, file, resumeText, pageCount, isDefault
      })

      console.log('Upload complete for userId:', metadata.userId);

      console.log('file url', file.ufsUrl);

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
