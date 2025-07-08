import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section
      className="flex flex-col relative mx-auto z-0
    items-center justify-center py-16 sm:py-20 lg:pb-28
    transition-all animate-in lg:px-12 max-w-7xl"
    >
      <div
        className="relative p-[1px] overflow-hidden rounded-full 
           bg-gradient-to-r from-rose-200 via-rose-500 to-rose-800 animate-gradient-x
          group"
      >
        <Badge
          variant={'secondary'}
          className="relative px-6 py-2 text-base
            font-medium bg-white rounded-full group-hover:bg-gray-50/50 transition-colors duration-200 group"
        >
          <Sparkles className="h-6 w-6 mr-2 text-rose-600 group-hover:text-rose-800" />
          <p className="text-base text-rose-600 group-hover:text-rose-800 ">
            Powered by AI
          </p>
        </Badge>
      </div>

      <h1 className="py-6 text-center">
        Transform PDFs into
        <span className="relative inline-block">
          <span className="relative z-10 px-2">concise</span>
          <span
            className="absolute inset-0 bg-rose-200/50 -rotate-2 rounded-lg transform -skew-y-1"
            aria-hidden="true"
          ></span>
        </span>
        summaries
      </h1>
      <h2 className="text-center px-4 lg:px-0 lg:max-w-4xl text-gray-600">
        Get default summaries reel of the document in seconds.
      </h2>
      <div>
        <Button
          variant={'link'}
          className="text-white mt-6 text-base
        sm:text-lg lg:text-xl rounded-full px-8 sm:px-10 lg:px-12 py-6 sm:py-7 lg:py-8 lg:mt-16
        bg-linear-to-r from-slate-900 to-rose-500
        hover:from-rose-500 hover:to-slate-900 font-bold hover:no-underline
        shadow-lg transition-all duration-400 ease-in-out"
        >
          <Link href={'/#pricing'} className="flex items-center gap-2">
            <span>Try Summaries</span>
            <ArrowRight className="animate-pluse" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
