import { FileText } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { formatFileName } from '@/lib/formatFileName';

interface SummaryCardProps {
  fileUrl: string;
  title: string | null;
  createdAt: string;
}

export default function SummaryHeader({
  fileUrl,
  title,
  createdAt,
}: SummaryCardProps) {
  return (
    <div className="flex items-start gap-2 sm:gap-4">
      <FileText className="w-6 h-6 sm:w-8 sm:h-8 text-rose-400 mt-1" />
      <div className="flex-1 min-w-0">
        <h3 className="text-base xl:text-lg font-semibold text-gray-900 truncate w-4/5">
          {title || formatFileName(fileUrl)}
        </h3>
        <p className="text-sm text-gray-500">
          {formatDistanceToNow(new Date(createdAt), {
            addSuffix: true,
          })}
        </p>
      </div>
    </div>
  );
}
