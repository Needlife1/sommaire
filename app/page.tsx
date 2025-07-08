import BgGradient from '@/components/common/bgGradient';
import CTASection from '@/components/home/ctaSection';
import DemoSection from '@/components/home/demoSection';
import HeroSection from '@/components/home/heroSection';
import HowItWorksSection from '@/components/home/howItWorksSection';
import PricingSection from '@/components/home/pricingSection';

export default function Home() {
  return (
    <div className="relative w-full">
      <BgGradient />
      <div className="flex flex-col">
        <HeroSection />
        <DemoSection />
        <HowItWorksSection />
        <PricingSection />
        <CTASection />
      </div>
    </div>
  );
}
