'use client';

import React from 'react';
import { useQuiz } from '@/context/QuizContext';
import { Option } from '@/types/quiz';

const Achievement = ({ title, value, icon }: { title: string; value: string | number; icon: string }) => (
  <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
    <div className="text-2xl mr-3">{icon}</div>
    <div>
      <div className="text-white/60 text-sm">{title}</div>
      <div className="text-white font-bold">{value}</div>
    </div>
  </div>
);

export default function Quiz() {
  const { 
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
  } = useQuiz();

  if (!quiz) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  // Start Screen
  if (!isQuizStarted && !isQuizComplete) {
    return (
      <div className="max-w-2xl mx-auto p-4">
        <div className="bg-white/10 backdrop-blur-sm rounded-lg shadow-xl border border-white/20 p-8 text-center text-white">
          <h1 className="text-4xl font-bold mb-4">{quiz.title}</h1>
          <div className="mb-8">
            <p className="text-xl mb-6">Challenge yourself!</p>
            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto mb-8">
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                <div className="text-3xl mb-2">🎯</div>
                <div className="text-sm">{quiz.questions.length} Questions</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                <div className="text-3xl mb-2">⭐</div>
                <div className="text-sm">Earn Streaks</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                <div className="text-3xl mb-2">⚡</div>
                <div className="text-sm">Quick Feedback</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                <div className="text-3xl mb-2">📊</div>
                <div className="text-sm">Track Progress</div>
              </div>
            </div>
          </div>
          <button
            onClick={startQuiz}
            className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-lg border border-white/20 hover:bg-white/20 transition-colors text-lg font-semibold shadow-lg transform hover:scale-105 transition-transform duration-200"
          >
            Start Challenge
          </button>
        </div>
      </div>
    );
  }

  // Results Screen
  if (isQuizComplete) {
    const percentage = Math.round((score / quiz.questions.length) * 100);
    const averageTime = Math.round(timePerQuestion / quiz.questions.length / 1000);
    
    return (
      <div className="max-w-2xl mx-auto p-4">
        <div className="bg-white/10 backdrop-blur-sm rounded-lg shadow-xl border border-white/20 p-8 text-white">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Challenge Complete! 🎉</h2>
            <div className="text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500 mb-4">
              {percentage}%
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <Achievement title="Final Score" value={`${score}/${quiz.questions.length}`} icon="🎯" />
            <Achievement title="Best Streak" value={bestStreak} icon="🔥" />
            <Achievement title="Average Time" value={`${averageTime}s`} icon="⚡" />
            <Achievement title="Questions" value={quiz.questions.length} icon="📝" />
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Performance Review:</h3>
            <div className="space-y-4">
              {quiz.questions.map((question, index) => {
                const answer = userAnswers[index];
                const isCorrect = answer?.isCorrect;
                const timeSpent = Math.round(answer?.timeSpent / 1000);
                
                return (
                  <div key={index} className={`p-4 rounded-lg border ${
                    isCorrect 
                      ? 'border-green-500/50 bg-green-500/10' 
                      : 'border-pink-500/50 bg-pink-500/10'
                  }`}>
                    <div className="flex justify-between items-start mb-2">
                      <p className="font-medium flex-1">
                        {question.description}
                      </p>
                      <span className="text-sm text-white/60 ml-4">{timeSpent}s</span>
                    </div>
                    <p className="text-sm text-white/80">
                      Your answer: {question.options.find(opt => opt.id === answer?.selectedId)?.text}
                    </p>
                    {!isCorrect && (
                      <p className="text-sm text-green-400 mt-1">
                        Correct: {question.options.find(opt => opt.isCorrect)?.text}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <button
            onClick={restartQuiz}
            className="w-full p-4 bg-gradient-to-r from-pink-500 to-violet-500 text-white rounded-lg hover:from-pink-600 hover:to-violet-600 transition-all text-lg font-semibold transform hover:scale-105"
          >
            Try to Beat Your Score!
          </button>
        </div>
      </div>
    );
  }

  // Quiz Questions Screen
  const currentQuestion = quiz.questions[currentQuestionIndex];

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="bg-white/10 backdrop-blur-sm rounded-lg shadow-xl border border-white/20 p-6 text-white">
        {/* Stats Bar */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center p-2 rounded-lg bg-white/5 border border-white/10">
            <div className="text-sm text-white/60">Question</div>
            <div className="font-bold">{currentQuestionIndex + 1}/{quiz.questions.length}</div>
          </div>
          <div className="text-center p-2 rounded-lg bg-white/5 border border-white/10">
            <div className="text-sm text-white/60">Score</div>
            <div className="font-bold">{score}</div>
          </div>
          <div className="text-center p-2 rounded-lg bg-white/5 border border-white/10">
            <div className="text-sm text-white/60">Streak</div>
            <div className="font-bold">🔥 {streak}</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-white/5 rounded-full h-2 mb-6">
          <div 
            className="bg-gradient-to-r from-pink-500 to-violet-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestionIndex + 1) / quiz.questions.length) * 100}%` }}
          ></div>
        </div>

        {/* Question */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-6">{currentQuestion.description}</h2>
          
          <div className="space-y-3">
            {currentQuestion.options.map((option: Option) => {
              const isSelected = selectedOption === option.id;
              let buttonClass = `
                w-full p-4 text-left rounded-lg border transition-all duration-200
                ${selectedOption === null ? 'hover:bg-white/10 hover:border-white/40' : ''}
                ${selectedOption === null ? 'cursor-pointer' : 'cursor-default'}
              `;

              if (selectedOption !== null) {
                if (option.isCorrect) {
                  buttonClass += ' border-green-500 bg-green-500/10 text-green-400';
                } else if (isSelected) {
                  buttonClass += ' border-pink-500 bg-pink-500/10 text-pink-400';
                } else {
                  buttonClass += ' border-white/20 bg-white/5';
                }
              } else {
                buttonClass += ' border-white/20 bg-white/5';
              }

              return (
                <button
                  key={option.id}
                  onClick={() => selectOption(option.id)}
                  className={buttonClass}
                  disabled={selectedOption !== null}
                >
                  {option.text}
                </button>
              );
            })}
          </div>
        </div>

        {/* Feedback and Next Button */}
        {selectedOption !== null && (
          <div className="space-y-4">
            <div className="p-4 bg-white/5 backdrop-blur-sm rounded-lg border border-white/20">
              <h3 className="font-bold mb-2">
                {currentQuestion.options.find(opt => opt.id === selectedOption)?.isCorrect 
                  ? '🎉 Correct! Keep going!' 
                  : '💡 Good try! Learn from this:'}
              </h3>
              <p className="text-white/80">{currentQuestion.explanation}</p>
            </div>

            <button
              onClick={nextQuestion}
              className="w-full p-4 bg-gradient-to-r from-pink-500 to-violet-500 text-white rounded-lg hover:from-pink-600 hover:to-violet-600 transition-all transform hover:scale-105"
            >
              {currentQuestionIndex === quiz.questions.length - 1 
                ? 'See Your Results 🏆' 
                : 'Next Question →'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
