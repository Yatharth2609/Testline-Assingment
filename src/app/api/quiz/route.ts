import { NextResponse } from "next/server"
import { Quiz } from "@/types/quiz"

export async function GET() {
  try {
    const response = await fetch("https://api.jsonserve.com/Uw5CrX")
    const data = await response.json()

    // Transform the data to match our Quiz type
    const quiz: Quiz = {
      id: data.id,
      title: data.title,
      questions: data.questions.map((q: any) => ({
        id: q.id,
        description: q.description,
        options: q.options.map((opt: any) => ({
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
      { error: "Failed to fetch quiz data" },
      { status: 500 }
    )
  }
}
