import { MoveRight } from "lucide-react";
import StepItem from "../common/stepItem";
import { steps } from "@/constants/steps";
import { MotionDiv, MotionH2, MotionH3 } from "../common/motionWrapper";



export default function HowItWorksSection() {
    return (
      <section className="relative overflow-hidden bg-gray-50">
        <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 transform-gpu overflow-hidden blur-3xl"
          >
            <div
              className="
                relative left-[calc(40%-30rem)] aspect-[1155/678]
                w-[40.1875rem] -translate-x-1/2 bg-gradient-to-br
                from-emerald-500 via-teal-500 to-cyan-500 opacity-20
              "
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
            />
          </div>

          <div className="text-center mb-16">
            <MotionH2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="font-bold text-xl uppercase mb-4 text-rose-500"
            >
              How it works
            </MotionH2>
            <MotionH3
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="font-bold text-3xl max-w-2xl mx-auto"
            >
              Transform any PDF into an easy-to-digest summary in three simple
              steps
            </MotionH3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto relative">
            {steps.map((step, idx) => (
              <MotionDiv
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.2 }}
                key={idx}
                className="relative flex items-stretch"
              >
                <StepItem {...step} />

                {idx < steps.length - 1 && (
                  <MotionDiv
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: idx * 0.2 + 0.3 }}
                    className="hidden md:block absolute top-1/2 right-4 transform -translate-y-1/2 z-10"
                  >
                    <MoveRight
                      size={32}
                      strokeWidth={1}
                      className="text-rose-400"
                    />
                  </MotionDiv>
                )}
              </MotionDiv>
            ))}
          </div>
        </div>
      </section>
    );
}