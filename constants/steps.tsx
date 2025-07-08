import { ReactNode } from 'react';
import { FileText, BrainCircuit, FileOutput } from 'lucide-react';

export type Steps = {
  icon: ReactNode;
  label: string;
  description: string;
};

export const steps: Steps[] = [
  {
    icon: <FileText size={64} strokeWidth={1.5} />,
    label: 'Upload your PDF',
    description: 'Simply drag and drop your PDF document or click to upload',
  },
  {
    icon: <BrainCircuit size={64} strokeWidth={1.5} />,
    label: 'AI Analysis',
    description:
      'Our advanced AI processes and analyzes your document instantly',
  },
  {
    icon: <FileOutput size={64} strokeWidth={1.5} />,
    label: 'Get Summary',
    description: 'Receive a clear, concise summary of your document',
  },
];
