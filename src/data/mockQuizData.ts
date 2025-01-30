import type { Quiz } from "../types/quiz"

export const mockQuizData: Quiz = {
  id: 1,
  title: "History Timeline Quiz",
  description: "Test your knowledge of historical events and their chronological order",
  duration: 600,
  questions: [
    {
      id: 1,
      description: "Which event occurred first?",
      options: [
        {
          id: 1,
          description: "The French Revolution (1789)",
          is_correct: true
        },
        {
          id: 2,
          description: "The American Civil War (1861)",
          is_correct: false
        },
        {
          id: 3,
          description: "World War I (1914)",
          is_correct: false
        }
      ],
      detailed_solution: "The French Revolution began in 1789, preceding both the American Civil War (1861-1865) and World War I (1914-1918)."
    },
    {
      id: 2,
      description: "Order these technological inventions chronologically:",
      options: [
        {
          id: 1,
          description: "Telegraph (1844) → Telephone (1876) → Radio (1895)",
          is_correct: true
        },
        {
          id: 2,
          description: "Telephone (1876) → Telegraph (1844) → Radio (1895)",
          is_correct: false
        },
        {
          id: 3,
          description: "Radio (1895) → Telegraph (1844) → Telephone (1876)",
          is_correct: false
        }
      ],
      detailed_solution: "The correct chronological order is: Telegraph (patented by Morse in 1844), Telephone (patented by Bell in 1876), and Radio (demonstrated by Marconi in 1895)."
    }
  ]
}
