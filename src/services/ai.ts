import { GoogleGenAI } from "@google/genai";

// Initialize the client
// process.env.GEMINI_API_KEY is injected by the build system
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export interface UserInput {
  name: string;
  mainGoal: string;
  currentRoutine: string;
  struggles: string;
  availableTime: string;
}

export interface PlanSection {
  title: string;
  items: string[];
}

export interface LifePlan {
  morningRoutine: PlanSection;
  workBlock: PlanSection;
  eveningRoutine: PlanSection;
  habitStack: PlanSection;
  mindsetShift: string;
}

export async function generateLifePlan(input: UserInput): Promise<LifePlan> {
  const prompt = `
    You are an expert life coach and productivity strategist. Create a personalized daily routine and life plan for ${input.name}.
    
    User Context:
    - Main Goal: ${input.mainGoal}
    - Current Routine/Situation: ${input.currentRoutine}
    - Key Struggles: ${input.struggles}
    - Available Time: ${input.availableTime}

    Output a JSON object with the following structure (do not include markdown formatting, just raw JSON):
    {
      "morningRoutine": { "title": "Morning Protocol", "items": ["item 1", "item 2"] },
      "workBlock": { "title": "Deep Work Strategy", "items": ["item 1", "item 2"] },
      "eveningRoutine": { "title": "Evening Wind-down", "items": ["item 1", "item 2"] },
      "habitStack": { "title": "Key Habits to Build", "items": ["item 1", "item 2"] },
      "mindsetShift": "A short, powerful quote or mantra specific to their goal."
    }

    Keep items actionable, specific, and motivating. Tone should be encouraging but disciplined.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    return JSON.parse(text) as LifePlan;
  } catch (error) {
    console.error("Error generating plan:", error);
    throw error;
  }
}
