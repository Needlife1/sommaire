'use client';

import { useUploadThing } from '@/utils/uploadthing';
import UploadFormInput from '../uploadFormInput';
import { fileUploadSchema } from './uploadFormSchema';
import { toast } from 'sonner';
import { generatePdfSummary } from '@/actions/uploadActions';
import { useRef, useState } from 'react';

export default function UploadForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const { startUpload, routeConfig } = useUploadThing('pdfUploader', {
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
    onUploadBegin: ({ file }) => {
      console.log('upload has begun for', file);
    },
  });


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      
  const formData = new FormData(e.currentTarget);
  const file = formData.get('file') as File;

  const validatedFields = fileUploadSchema.safeParse({ file });
  console.log('validatedFields', validatedFields);

  if (!validatedFields.success) {
    toast.error('❌ Something went wrong', {
      description:
        validatedFields.error.flatten().fieldErrors.file?.[0] ?? 'Invalid file',

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

  const resp = await startUpload([file]);

  if (!resp) {
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

  const result = await generatePdfSummary(resp);

  const { data = null, message = null } = result || {};

  if (data) {
    toast('📃 Saving PDF...', {
      description: 'Hang tight! We are saving your summary! ✨',
      duration: 2000,
      position: 'top-center',
    });

    formRef.current?.reset();
    //   if(data.summary)
    // }
  }
    } catch (error) {
      setIsLoading(false);
  console.error('Error occurred', error);
  formRef.current?.reset();
}

  }

  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
      <UploadFormInput isLoading={isLoading} ref={formRef} onSubmit={handleSubmit} />
    </div>
  );
}