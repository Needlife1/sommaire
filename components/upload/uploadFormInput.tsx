'use client';

import { Button } from "@/components/ui/button";
import { Input } from '@/components/ui/input';

interface UploadFormInputProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function UploadFormInput({ onSubmit }: UploadFormInputProps) {
  return (
    <form className="flex flex-col gap-6" onSubmit={onSubmit}>
          <div className="flex items-center justify-center gap-1">
              <Input type="file" id="file" name="file"
                  accept="application/pdf" required
              className=""/>
          <Button>Upload your PDF</Button>
          </div>
    </form>
  );
}