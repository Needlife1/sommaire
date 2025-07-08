import { Steps } from "@/constants/steps";

export default function StepItem({ icon, label, description }: Steps) {
  return (
    <div className="relative p-6 rounded-2xl bg-white/5 backdrop-blur-xs border-2 border-white/10 hover:border-rose-100 transition-colors group w-full">
      <div className="flex flex-col gap-4 h-full">
        <div className="flex items-center justify-center h-24 w-24 mx-auto rounded-2xl bg-gradient-to-br from-rose-500/10 to-transparent group-hover:from-rose-500/20 transition-colors">
          <div className="text-rose-500">{icon}</div>
        </div>
        <div className="flex flex-col flex-1 gap-1 justify-between">
          <h4 className="text-center font-bold text-xl">{label}</h4>
          <p className="text-center text-gray-600 text-sm">{description}</p>
        </div>
      </div>
    </div>
  );
}
