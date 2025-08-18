import { Card } from '@/components/ui/card';
import Link from 'next/link';
import DeleteButton from './deleteButton';
import SummaryHeader from './summaryHeader';
import StatusBadge from './statusBadge';
import { MotionDiv } from '../common/motionWrapper';
import { itemVariants } from '@/constants/motion';

export default function SummaryCard({ summary }: { summary: any }) {
  return (
    <MotionDiv
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.2, ease: 'easeOut' },
      }}
    >
      <Card className="relative h-full">
        <div className="absolute top-2 right-2">
          <DeleteButton summaryId={summary.id} />
        </div>

        <Link href={`summaries/${summary.id}`} className="block p-4 sm:p-6">
          <div className="flex flex-col gap-3 sm:gap-4">
            <SummaryHeader
              fileUrl={summary.original_file_url}
              title={summary.title}
              createdAt={summary.created_at}
            />

            <p className="text-gray-600 line-clamp-2 text-sm sm:text-base pl-2">
              {summary.summary_text}
            </p>

            <div className="flex justify-between items-center mt-2 sm:mt-4">
              <StatusBadge status={summary.status} />
            </div>
          </div>
        </Link>
      </Card>
    </MotionDiv>
  );
}
