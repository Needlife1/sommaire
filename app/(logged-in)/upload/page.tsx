import BgGradient from '@/components/common/bgGradient';
import { MotionDiv } from '@/components/common/motionWrapper';
import UploadForm from '@/components/upload/uploadForm/uploadForm';
import UploadHeader from '@/components/upload/uploadHeader';
import { containerVariants } from '@/constants/motion';
import { hasReachedUploadLimit } from '@/lib/user';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function Page() {
  const user = await currentUser();
  if (!user?.id) {
    redirect('/sign-in');
  }

  const { hasReachedLimit } = await hasReachedUploadLimit(user.id);
// проверитб с обычнгым лимитом 
if (!hasReachedLimit) {
    redirect('/dashboard');
  }

  return (
    <section className="min-h-screen relative overflow-hidden">
      <BgGradient />

      <MotionDiv
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="flex flex-col items-center justify-center gap-6 text-center">
          <UploadHeader />
          <UploadForm />
        </div>
      </MotionDiv>
    </section>
  );
}
