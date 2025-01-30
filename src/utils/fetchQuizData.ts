import type { Quiz } from "../types/quiz"

export async function fetchQuizData(): Promise<Quiz> {
  try {
    const response = await fetch("/api/quiz")

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const quiz: Quiz = await response.json()
    return quiz
  } catch (error) {
    console.error("Error fetching quiz data:", error)
    throw error
  }
}
