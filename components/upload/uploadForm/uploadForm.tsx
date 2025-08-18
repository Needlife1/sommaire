'use client';

import { useUploadThing } from '@/utils/uploadthing';
import UploadFormInput from '../uploadFormInput';
import { fileUploadSchema } from './uploadFormSchema';
import { toast } from 'sonner';
import {
  generatePdfSummary,
  generatePdfText,
  storePdfSummaryAction,
} from '@/actions/uploadActions';
import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import LoadingSkeleton from '../loadingSkeleton';
import { formatFileNameAsTitle } from '@/utils/formatUtils';

export default function UploadForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const { startUpload } = useUploadThing('pdfUploader', {
    onClientUploadComplete: () => {
      console.log('uploaded successfully!');
    },
    onUploadError: (err) => {
      console.error('error occurred while uploading', err);
      toast.error('Upload Error', {
        description: err.message,
        duration: 2000,
        position: 'top-center',
      });
    },
    onUploadBegin: (data) => {
      console.log('upload has begun for', data);
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      const formData = new FormData(e.currentTarget);
      const file = formData.get('file') as File;

      const validatedFields = fileUploadSchema.safeParse({ file });

      if (!validatedFields.success) {
        toast.error('❌ Something went wrong', {
          description:
            validatedFields.error.flatten().fieldErrors.file?.[0] ??
            'Invalid file',

          duration: 2000,
          position: 'top-center',
        });
        setIsLoading(false);
        return;
      }

      toast('📃 Uploading PDF...', {
        description: 'We are uploading your PDF file. Please wait a moment.',
        duration: 2000,
        position: 'top-center',
      });

      const uploadResponse = await startUpload([file]);

      if (!uploadResponse) {
        toast.error('Something went wrong', {
          description: 'Please use a different file',
          duration: 2000,
          position: 'top-center',
        });
        setIsLoading(false);
        return;
      }

      toast('📃 Processing PDF', {
        description: 'Hang tight! Our AI is reading through your document! ✨',
        duration: 2000,
        position: 'top-center',
      });

      const uploadFileUrl = uploadResponse[0].serverData.fileUrl;

      let storeResult: any;
      toast('📃 Saving PDF...', {
        description: 'Hang tight! We are saving your summary! ✨',
        duration: 2000,
        position: 'top-center',
      });

      const formattedFileName = formatFileNameAsTitle(file.name);

      const result = await generatePdfText({
        fileUrl: uploadFileUrl,
      });

      toast('📃 Generate PDF Summary', {
        description: 'Hang tight! Our AI is reading through your document! ✨',
        duration: 2000,
        position: 'top-center',
      });

      const summaryResult = await generatePdfSummary({
        pdfText: result?.data?.pdfText ?? '',
        fileName: formattedFileName,
      });

      toast('📃 Saving PDF Summary', {
        description: 'Hang tight! Our AI is saving your summary! ✨',
        duration: 2000,
        position: 'top-center',
      });

      const { data = null } = summaryResult || {};

      // const { data = null, message = null } = summaryResult || {};

      if (data?.summary) {
        storeResult = await storePdfSummaryAction({
          summary: data.summary,
          fileUrl: uploadFileUrl,
          title: formattedFileName,
          fileName: file.name,
        });

        toast('✨ Summary Generated', {
          description: 'Your summary has been saved! ✨',
          duration: 2000,
          position: 'top-center',
        });

        formRef.current?.reset();
        router.push(`summaries/${storeResult.data.id}`);
      }
    } catch (error) {
      setIsLoading(false);
      console.error('Error occurred', error);
      formRef.current?.reset();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
      <UploadFormInput
        isLoading={isLoading}
        ref={formRef}
        onSubmit={handleSubmit}
      />
      {isLoading && <LoadingSkeleton />}
    </div>
  );
}
