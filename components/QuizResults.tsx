
import React from 'react';
import { QuizAttempt, UserAnswer, QuizQuestion, QuestionType } from '../types';

interface QuizResultsProps {
  quizAttempt: QuizAttempt;
  onRetry: () => void;
  onBackToChapters: () => void;
}

const QuizResults: React.FC<QuizResultsProps> = ({ quizAttempt, onRetry, onBackToChapters }) => {
  const { score, totalQuestions, answers, questions } = quizAttempt;
  // Adjust total questions for scoring if drawn answers are not auto-scored for correctness
  const scorableQuestions = questions.filter(q => !(q.answerFormat === 'draw-tamil' && answers.find(a => a.questionId === q.id)?.isDrawn)).length;
  const percentage = scorableQuestions > 0 ? Math.round((score / scorableQuestions) * 100) : 0;


  let feedbackMessage = "";
  let feedbackEmoji = "🎉";
  let feedbackColor = "text-brand-success";

  const drawnAnswersCount = answers.filter(a => a.isDrawn).length;

  if (scorableQuestions === 0 && drawnAnswersCount > 0) { // All questions were drawing practice
    feedbackMessage = "Great drawing practice session!";
    feedbackEmoji = "🎨👍";
    feedbackColor = "text-brand-primary";
  } else if (percentage === 100) {
    feedbackMessage = "Woohoo! Perfect Score!";
    feedbackEmoji = "🥳🏆";
    feedbackColor = "text-brand-success";
  } else if (percentage >= 75) {
    feedbackMessage = "Awesome job! You're a star!";
    feedbackEmoji = "🌟👍";
    feedbackColor = "text-brand-success";
  } else if (percentage >= 50) {
    feedbackMessage = "Good try! Keep it up!";
    feedbackEmoji = "😊💪";
    feedbackColor = "text-brand-secondary-dark";
  } else {
    feedbackMessage = "Practice makes perfect! Try again!";
    feedbackEmoji = "📚🤓";
    feedbackColor = "text-brand-error";
  }


  const getQuestionText = (questionId: string): string => {
    const question = questions.find(q => q.id === questionId);
    return question ? question.questionText : "Question not found";
  };
  
  const getCorrectAnswerForQuestion = (questionId: string): string => {
    const question = questions.find(q => q.id === questionId);
    if (!question) return "N/A";
    if (question.type === QuestionType.MCQ && question.options && question.correctAnswer) {
      return question.options.find(opt => opt.id === question.correctAnswer)?.text || "N/A";
    }
    return question.correctAnswer || "N/A";
  };
  
  // This function now primarily handles text-based answers for display.
  // Drawn image display is handled directly in JSX.
  const getUserAnswerText = (userAnswerP: UserAnswer): string => {
    const question = questions.find(q => q.id === userAnswerP.questionId);
    const actualAnswerValue = userAnswerP.answer;

    // If it's a drawn answer, the specific text comes from the placeholder or is handled by image display in JSX
    if (userAnswerP.isDrawn) {
        return `(Drawn Answer - see image)`;
    }

    if (typeof actualAnswerValue === 'string' && actualAnswerValue.trim() === "") {
        return "Not Answered";
    }
    if (actualAnswerValue === undefined || actualAnswerValue === null) {
        return "Not Answered";
    }
    if (Array.isArray(actualAnswerValue)) { // For potential multi-select MCQs in future
        if (actualAnswerValue.length === 0 || actualAnswerValue.every(s => typeof s === 'string' && s.trim() === "")) return "Not Answered";
    }

    if (question && question.type === QuestionType.MCQ && question.options) {
        if (Array.isArray(actualAnswerValue)) {
            const textAnswers = actualAnswerValue
                .filter(id => typeof id === 'string' && id.trim() !== "") 
                .map(ansId => {
                    const opt = question.options!.find(o => o.id === ansId);
                    return opt ? opt.text : ansId; 
                });
            return textAnswers.length > 0 ? textAnswers.join(', ') : "Not Answered";
        } else { 
            const opt = question.options.find(o => o.id === actualAnswerValue);
            return opt ? opt.text : String(actualAnswerValue); 
        }
    }

    if (Array.isArray(actualAnswerValue)) {
        const stringParts = actualAnswerValue
            .filter(part => typeof part === 'string' && part.trim() !== "")
            .join(', ');
        return stringParts.length > 0 ? stringParts : "Not Answered";
    }
    
    return String(actualAnswerValue); // For text-based FIB
  };


  return (
    <div className="container mx-auto p-4 sm:p-6 flex flex-col items-center">
      <div className="bg-brand-surface p-6 sm:p-8 rounded-3xl shadow-xl w-full max-w-2xl text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-brand-primary-dark mb-4">Quiz Results!</h2>
        
        {scorableQuestions > 0 && (
            <div className="my-6">
            <span className="text-6xl sm:text-7xl font-bold text-brand-accent animate-pulse">{score}</span>
            <span className="text-4xl sm:text-5xl text-brand-text-secondary"> / {scorableQuestions}</span>
            <p className={`text-3xl font-semibold ${feedbackColor} mb-2`}>({percentage}%)</p>
            </div>
        )}
        <p className={`text-xl ${feedbackColor} mb-8`}>{feedbackMessage} {feedbackEmoji}</p>

        <div className="my-6">
          <h3 className="text-2xl font-semibold text-brand-text-primary mb-4">Review Your Answers:</h3>
          <ul className="text-left space-y-3 max-h-80 sm:max-h-96 overflow-y-auto pr-2 custom-scrollbar">
            {answers.map((userAnswerItem, index) => {
              const question = questions.find(q => q.id === userAnswerItem.questionId);
              let itemFeedbackClass = '';
              if (userAnswerItem.isDrawn) {
                  itemFeedbackClass = 'bg-blue-50 border-blue-400'; 
              } else {
                  itemFeedbackClass = userAnswerItem.isCorrect ? 'bg-brand-success-light border-brand-success' : 'bg-brand-error-light border-brand-error';
              }

              return (
              <li key={userAnswerItem.questionId} 
                  className={`p-3 rounded-xl border-l-4 ${itemFeedbackClass}`}>
                <p className="font-semibold text-brand-text-primary text-sm sm:text-base">Q{index + 1}: {getQuestionText(userAnswerItem.questionId)}</p>
                <div className={`text-xs sm:text-sm ${userAnswerItem.isCorrect && !userAnswerItem.isDrawn ? 'text-green-700' : (userAnswerItem.isDrawn ? 'text-blue-700' : 'text-red-700')}`}>
                  Your input: 
                  {userAnswerItem.isDrawn && userAnswerItem.drawnImage ? (
                    <img src={userAnswerItem.drawnImage} alt="Your drawing" className="inline-block h-8 border border-slate-300 rounded mx-1 my-1 align-middle object-contain bg-white shadow-sm" />
                  ) : (
                    <span className="font-medium">{getUserAnswerText(userAnswerItem)}</span>
                  )}
                </div>
                {/* For drawn answers, always show the correct word for comparison. */}
                {/* For non-drawn incorrect answers, also show the correct word. */}
                { (userAnswerItem.isDrawn || (!userAnswerItem.isCorrect && !userAnswerItem.isDrawn) ) && (
                  <p className="text-xs sm:text-sm text-brand-text-secondary">Correct word: <span className="font-medium text-green-600 font-tamil" lang="ta">{getCorrectAnswerForQuestion(userAnswerItem.questionId)}</span></p>
                )}
              </li>
              );
            })}
          </ul>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={onRetry}
            className="px-6 py-3 bg-brand-primary text-white font-semibold rounded-xl shadow-md hover:bg-brand-primary-dark transition-colors focus:outline-none focus:ring-4 focus:ring-brand-primary focus:ring-opacity-50 transform hover:scale-105"
          >
            Retry Quiz 🔁
          </button>
          <button
            onClick={onBackToChapters}
            className="px-6 py-3 bg-brand-text-secondary text-white font-semibold rounded-xl shadow-md hover:bg-brand-text-primary transition-colors focus:outline-none focus:ring-4 focus:ring-gray-400 focus:ring-opacity-50 transform hover:scale-105"
          >
            Back to Chapters 🏡
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizResults;

// Add a simple custom scrollbar style if needed (optional)
const style = document.createElement('style');
style.innerHTML = `
  .custom-scrollbar::-webkit-scrollbar {
    width: 8px;
  }
  .custom-scrollbar::-webkit-scrollbar-track {
    background: #f1f1f1; 
    border-radius: 10px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: #FFD54F; /* brand-secondary */
    border-radius: 10px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: #FFB300; /* brand-secondary-dark */
  }
`;
document.head.appendChild(style);