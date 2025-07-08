import BgGradient from '@/components/common/bgGradient';
import { SignIn } from '@clerk/nextjs';

export default function Page() {
  return (
    <>
      <BgGradient className="from-rose-500 via-orange-400 to-orange-300 " />
  
      <section className="flex justify-center items-center lg:min-h-[40vh] relative">
        <div
          className="py-12 lg:py-24 max-w-5xl mx-auto 
          px-4 sm:px-6 lg:px-8 lg:pt-12"
        >
  
          <SignIn />
        </div>
      </section>
    </>

    
  );
}
