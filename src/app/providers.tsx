"use client"

import type React from "react"
import { QuizProvider } from "@/context/QuizContext"

export function Providers({ children }: { children: React.ReactNode }) {
  return <QuizProvider>{children}</QuizProvider>
}
