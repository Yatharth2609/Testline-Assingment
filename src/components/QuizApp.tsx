"use client"

import { useState, useEffect } from "react"
import { QuizProvider } from "@/context/QuizContext"
import QuizContainer from "./QuizContainer"
import type { Quiz } from "@/types/quiz"

export default function QuizApp() {
  const [quiz, setQuiz] = useState<Quiz | null>(null)

  useEffect(() => {
    async function fetchQuiz() {
      try {
        const response = await fetch('/api/quiz')
        const data = await response.json()
        setQuiz(data)
      } catch (error) {
        console.error('Failed to fetch quiz:', error)
        setQuiz(null)
      }
    }

    fetchQuiz()
  }, [])

  return (
    <QuizProvider>
      <QuizContainer initialQuiz={quiz} />
    </QuizProvider>
  )
}
