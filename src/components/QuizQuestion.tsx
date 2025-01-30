"use client"

import type { Question } from "../types/quiz"

interface QuizQuestionProps {
  question: Question
  onAnswer: (questionId: number, optionId: number) => void
  currentQuestion: number
  totalQuestions: number
  onComplete: () => void
}

export default function QuizQuestion({ question, onAnswer, currentQuestion, totalQuestions, onComplete }: QuizQuestionProps) {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg shadow-xl border border-white/20 p-6 text-white">
      <div className="mb-4 text-sm text-white/60">
        Question {currentQuestion} of {totalQuestions}
      </div>
      <h2 className="text-xl font-semibold mb-4">{question.description}</h2>
      <div className="space-y-2">
        {question.options.map((option) => (
          <button
            key={option.id}
            className="w-full text-left p-3 rounded border border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/40 transition-all"
            onClick={() => onAnswer(question.id, option.id)}
          >
            {option.text}
          </button>
        ))}
      </div>
    </div>
  )
}
