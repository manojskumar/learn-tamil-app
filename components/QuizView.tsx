import React, { useState, useEffect, useCallback } from 'react';
import { QuizQuestion, UserAnswer, QuestionType, MCQOption, QuizAttempt } from '../types';
import SpeakerIcon from './icons/SpeakerIcon';
import DrawingModal from './DrawingModal'; 

// Individual Question Type Components
const MCQQuestionDisplay: React.FC<{ question: QuizQuestion; onAnswer: (answer: string) => void; userAnswer: string | undefined }> = ({ question, onAnswer, userAnswer }) => {
  if (!question.options) return <p>Error: MCQ options missing.</p>;
  return (
    <div>
      <h4 className="text-lg sm:text-xl font-semibold text-brand-text-primary mb-3 sm:mb-4">{question.questionText}</h4>
      {question.tamilWord && (
         <p className="text-3xl sm:text-4xl font-tamil text-brand-primary my-2 sm:my-3" lang="ta">{question.tamilWord}</p>
      )}
      {question.transliteration && (
         <p className="text-base sm:text-lg text-brand-text-secondary my-1 sm:my-2">({question.transliteration})</p>
      )}
      <div className="space-y-2 sm:space-y-3">
        {question.options.map((option) => (
          <button
            key={option.id}
            onClick={() => onAnswer(option.id)}
            className={`
              block w-full text-left p-3 sm:p-4 rounded-xl border-2 transition-all duration-150 ease-in-out text-sm sm:text-base
              ${userAnswer === option.id 
                ? 'bg-brand-secondary border-brand-secondary-dark text-brand-text-primary font-semibold ring-2 ring-brand-secondary-dark ring-offset-2 shadow-md' 
                : 'bg-brand-surface border-slate-300 text-brand-text-primary hover:bg-yellow-50 hover:border-brand-secondary focus:border-brand-secondary'
              }
            `}
            aria-pressed={userAnswer === option.id}
          >
            {option.text}
          </button>
        ))}
      </div>
    </div>
  );
};

const FillInBlankQuestionDisplay: React.FC<{ 
    question: QuizQuestion; 
    onAnswer: (answer: string, isDrawn?: boolean, drawnImage?: string) => void; 
    userAnswer: string | undefined;
    drawnImage?: string; 
    openDrawingModal: () => void; 
}> = ({ question, onAnswer, userAnswer, drawnImage, openDrawingModal }) => {
  const [inputValue, setInputValue] = useState(userAnswer || '');

  useEffect(() => {
    setInputValue(userAnswer || '');
  }, [userAnswer]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  
  const handleBlur = () => {
    onAnswer(inputValue.trim(), false); 
  };

  if (question.answerFormat === 'draw-tamil') {
    return (
      <div>
        <h4 className="text-lg sm:text-xl font-semibold text-brand-text-primary mb-3 sm:mb-4">{question.questionText}</h4>
        {question.blankSegments && (
          <p className="text-base sm:text-lg text-brand-text-primary my-2 flex items-center flex-wrap leading-loose">
            {question.blankSegments[0]}&nbsp;
            {drawnImage ? (
              <img src={drawnImage} alt="Your drawing" className="inline-block h-8 sm:h-10 border border-brand-secondary rounded bg-white mx-1 align-middle object-contain shadow-sm" />
            ) : (
              <span className="inline-block w-20 sm:w-24 h-6 sm:h-8 border-b-2 border-brand-text-secondary align-middle mx-1"></span>
            )}
            &nbsp;{question.blankSegments[1]}
          </p>
        )}
         {!question.blankSegments && <div className="h-8 sm:h-10"></div>}
        {!drawnImage && (
            <button
            onClick={openDrawingModal}
            className="mt-2 sm:mt-3 px-4 py-2 sm:px-5 sm:py-2.5 bg-brand-teal text-white font-semibold rounded-lg hover:bg-brand-teal-light hover:text-brand-teal transition-colors focus:outline-none focus:ring-2 focus:ring-brand-teal focus:ring-opacity-50 shadow-md flex items-center justify-center text-sm sm:text-base"
            >
            Draw Answer ✍️
            </button>
        )}
      </div>
    );
  }

  return (
    <div>
      <h4 className="text-lg sm:text-xl font-semibold text-brand-text-primary mb-3 sm:mb-4">{question.questionText}</h4>
       {question.tamilWord && (
         <p className="text-3xl sm:text-4xl font-tamil text-brand-teal my-2 sm:my-3" lang="ta">{question.tamilWord}</p>
      )}
      <div className="flex items-center space-x-2">
        {question.blankSegments && <span className="text-base sm:text-lg text-brand-text-primary">{question.blankSegments[0]}</span>}
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          onBlur={handleBlur} 
          className="p-2 sm:p-3 border border-slate-400 rounded-lg shadow-sm focus:ring-brand-accent focus:border-brand-accent flex-grow bg-white text-brand-text-primary text-sm sm:text-base"
          aria-label="Your answer for the blank"
        />
        {question.blankSegments && question.blankSegments[1] && <span className="text-base sm:text-lg text-brand-text-primary">{question.blankSegments[1]}</span>}
      </div>
       {!question.blankSegments && ( 
            <input
            type="text"
            value={inputValue}
            onChange={handleChange}
            onBlur={handleBlur}
            className="mt-2 p-2 sm:p-3 border border-slate-400 rounded-lg shadow-sm focus:ring-brand-accent focus:border-brand-accent w-full bg-white text-brand-text-primary text-sm sm:text-base"
            aria-label="Your answer"
            />
        )}
    </div>
  );
};


interface QuizViewProps {
  quizAttempt: QuizAttempt;
  onSubmitQuiz: (answers: UserAnswer[], score: number) => void;
}

const QuizView: React.FC<QuizViewProps> = ({ quizAttempt, onSubmitQuiz }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [localUserAnswers, setLocalUserAnswers] = useState<Record<string, UserAnswer>>({}); 
  const [showFeedback, setShowFeedback] = useState<boolean>(false);
  const [isCurrentCorrect, setIsCurrentCorrect] = useState<boolean | null>(null);
  const [isDrawingModalOpen, setIsDrawingModalOpen] = useState(false);
  const audioPlayerRef = React.useRef<HTMLAudioElement | null>(null);


  const currentQuestion = quizAttempt.questions[currentQuestionIndex];
  const currentUserAnswerObj = localUserAnswers[currentQuestion.id];


  const handleSpeakPrompt = () => {
    const textToSpeak = currentQuestion.tamilWord || currentQuestion.questionText;
    const audioSrc = currentQuestion.audioSrc;

    if (audioPlayerRef.current) {
        audioPlayerRef.current.pause();
        audioPlayerRef.current.currentTime = 0;
    }

    if (audioSrc) {
        const audio = new Audio(audioSrc);
        audioPlayerRef.current = audio;
        audio.play().catch(error => {
            console.warn(`Error playing static audio for prompt ${audioSrc}:`, error);
            speakWithSynthesis(textToSpeak); // Fallback
        });
    } else {
        speakWithSynthesis(textToSpeak);
    }
  };
  
  const speakWithSynthesis = (textToSpeak: string) => {
     if ('speechSynthesis' in window && textToSpeak) {
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      const voices = window.speechSynthesis.getVoices();
      const tamilVoice = voices.find(voice => voice.lang === 'ta-IN');
      if (tamilVoice) utterance.voice = tamilVoice;
      else utterance.lang = 'ta-IN';
      utterance.rate = 0.8;
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    }
  }
  
  useEffect(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = () => {};
    }
    setCurrentQuestionIndex(0);
    setLocalUserAnswers({});
    setShowFeedback(false);
    setIsCurrentCorrect(null);
    setIsDrawingModalOpen(false);
     return () => { // Cleanup audio on component unmount or quiz change
      if (audioPlayerRef.current) {
        audioPlayerRef.current.pause();
        audioPlayerRef.current = null;
      }
    };
  }, [quizAttempt]);


  const handleAnswer = (questionId: string, answer: string, isDrawn: boolean = false, drawnImage?: string) => {
    setLocalUserAnswers(prev => ({ 
        ...prev, 
        [questionId]: { questionId, answer, isCorrect: false, isDrawn, drawnImage } 
    }));
    setShowFeedback(false); 
    setIsCurrentCorrect(null);
  };

  const openDrawingModalForCurrentQuestion = () => {
    setIsDrawingModalOpen(true);
  };

  const handleDrawingSubmit = (imageDataUrl: string) => {
    handleAnswer(currentQuestion.id, `[Drawn: ${currentQuestion.correctAnswer}]`, true, imageDataUrl);
    setIsDrawingModalOpen(false);
  };

  const checkAnswer = () => {
    const userAnswerObj = localUserAnswers[currentQuestion.id];
    const answerValue = userAnswerObj?.answer;

    if (!userAnswerObj || (!userAnswerObj.isDrawn && typeof answerValue === 'string' && answerValue.trim() === "")) {
        setIsCurrentCorrect(false); 
        setShowFeedback(true);
        return;
    }

    let correct = false;
    if (currentQuestion.type === QuestionType.MCQ) {
      correct = answerValue === currentQuestion.correctAnswer;
    } else if (currentQuestion.type === QuestionType.FILL_IN_BLANK) {
      if (userAnswerObj.isDrawn) { 
        correct = false; 
      } else {
        if (typeof answerValue === 'string') {
          correct = answerValue.trim().toLowerCase() === currentQuestion.correctAnswer?.trim().toLowerCase();
        }
      }
    }
    setIsCurrentCorrect(correct);
    if (userAnswerObj) {
        setLocalUserAnswers(prev => ({
            ...prev,
            [currentQuestion.id]: { ...userAnswerObj, isCorrect: correct }
        }));
    }
    setShowFeedback(true);
  };

  const handleNext = () => {
    const userAnswerForCheck = localUserAnswers[currentQuestion.id];
    
    if (!showFeedback && !(userAnswerForCheck?.isDrawn)) { 
      checkAnswer();
      return; 
    }
    if (userAnswerForCheck?.isDrawn && !showFeedback) {
        checkAnswer(); 
        return;
    }

    setShowFeedback(false);
    setIsCurrentCorrect(null);

    if (currentQuestionIndex < quizAttempt.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      let score = 0;
      const finalAnswers: UserAnswer[] = quizAttempt.questions.map(q => {
        const localAns = localUserAnswers[q.id];
        let isCorrectFinal = false;
        let answerValueToStore: string | string[] = localAns ? localAns.answer : '';

        if (localAns) {
            if (q.type === QuestionType.MCQ) {
                isCorrectFinal = localAns.answer === q.correctAnswer;
            } else if (q.type === QuestionType.FILL_IN_BLANK) {
                if (localAns.isDrawn) { 
                    isCorrectFinal = false; 
                } else {
                    if (typeof localAns.answer === 'string') {
                         isCorrectFinal = localAns.answer.trim().toLowerCase() === q.correctAnswer?.trim().toLowerCase();
                    }
                }
            }
        }
        
        if (isCorrectFinal && !localAns?.isDrawn) score++;
        
        return { 
            questionId: q.id, 
            answer: answerValueToStore, 
            isCorrect: isCorrectFinal,
            isDrawn: localAns?.isDrawn || false,
            drawnImage: localAns?.drawnImage 
        };
      });
      onSubmitQuiz(finalAnswers, score);
    }
  };

  const renderQuestion = () => {
    if (!currentQuestion) return <p>Loading question...</p>;
    const userAnswerValue = localUserAnswers[currentQuestion.id]?.answer;
    const drawnImageValue = localUserAnswers[currentQuestion.id]?.drawnImage;

    switch (currentQuestion.type) {
      case QuestionType.MCQ:
        const mcqUserAnswer = typeof userAnswerValue === 'string' ? userAnswerValue : undefined;
        return <MCQQuestionDisplay question={currentQuestion} onAnswer={(ans) => handleAnswer(currentQuestion.id, ans, false)} userAnswer={mcqUserAnswer} />;
      case QuestionType.FILL_IN_BLANK:
        const fibUserAnswer = typeof userAnswerValue === 'string' ? userAnswerValue : undefined;
        return <FillInBlankQuestionDisplay 
                    question={currentQuestion} 
                    onAnswer={(ans, isDrawnFlag, imgData) => handleAnswer(currentQuestion.id, ans, isDrawnFlag, imgData)} 
                    userAnswer={fibUserAnswer}
                    drawnImage={drawnImageValue}
                    openDrawingModal={openDrawingModalForCurrentQuestion} 
                />;
      default:
        return <p>Unsupported question type.</p>;
    }
  };
  
  const answerForCanProceed = currentUserAnswerObj?.answer;
  const canProceed = currentUserAnswerObj &&
    (currentUserAnswerObj.isDrawn || 
     (typeof answerForCanProceed === 'string' && answerForCanProceed.trim() !== "")
    );

  return (
    <div className="container mx-auto p-3 sm:p-4 md:p-6 flex flex-col items-center">
      <div className="bg-brand-surface p-4 sm:p-6 md:p-8 rounded-2xl shadow-xl w-full max-w-2xl">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-brand-primary-dark mb-1 sm:mb-2">Quiz Time! 🥳</h2>
        <p className="text-brand-text-secondary text-sm sm:text-base mb-4 sm:mb-6">Question {currentQuestionIndex + 1} of {quizAttempt.questions.length}</p>
        
        <div className="mb-4 sm:mb-6 min-h-[120px] sm:min-h-[150px] md:min-h-[180px]"> 
          {renderQuestion()}
        </div>

        {(currentQuestion.tamilWord || currentQuestion.audioSrc || (currentQuestion.type === QuestionType.MCQ /* && currentQuestion.audioPrompt - if this prop existed */)) && (
             <button 
                onClick={handleSpeakPrompt}
                className="mb-3 sm:mb-4 p-2 text-brand-primary hover:text-brand-primary-dark transition-colors flex items-center text-xs sm:text-sm"
                title={`Listen to pronunciation`}
                aria-label={`Listen to pronunciation`}
            >
                <SpeakerIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2"/> Listen
            </button>
        )}

        {showFeedback && (
          <div className={`my-3 sm:my-4 p-2 sm:p-3 rounded-lg text-center font-medium text-xs sm:text-sm
            ${currentUserAnswerObj?.isDrawn ? 'bg-blue-100 text-blue-700' : (isCurrentCorrect ? 'bg-brand-success-light text-green-700' : 'bg-brand-error-light text-red-700')}`}>
            {currentUserAnswerObj?.isDrawn 
                ? `You drew for this! Correct word: "${currentQuestion.correctAnswer}". Compare! ✨`
                : (isCurrentCorrect ? 'Super! Correct! 🎉😄' : 
                    `Almost! Correct answer: "${currentQuestion.type === QuestionType.MCQ ? 
                        currentQuestion.options?.find(o => o.id === currentQuestion.correctAnswer)?.text 
                        : currentQuestion.correctAnswer}" 🤔`)}
          </div>
        )}

        <button
          onClick={handleNext}
          disabled={!canProceed && !showFeedback && !currentUserAnswerObj?.isDrawn}
          className={`
            w-full mt-3 sm:mt-4 px-4 py-2.5 sm:px-6 sm:py-3 text-white font-semibold rounded-xl shadow-md transition-all duration-200 ease-in-out transform hover:scale-102 text-sm sm:text-base
            ${(!canProceed && !showFeedback && !currentUserAnswerObj?.isDrawn) ? 'bg-slate-400 cursor-not-allowed' : (showFeedback || currentUserAnswerObj?.isDrawn ? 'bg-brand-accent hover:bg-brand-accent-dark' : 'bg-brand-primary hover:bg-brand-primary-dark')}
            focus:outline-none focus:ring-4 focus:ring-opacity-50 
            ${(!canProceed && !showFeedback && !currentUserAnswerObj?.isDrawn) ? 'focus:ring-slate-300' : (showFeedback || currentUserAnswerObj?.isDrawn ? 'focus:ring-brand-accent' : 'focus:ring-brand-primary') }
          `}
        >
          {showFeedback 
            ? (currentQuestionIndex < quizAttempt.questions.length - 1 ? 'Next Question ➡️' : 'View Results 🏆')
            : (currentUserAnswerObj?.isDrawn ? 'Reveal & Continue 👀' : 'Check Answer ✅')}
        </button>
      </div>
      {isDrawingModalOpen && currentQuestion.answerFormat === 'draw-tamil' && (
        <DrawingModal 
            isOpen={isDrawingModalOpen} 
            onClose={() => setIsDrawingModalOpen(false)}
            onSubmit={handleDrawingSubmit}
            targetWord={currentQuestion.correctAnswer} 
        />
      )}
    </div>
  );
};

export default QuizView;