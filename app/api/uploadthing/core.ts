import { dbConnect } from '@/lib/db';
import Resume from '@/models/Resume';
import { createUploadthing, type FileRouter } from 'uploadthing/next';
import { UploadThingError } from 'uploadthing/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { extractText, getDocumentProxy } from 'unpdf';

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

      await dbConnect();
      console.log('Db connected');

      // download pdf from uploadthing
      const response = await fetch(file.ufsUrl);
      const arrayBuffer = await response.arrayBuffer();

      // load pdf
      const document = await getDocumentProxy(new Uint8Array(arrayBuffer));

      // convert pdf to text
      const { text } = await extractText(document, {
        mergePages: true,
      });
      const resumeText = text.replace(/\s+/g, ' ').trim();
      console.log(resumeText);

      const existingResume = await Resume.countDocuments({
        userId: metadata.userId,
      });

      await Resume.create({
        userId: metadata.userId,

        title: file.name.replace('.pdf', ''),

        fileName: file.name,

        fileUrl: file.ufsUrl,

        fileKey: file.key,

        fileSize: file.size,

        pageCount: document.numPages,

        resumeText,

        isDefault: existingResume === 0,
      });

      console.log('Upload complete for userId:', metadata.userId);

      console.log('file url', file.ufsUrl);

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
