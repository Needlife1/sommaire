import BgGradient from '@/components/common/bgGradient';
import { SignUp } from '@clerk/nextjs';

export default function Page() {
  return (
   <>
      <BgGradient className="from-rose-500 via-orange-400 to-orange-300 " />
      <section className="flex justify-center items-center lg:min-h-[40vh]">
        <BgGradient className="from-rose-400 via-rose-300 to-orange-200" />
        <div
          className="py-12 lg:py-24 max-w-5xl mx-auto 
          px-4 sm:px-6 lg:px-8 lg:pt-12"
        >
          <SignUp />
        </div>
      </section>
   </>
  );
}
