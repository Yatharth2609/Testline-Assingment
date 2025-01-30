"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import StartQuiz from "./StartQuiz"
import Quiz from "./Quiz"
import QuizResults from "./QuizResults"
import { useQuiz } from "@/context/QuizContext"

export default function QuizContainer() {
  const [quizState, setQuizState] = useState<"start" | "quiz" | "results">("start")
  const { quiz, score } = useQuiz()

  if (!quiz || quiz.questions.length === 0) {
    return (
      <div className="w-full max-w-2xl mx-auto overflow-hidden p-8 text-center">
        <h2 className="text-2xl font-bold mb-4 text-white/60">Oops! Something went wrong.</h2>
        <p className="text-lg text-white/60 mb-4">We couldn't load the quiz questions. Please try again later.</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold py-3 px-6 rounded-full text-lg shadow-lg hover:shadow-xl transition duration-300"
        >
          Try Again
        </button>
      </div>
    )
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <AnimatePresence mode="wait">
        {quizState === "start" && (
          <motion.div
            key="start"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            <StartQuiz onStart={() => setQuizState("quiz")} />
          </motion.div>
        )}

        {quizState === "quiz" && (
          <motion.div
            key="quiz"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Quiz />
          </motion.div>
        )}

        {quizState === "results" && (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <QuizResults
              score={score}
              totalQuestions={quiz.questions.length}
              onRestart={() => setQuizState("start")}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
