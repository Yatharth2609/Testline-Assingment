"use client"

interface QuizResultsProps {
  score: number
  totalQuestions: number
  onRestart: () => void
}

export default function QuizResults({ score, totalQuestions, onRestart }: QuizResultsProps) {
  const percentage = Math.round((score / totalQuestions) * 100)

  return (
    <div className="max-w-2xl mx-auto p-4 text-center text-white">
      <h2 className="text-2xl font-bold mb-4">Quiz Completed!</h2>
      <p className="text-xl mb-4">
        Your score: {score} out of {totalQuestions}
      </p>
      <div className="w-full bg-white/10 rounded-full h-2.5 mb-4">
        <div 
          className="bg-gradient-to-r from-purple-500 to-blue-500 h-2.5 rounded-full" 
          style={{ width: `${percentage}%` }}
        />
      </div>
      <p className="text-lg font-semibold mb-8">{percentage}% Correct</p>
      <button
        onClick={onRestart}
        className="bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold py-3 px-6 rounded-full text-lg shadow-lg hover:shadow-xl transition duration-300"
      >
        Try Again
      </button>
    </div>
  )
}