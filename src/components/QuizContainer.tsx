"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import StartQuiz from "./StartQuiz"
import QuizComponent from "./Quiz"
import type { Quiz } from "@/types/quiz"

interface QuizContainerProps {
  initialQuiz: Quiz | null
}

export default function QuizContainer({ initialQuiz }: QuizContainerProps) {
  const [quizState, setQuizState] = useState<"start" | "quiz" | "results">("start")
  const [isStarted, setIsStarted] = useState(false)

  if (!initialQuiz || initialQuiz.questions.length === 0) {
    return (
      <div className="w-full max-w-2xl mx-auto overflow-hidden p-8 text-center">
        <h2 className="text-2xl font-bold mb-4 text-white/60">Oops! Something went wrong.</h2>
        <p className="text-lg text-white/60 mb-4">We couldn&apos;t load the quiz questions. Please try again later.</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold py-3 px-6 rounded-full text-lg shadow-lg hover:shadow-xl transition duration-300"
        >
          Try Again
        </button>
      </div>
    )
  }

  if (!isStarted) {
    return <StartQuiz onStart={() => setIsStarted(true)} />
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <AnimatePresence mode="wait">
        {quizState === "start" && (
          <motion.div
            key="start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <StartQuiz onStart={() => setQuizState("quiz")} />
          </motion.div>
        )}
        {quizState === "quiz" && (
          <motion.div
            key="quiz"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <QuizComponent />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
