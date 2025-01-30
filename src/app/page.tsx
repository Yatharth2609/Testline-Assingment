'use client';

import { useEffect, useState } from "react";
import QuizContainer from "../components/QuizContainer";
import type { Quiz } from "@/types/quiz";

export default function Home() {
  const [quiz, setQuiz] = useState<Quiz | null>(null);

  useEffect(() => {
    async function fetchQuiz() {
      try {
        const response = await fetch('/api/quiz');
        const data = await response.json();
        setQuiz(data);
      } catch (error) {
        console.error('Failed to fetch quiz:', error);
        setQuiz(null);
      }
    }

    fetchQuiz();
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 py-8 flex justify-center items-center">
      <QuizContainer initialQuiz={quiz} />
    </main>
  );
}
