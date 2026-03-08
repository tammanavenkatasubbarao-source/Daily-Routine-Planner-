import { useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, Loader2 } from "lucide-react";
import { UserInput } from "../services/ai";

interface PlannerFormProps {
  onSubmit: (data: UserInput) => void;
  isGenerating: boolean;
}

export function PlannerForm({ onSubmit, isGenerating }: PlannerFormProps) {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<UserInput>({
    name: "",
    mainGoal: "",
    currentRoutine: "",
    struggles: "",
    availableTime: "",
  });

  const handleChange = (field: keyof UserInput, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      onSubmit(formData);
    }
  };

  const questions = [
    {
      field: "name",
      label: "First things first, what should we call you?",
      placeholder: "e.g. Alex",
      type: "text"
    },
    {
      field: "mainGoal",
      label: "What is your #1 focus right now?",
      placeholder: "e.g. Launching my business, Getting fit, Learning to code...",
      type: "textarea"
    },
    {
      field: "struggles",
      label: "What usually gets in your way?",
      placeholder: "e.g. Procrastination, lack of energy, distractions...",
      type: "textarea"
    },
    {
      field: "currentRoutine",
      label: "Describe your current average day.",
      placeholder: "e.g. Wake up at 8, rush to work, tired by evening...",
      type: "textarea"
    },
    {
      field: "availableTime",
      label: "How much time can you dedicate to this goal daily?",
      placeholder: "e.g. 1 hour in the morning, 30 mins at lunch...",
      type: "text"
    }
  ];

  const currentQ = questions[step];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-stone-50">
      <div className="w-full max-w-2xl">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.4 }}
          className="bg-white p-8 md:p-12 rounded-3xl shadow-xl shadow-stone-200/50 border border-stone-100"
        >
          <div className="mb-8 flex items-center gap-2 text-sm font-medium text-stone-400">
            <span>Step {step + 1} of {questions.length}</span>
            <div className="h-1 flex-1 bg-stone-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-orange-500 transition-all duration-500"
                style={{ width: `${((step + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>

          <h2 className="text-3xl font-bold text-stone-900 mb-6">{currentQ.label}</h2>

          {currentQ.type === "textarea" ? (
            <textarea
              value={formData[currentQ.field as keyof UserInput]}
              onChange={(e) => handleChange(currentQ.field as keyof UserInput, e.target.value)}
              placeholder={currentQ.placeholder}
              className="w-full p-4 text-lg bg-stone-50 border-2 border-stone-100 rounded-xl focus:border-stone-900 focus:ring-0 transition-colors min-h-[160px] resize-none placeholder:text-stone-300"
              autoFocus
            />
          ) : (
            <input
              type="text"
              value={formData[currentQ.field as keyof UserInput]}
              onChange={(e) => handleChange(currentQ.field as keyof UserInput, e.target.value)}
              placeholder={currentQ.placeholder}
              className="w-full p-4 text-lg bg-stone-50 border-2 border-stone-100 rounded-xl focus:border-stone-900 focus:ring-0 transition-colors placeholder:text-stone-300"
              autoFocus
              onKeyDown={(e) => e.key === "Enter" && handleNext()}
            />
          )}

          <div className="mt-8 flex justify-end">
            <button
              onClick={handleNext}
              disabled={!formData[currentQ.field as keyof UserInput] || isGenerating}
              className="flex items-center gap-2 px-8 py-4 bg-stone-900 text-white rounded-full font-medium hover:bg-stone-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" /> Generating Plan...
                </>
              ) : (
                <>
                  {step === questions.length - 1 ? "Create My Plan" : "Next"} 
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
