import { useState } from "react";
import { Hero } from "./components/Hero";
import { PlannerForm } from "./components/PlannerForm";
import { PlanDisplay } from "./components/PlanDisplay";
import { generateLifePlan, LifePlan, UserInput } from "./services/ai";
import { AnimatePresence, motion } from "motion/react";

export default function App() {
  const [view, setView] = useState<"hero" | "form" | "plan">("hero");
  const [plan, setPlan] = useState<LifePlan | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleStart = () => {
    setView("form");
  };

  const handleFormSubmit = async (data: UserInput) => {
    setIsGenerating(true);
    try {
      const generatedPlan = await generateLifePlan(data);
      setPlan(generatedPlan);
      setView("plan");
    } catch (error) {
      console.error("Failed to generate plan", error);
      alert("Something went wrong generating your plan. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleReset = () => {
    setPlan(null);
    setView("hero");
  };

  return (
    <div className="font-sans text-stone-900 bg-stone-50 min-h-screen">
      <AnimatePresence mode="wait">
        {view === "hero" && (
          <motion.div
            key="hero"
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <Hero onStart={handleStart} />
          </motion.div>
        )}

        {view === "form" && (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <PlannerForm onSubmit={handleFormSubmit} isGenerating={isGenerating} />
          </motion.div>
        )}

        {view === "plan" && plan && (
          <motion.div
            key="plan"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <PlanDisplay plan={plan} onReset={handleReset} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
