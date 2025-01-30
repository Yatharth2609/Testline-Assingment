"use client"

import { QuizProvider } from "@/context/QuizContext"
import QuizContainer from "./QuizContainer"

export default function QuizApp() {
  return (
    <QuizProvider>
      <QuizContainer />
    </QuizProvider>
  )
}

