'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Quiz } from '@/types/quiz';
import { fetchQuizData } from '@/utils/fetchQuizData';

interface QuizContextType {
  quiz: Quiz | null;
  currentQuestionIndex: number;
  selectedOption: number | null;
  score: number;
  isQuizStarted: boolean;
  isQuizComplete: boolean;
  userAnswers: Record<number, { selectedId: number; isCorrect: boolean; timeSpent: number }>;
  streak: number;
  bestStreak: number;
  timePerQuestion: number;
  startQuiz: () => void;
  selectOption: (optionId: number) => void;
  nextQuestion: () => void;
  restartQuiz: () => void;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const QuizProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [isQuizComplete, setIsQuizComplete] = useState(false);
  const [userAnswers, setUserAnswers] = useState<Record<number, { selectedId: number; isCorrect: boolean; timeSpent: number }>>({});
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [timePerQuestion, setTimePerQuestion] = useState(0);
  const [questionStartTime, setQuestionStartTime] = useState(0);

  const loadQuiz = async () => {
    try {
      const quizData = await fetchQuizData();
      setQuiz(quizData);
    } catch (error) {
      console.error('Error loading quiz:', error);
    }
  };

  useEffect(() => {
    loadQuiz();
  }, []);

  const startQuiz = () => {
    setIsQuizStarted(true);
    setCurrentQuestionIndex(0);
    setScore(0);
    setUserAnswers({});
    setStreak(0);
    setBestStreak(0);
    setTimePerQuestion(0);
    setQuestionStartTime(Date.now());
  };

  const selectOption = (optionId: number) => {
    if (!quiz || selectedOption !== null || isQuizComplete) return;

    const currentQuestion = quiz.questions[currentQuestionIndex];
    const selected = currentQuestion.options.find(opt => opt.id === optionId);
    const isCorrect = selected?.isCorrect || false;
    const timeSpent = Date.now() - questionStartTime;

    setSelectedOption(optionId);
    setUserAnswers(prev => ({
      ...prev,
      [currentQuestionIndex]: { selectedId: optionId, isCorrect, timeSpent }
    }));
    
    if (isCorrect) {
      setScore(prev => prev + 1);
      setStreak(prev => {
        const newStreak = prev + 1;
        setBestStreak(current => Math.max(current, newStreak));
        return newStreak;
      });
    } else {
      setStreak(0);
    }

    setTimePerQuestion(prev => prev + timeSpent);
  };

  const nextQuestion = () => {
    if (!quiz) return;

    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
      setQuestionStartTime(Date.now());
    } else {
      setIsQuizComplete(true);
    }
  };

  const restartQuiz = () => {
    setIsQuizStarted(false);
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setScore(0);
    setIsQuizComplete(false);
    setUserAnswers({});
    setStreak(0);
    setTimePerQuestion(0);
  };

  return (
    <QuizContext.Provider
      value={{
        quiz,
        currentQuestionIndex,
        selectedOption,
        score,
        isQuizStarted,
        isQuizComplete,
        userAnswers,
        streak,
        bestStreak,
        timePerQuestion,
        startQuiz,
        selectOption,
        nextQuestion,
        restartQuiz
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
};
