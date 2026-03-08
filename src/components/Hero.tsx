import { motion } from "motion/react";
import { ArrowRight, CheckCircle, Sparkles } from "lucide-react";

interface HeroProps {
  onStart: () => void;
}

export function Hero({ onStart }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(120,113,108,0.1),transparent_50%)]" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-stone-200 rounded-full blur-3xl opacity-30 translate-x-1/2 translate-y-1/2" />
        <div className="absolute top-20 left-20 w-64 h-64 bg-orange-100 rounded-full blur-3xl opacity-40" />
      </div>

      <div className="max-w-4xl mx-auto text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-100 border border-stone-200 text-stone-600 text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4 text-orange-500" />
            <span>DailyRoutine Planner</span>
          </span>
          
          <h1 className="text-5xl md:text-7xl font-bold text-stone-900 tracking-tight mb-6 leading-[1.1]">
            Design a life you <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-stone-600">
              actually love.
            </span>
          </h1>
          
          <p className="text-xl text-stone-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Stop overwhelmed planning. Let our AI analyze your goals, habits, and schedule to build a perfectly tailored daily routine just for you.
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onStart}
            className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-stone-900 rounded-full overflow-hidden transition-all hover:bg-stone-800 hover:shadow-xl hover:shadow-stone-900/20"
          >
            <span className="relative z-10 flex items-center gap-2">
              Start Your Journey <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </motion.button>
        </motion.div>

        {/* Social Proof / Features */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-left"
        >
          {[
            { title: "Smart Analysis", desc: "Understands your unique constraints and energy levels." },
            { title: "Actionable Routines", desc: "Step-by-step daily protocols, not just vague goals." },
            { title: "Habit Stacking", desc: "Scientifically proven methods to make changes stick." }
          ].map((feature, i) => (
            <div key={i} className="flex flex-col gap-2 p-4 rounded-2xl hover:bg-white/50 transition-colors">
              <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center mb-2">
                <CheckCircle className="w-5 h-5 text-stone-600" />
              </div>
              <h3 className="font-semibold text-stone-900">{feature.title}</h3>
              <p className="text-sm text-stone-500">{feature.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
