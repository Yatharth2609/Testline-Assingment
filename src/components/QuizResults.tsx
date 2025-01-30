"use client"

interface QuizResultsProps {
    score: number
    totalQuestions: number
    onRestart: () => void
  }
  
  export default function QuizResults({ score, totalQuestions, onRestart }: QuizResultsProps) {
    const percentage = Math.round((score / totalQuestions) * 100)
  
    return (
      <div className="max-w-2xl mx-auto p-4 text-center">
        <h2 className="text-2xl font-bold mb-4">Quiz Completed!</h2>
        <p className="text-xl mb-4">
          Your score: {score} out of {totalQuestions}
        </p>
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
          <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${percentage}%` }}></div>
        </div>
        <p className="text-lg font-semibold">{percentage}% Correct</p>
      </div>
    )
  }