import React, { useState, useCallback, useEffect } from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import ChapterSelection from './components/ChapterSelection';
import ChapterLessonView from './components/ChapterLessonView';
import QuizView from './components/QuizView';
import QuizResults from './components/QuizResults';
import { LearningMode, ChapterInfo, QuizQuestion, UserAnswer, QuizAttempt } from './types';
import { CHAPTERS_DATA, QUIZ_QUESTIONS_DATA, ALL_ALPHABETS } from './constants';
import LightbulbIcon from './components/icons/LightbulbIcon'; 

function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

// Helper function to select questions for regular chapter quizzes
const selectDynamicQuizQuestions = (allQuestionsForChapter: QuizQuestion[]): QuizQuestion[] => {
    if (!allQuestionsForChapter || allQuestionsForChapter.length === 0) {
        return [];
    }
    const imageDerivedQuestions = shuffleArray(allQuestionsForChapter.filter(q => q.source === 'uploaded_image'));
    const generalQuestions = shuffleArray(allQuestionsForChapter.filter(q => q.source !== 'uploaded_image'));
    
    const QUIZ_SIZE = 20;
    const IMAGE_QUESTION_TARGET_PERCENT = 0.9;
    let selectedQuestions: QuizQuestion[] = [];
    
    const targetImageCount = Math.floor(QUIZ_SIZE * IMAGE_QUESTION_TARGET_PERCENT);
    const numImageToTake = Math.min(targetImageCount, imageDerivedQuestions.length);
    selectedQuestions.push(...imageDerivedQuestions.slice(0, numImageToTake));
    
    const remainingSlotsForGeneral = QUIZ_SIZE - selectedQuestions.length;
    const numGeneralToTake = Math.min(remainingSlotsForGeneral, generalQuestions.length);
    selectedQuestions.push(...generalQuestions.slice(0, numGeneralToTake));

    // If still less than QUIZ_SIZE, try to fill with more image-derived questions
    if (selectedQuestions.length < QUIZ_SIZE && imageDerivedQuestions.length > numImageToTake) {
        const imageQuestionsAlreadyTaken = numImageToTake;
        const additionalImageNeeded = QUIZ_SIZE - selectedQuestions.length;
        const additionalImageAvailable = imageDerivedQuestions.length - imageQuestionsAlreadyTaken;
        const additionalImageToTake = Math.min(additionalImageNeeded, additionalImageAvailable);
        
        if (additionalImageToTake > 0) {
            selectedQuestions.push(...imageDerivedQuestions.slice(imageQuestionsAlreadyTaken, imageQuestionsAlreadyTaken + additionalImageToTake));
        }
    }
    // If still less than QUIZ_SIZE, try to fill with more general questions
    if (selectedQuestions.length < QUIZ_SIZE && generalQuestions.length > numGeneralToTake) {
        const generalQuestionsAlreadyTaken = numGeneralToTake;
        const additionalGeneralNeeded = QUIZ_SIZE - selectedQuestions.length;
        const additionalGeneralAvailable = generalQuestions.length - generalQuestionsAlreadyTaken;
        const additionalGeneralToTake = Math.min(additionalGeneralNeeded, additionalGeneralAvailable);

        if (additionalGeneralToTake > 0) {
            selectedQuestions.push(...generalQuestions.slice(generalQuestionsAlreadyTaken, generalQuestionsAlreadyTaken + additionalGeneralToTake));
        }
    }
    
    return shuffleArray(selectedQuestions).slice(0, QUIZ_SIZE); // Ensure final shuffle and limit
};


const App: React.FC = () => {
  const [currentMode, setCurrentMode] = useState<LearningMode>(LearningMode.Chapters);
  const [selectedChapter, setSelectedChapter] = useState<ChapterInfo | null>(null);
  const [activeQuiz, setActiveQuiz] = useState<QuizAttempt | null>(null);
  const [showQuizResults, setShowQuizResults] = useState<boolean>(false);

  const handleModeChange = useCallback((mode: LearningMode) => {
    setCurrentMode(mode);
    setSelectedChapter(null); 
    setActiveQuiz(null);
    setShowQuizResults(false);
  }, []);

  const handleSelectChapter = useCallback((chapter: ChapterInfo) => {
    setSelectedChapter(chapter);
    setCurrentMode(LearningMode.Lesson);
    setActiveQuiz(null);
    setShowQuizResults(false);
  }, []);

  const handleStartQuiz = useCallback((quizOrExamId: string) => {
    const isFinalExam = quizOrExamId.startsWith('exam_image');
    let questionsForAttempt: QuizQuestion[];
    let currentQuizIdForAttempt = quizOrExamId;

    if (isFinalExam) {
        questionsForAttempt = shuffleArray(QUIZ_QUESTIONS_DATA.filter(q => q.chapterId === quizOrExamId));
        if (questionsForAttempt.length === 0) {
            console.warn(`No questions found for final exam: ${quizOrExamId}`);
        }
    } else {
        // For regular chapters, quizOrExamId is the chapter.id
        const chapterForQuiz = CHAPTERS_DATA.find(c => c.id === quizOrExamId);
        if (!chapterForQuiz) {
            console.warn(`Chapter not found for quiz: ${quizOrExamId}`);
            return;
        }
        // Use chapter.id to fetch questions if quizId is just an alias or not consistently used in QUIZ_QUESTIONS_DATA
        const allQuestionsForChapter = QUIZ_QUESTIONS_DATA.filter(q => q.chapterId === chapterForQuiz.id);
        questionsForAttempt = selectDynamicQuizQuestions(allQuestionsForChapter);
        currentQuizIdForAttempt = chapterForQuiz.quizId || chapterForQuiz.id; // Use quizId if present, else chapter.id
    }
    
    if (!questionsForAttempt || questionsForAttempt.length === 0) {
        console.warn(`Setting up quiz with no questions for: ${currentQuizIdForAttempt}`);
        setActiveQuiz({
            quizId: currentQuizIdForAttempt,
            questions: [],
            answers: [],
            score: 0,
            totalQuestions: 0,
            completed: false,
        });
    } else {
        setActiveQuiz({
            quizId: currentQuizIdForAttempt,
            questions: questionsForAttempt,
            answers: [],
            score: 0,
            totalQuestions: questionsForAttempt.length,
            completed: false,
        });
    }

    setCurrentMode(LearningMode.Quiz);
    setShowQuizResults(false);
  }, []);


  const handleQuizSubmit = useCallback((answers: UserAnswer[], score: number) => {
    if (activeQuiz) {
      setActiveQuiz(prev => prev ? { ...prev, answers, score, completed: true } : null);
      setShowQuizResults(true);
      // setCurrentMode(LearningMode.Chapters); // Keep user on results, let them navigate
    }
  }, [activeQuiz]);
  
  const handleViewLesson = useCallback(() => {
    if(selectedChapter) {
      setCurrentMode(LearningMode.Lesson);
      setActiveQuiz(null);
      setShowQuizResults(false);
    } else {
      setCurrentMode(LearningMode.Chapters);
    }
  }, [selectedChapter]);

  const handleRetryQuiz = useCallback(() => {
    if (activeQuiz) {
      // activeQuiz.quizId here could be chapter.id or exam.id
      // The handleStartQuiz function now correctly distinguishes them
      handleStartQuiz(activeQuiz.quizId);
    }
  }, [activeQuiz, handleStartQuiz]);

  const handleBackToChaptersFromResults = useCallback(() => {
    setCurrentMode(LearningMode.Chapters);
    setSelectedChapter(null);
    setActiveQuiz(null);
    setShowQuizResults(false);
  }, []);


  const renderContent = () => {
    if (showQuizResults && activeQuiz && activeQuiz.completed) {
      return <QuizResults quizAttempt={activeQuiz} onRetry={handleRetryQuiz} onBackToChapters={handleBackToChaptersFromResults} />;
    }

    switch (currentMode) {
      case LearningMode.Chapters:
        return <ChapterSelection chapters={CHAPTERS_DATA} onSelectChapter={handleSelectChapter} />;
      case LearningMode.Lesson:
        if (selectedChapter) {
          const isAlphabetChapter = selectedChapter.id === 'ch1';
          // For final exams hub, ChapterLessonView will render exam list
          if(selectedChapter.examList && selectedChapter.examList.length > 0) {
            return <ChapterLessonView chapter={selectedChapter} onStartQuiz={handleStartQuiz} />; // onStartQuiz will take exam.id
          }
          return <ChapterLessonView chapter={selectedChapter} onStartQuiz={handleStartQuiz} showDrawingCanvas={isAlphabetChapter} allAlphabets={ALL_ALPHABETS}/>;
        }
        // Fallback if no selected chapter
        setCurrentMode(LearningMode.Chapters); 
        return <ChapterSelection chapters={CHAPTERS_DATA} onSelectChapter={handleSelectChapter} />;
      
      case LearningMode.Quiz:
        if (activeQuiz && !activeQuiz.completed) {
          if(activeQuiz.questions.length === 0) {
            return (
              <div className="text-center p-6 container mx-auto">
                 <div className="bg-brand-surface p-6 sm:p-8 rounded-2xl shadow-xl w-full max-w-lg mx-auto">
                    <p className="text-xl text-brand-text-secondary mb-4">No quiz questions available for this section yet. 😟</p>
                    <button 
                        onClick={() => {setCurrentMode(LearningMode.Chapters); setSelectedChapter(null); setActiveQuiz(null);}}
                        className="px-6 py-2 bg-brand-primary text-white font-semibold rounded-lg hover:bg-brand-primary-dark transition-colors"
                    >
                        Back to Chapters
                    </button>
                 </div>
              </div>
            );
          }
          return <QuizView quizAttempt={activeQuiz} onSubmitQuiz={handleQuizSubmit} />;
        }
         // Fallback if no active quiz
        setCurrentMode(LearningMode.Chapters);
        return <ChapterSelection chapters={CHAPTERS_DATA} onSelectChapter={handleSelectChapter} />;
      
      default:
        return (
          <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] sm:min-h-[calc(100vh-230px)] text-center p-4 sm:p-6 md:p-8 bg-gradient-to-br from-brand-secondary via-brand-bg to-brand-teal-light">
            <LightbulbIcon className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 text-brand-accent mb-4 sm:mb-6 animate-pulse" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-brand-primary-dark mb-3 sm:mb-4">Welcome to Your Tamil Learning Adventure!</h2>
            <p className="text-base sm:text-lg md:text-xl text-brand-text-secondary mb-6 sm:mb-8 max-w-md sm:max-w-lg md:max-w-2xl">
              Select <strong className="text-brand-accent-dark">"Chapters & Quizzes"</strong> from the navigation to begin your fun learning journey!
            </p>
            <p className="text-sm sm:text-md md:text-lg text-brand-primary-dark font-tamil" lang="ta">
              வாருங்கள்! தமிழ் கற்போம், பண்பாடு காப்போம்.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col antialiased">
      <Header />
      <Navigation currentMode={currentMode} onModeChange={handleModeChange} />
      <main className="flex-grow py-4 sm:py-6 md:py-8">
        {renderContent()}
      </main>
      <footer className="bg-brand-primary-dark text-white text-center p-3 sm:p-4 text-xs sm:text-sm">
        <p>&copy; Mridu Solutions Pty Ltd. - {new Date().getFullYear()} Tamil Learning Adventure - M&Ms. Happy Learning! ✨ (Credits: Google Gemini AI) </p>
      </footer>
    </div>
  );
};

export default App;
