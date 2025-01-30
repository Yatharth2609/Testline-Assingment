import { NextResponse } from 'next/server'
import type { Quiz, Question, Option } from '@/types/quiz'

interface APIQuestion {
  id: number
  description: string
  options: APIOption[]
  detailed_solution: string
}

interface APIOption {
  id: number
  description: string
  is_correct: boolean
}

interface APIResponse {
  id: number
  title: string
  questions: APIQuestion[]
}

export async function GET() {
  try {
    const response = await fetch("https://api.jsonserve.com/Uw5CrX")
    const data: APIResponse = await response.json()

    const quiz: Quiz = {
      id: data.id,
      title: data.title,
      questions: data.questions.map((q: APIQuestion) => ({
        id: q.id,
        description: q.description,
        options: q.options.map((opt: APIOption) => ({
          id: opt.id,
          text: opt.description,
          isCorrect: opt.is_correct
        })),
        explanation: q.detailed_solution
      }))
    }

    return NextResponse.json(quiz)
  } catch (error) {
    console.error("Error fetching quiz data:", error)
    return NextResponse.json(
      { error: 'Failed to fetch quiz data' },
      { status: 500 }
    )
  }
}
