"use client"

import { motion } from "framer-motion"

interface StartQuizProps {
  onStart: () => void
}

export default function StartQuiz({ onStart }: StartQuizProps) {
  return (
    <div className="p-8 text-white/60 text-center">
      <h2 className="text-3xl font-bold mb-4 ">Ready to Test Your Knowledge?</h2>
      <p className="text-lg mb-8">Challenge yourself with our exciting quiz and see how much you know!</p>
      <motion.button
        onClick={onStart}
        className="bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold py-3 px-6 rounded-full text-lg shadow-lg hover:shadow-xl transition duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Start Quiz
      </motion.button>
    </div>
  )
}

