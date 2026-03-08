import { motion } from "motion/react";
import { LifePlan } from "../services/ai";
import { Sun, Moon, Briefcase, Zap, Quote, Download, RefreshCw } from "lucide-react";
import { ReactNode } from "react";

interface PlanDisplayProps {
  plan: LifePlan;
  onReset: () => void;
}

export function PlanDisplay({ plan, onReset }: PlanDisplayProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-stone-50 py-12 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6"
        >
          <div>
            <h2 className="text-4xl font-bold text-stone-900 mb-2">Your Personal Blueprint</h2>
            <p className="text-stone-500">Designed to maximize your potential.</p>
          </div>
          <div className="flex gap-3">
            <button onClick={onReset} className="flex items-center gap-2 px-4 py-2 rounded-full border border-stone-200 hover:bg-white transition-colors text-stone-600 text-sm font-medium">
              <RefreshCw className="w-4 h-4" /> New Plan
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-stone-900 text-white hover:bg-stone-800 transition-colors text-sm font-medium">
              <Download className="w-4 h-4" /> Save PDF
            </button>
          </div>
        </motion.div>

        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Mindset Card - Full Width */}
          <motion.div variants={item} className="md:col-span-2 bg-gradient-to-r from-stone-900 to-stone-800 rounded-3xl p-8 text-white relative overflow-hidden">
            <Quote className="absolute top-8 right-8 w-24 h-24 text-white/5 rotate-12" />
            <h3 className="text-sm font-medium text-orange-400 uppercase tracking-wider mb-4">Daily Mantra</h3>
            <p className="text-2xl md:text-3xl font-serif italic leading-relaxed max-w-3xl">
              "{plan.mindsetShift}"
            </p>
          </motion.div>

          {/* Morning Routine */}
          <RoutineCard 
            icon={<Sun className="w-6 h-6 text-orange-500" />}
            title={plan.morningRoutine.title}
            items={plan.morningRoutine.items}
            variants={item}
          />

          {/* Work Block */}
          <RoutineCard 
            icon={<Briefcase className="w-6 h-6 text-blue-500" />}
            title={plan.workBlock.title}
            items={plan.workBlock.items}
            variants={item}
          />

          {/* Evening Routine */}
          <RoutineCard 
            icon={<Moon className="w-6 h-6 text-indigo-500" />}
            title={plan.eveningRoutine.title}
            items={plan.eveningRoutine.items}
            variants={item}
          />

          {/* Habit Stack */}
          <RoutineCard 
            icon={<Zap className="w-6 h-6 text-yellow-500" />}
            title={plan.habitStack.title}
            items={plan.habitStack.items}
            variants={item}
          />

        </motion.div>
      </div>
    </div>
  );
}

function RoutineCard({ icon, title, items, variants }: { icon: ReactNode, title: string, items: string[], variants: any }) {
  return (
    <motion.div variants={variants} className="bg-white p-8 rounded-3xl border border-stone-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 rounded-2xl bg-stone-50 flex items-center justify-center">
          {icon}
        </div>
        <h3 className="text-xl font-bold text-stone-900">{title}</h3>
      </div>
      <ul className="space-y-4">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full border border-stone-200 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-xs font-medium text-stone-400">{i + 1}</span>
            </div>
            <span className="text-stone-600 leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
