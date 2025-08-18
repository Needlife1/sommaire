import { cn } from "@/lib/utils";
import { ArrowRight, CheckIcon } from "lucide-react";
import Link from "next/link";
import { MotionDiv } from "./motionWrapper";
import { listVariants } from "@/constants/motion";

export type PriceType = {
    name: string;
    price: number;
    description: string;
    items: string[];
    id: string;
    paymentLink: string;
    priceId: string;
  };

export default function PricingCard({ name, price, description, items, id, paymentLink }: PriceType) {
    return (
      <MotionDiv
        variants={listVariants}
        whileHover={{scale: 1.02}}
        className="relative w-full max-w-lg hover:scale-105 transition-all duration-300">
        <div
          className={cn(
            'relative flex flex-col h-full gap-4 lg:gap-8 z-10 p-8 border-[1px] border-gray-500/20 rounded-2xl',
            id === 'pro' && 'border-rose-500 gap-5 border-2'
          )}
        >
          <MotionDiv
            variants={listVariants}
            className="flex justify-between items-center gap-4">
            <div>
              <p className="text-lg lg:text-xl font-bold capitalize">{name}</p>
              <p className="text-base-content/80 mt-2">{description}</p>
            </div>
          </MotionDiv>

          <div className="flex gap-2">
            <p className="text-5xl tracking-tight font-extrabold">${price}</p>
            <div className="flex flex-col justify-end mb-1">
              <p className="text-xs uppercase font-semibold">USD</p>
              <p className="text-xs">/month</p>
            </div>
          </div>

          <MotionDiv
            variants={listVariants}
            className="space-y-2.5 leading-relaxed text-base flex-1">
            {items.map((item, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <CheckIcon size={18} />
                <span>{item}</span>
              </li>
            ))}
          </MotionDiv>

          <MotionDiv
            variants={listVariants}
            className={cn("space-y-2 flex justify-center w-full")}>
            <Link
              href={paymentLink}
              className={cn(
                "w-full rounded-full flex items-center justify-center gap-2 bg-linear-to-r from-rose-800 to-rose-500 hover:from-rose-500 hover:to-rose-800 text-white border-2 py-2",
                id === 'pro' ? 'border-rose-900' : 'border-rose-100 from-rose-400 to-rose-500'
              )}
            >
              Buy Now <ArrowRight size={18}/>
            </Link>
          </MotionDiv>
        </div>
      </MotionDiv>
    );

}