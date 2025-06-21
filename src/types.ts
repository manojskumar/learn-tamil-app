export interface AlphabetInfo {
  tamil: string;
  transliteration: string;
  type: 'vowel' | 'consonant' | 'aayutham';
  soundExample?: string; // e.g., 'as in apple'
  audioSrc?: string; // Path to static audio file e.g., /audio/alphabets/a.mp3
}

export interface WordInfo {
  tamil: string;
  transliteration: string;
  meaning: string;
  exampleSentence?: string; // Optional: "அம்மா வருகிறார்." (Mother is coming.)
  category?: 'simple' | 'complex'; // Used for chapter organization
  audioSrc?: string; // Path to static audio file e.g., /audio/words/amma.mp3
}

export interface SentenceInfo {
  id: string;
  tamil: string;
  transliteration?: string;
  meaning: string;
}

export interface ParagraphInfo {
  id: string;
  title?: string;
  tamil: string; // Could be a string with \n for new lines
  meaning: string;
}

export interface StoryInfo {
  id: string;
  title: string;
  tamil: string; // Full story text
  meaning?: string; // Overall summary or translation
}


export enum LearningMode {
  Chapters = 'CHAPTERS',
  // Alphabets = 'ALPHABETS', // Kept for potential direct access, but primary is Chapters
  // Words = 'WORDS', // Kept for potential direct access
  Quiz = 'QUIZ', // Active quiz mode
  Lesson = 'LESSON', // Viewing a chapter's lesson
}

export enum QuestionType {
  MCQ = 'MCQ',
  FILL_IN_BLANK = 'FILL_IN_BLANK',
  // COMPLETE_TEXT = 'COMPLETE_TEXT', // For longer text completion
  // TRANSLATE = 'TRANSLATE', // e.g. Tamil to English or vice-versa
}

export interface MCQOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface QuizQuestion {
  id: string;
  chapterId: string; // Links question to a chapter
  type: QuestionType;
  questionText: string; // e.g., "What is the Tamil letter for 'ka'?" or "Fill in the blank: நான் ____ சாப்பிட்டேன்."
  options?: MCQOption[]; // For MCQ
  correctAnswer?: string; // For FILL_IN_BLANK, or the ID of the correct MCQOption
  // For FILL_IN_BLANK, the text could be split by the blank, e.g., ["The capital of Tamil Nadu is ", "."]
  blankSegments?: [string, string];
  tamilWord?: string; // Word to pronounce or identify for some questions
  transliteration?: string; // Transliteration for some questions
  audioSrc?: string; // Path to static audio for question prompt
  answerFormat?: 'text' | 'draw-tamil'; // For FILL_IN_BLANK, specifies input method. Defaults to 'text'.
  source?: 'uploaded_image' | 'general'; // Marks the origin of the question content
}

export interface ExamInfo {
  id: string;
  title: string;
  description: string;
}

export interface ChapterInfo {
  id: string;
  title: string;
  description: string;
  learningContent?: {
    alphabets?: AlphabetInfo[]; // Directly include or reference sections
    words?: WordInfo[];
    sentences?: SentenceInfo[];
    paragraphs?: ParagraphInfo[];
    story?: StoryInfo;
    reviewSections?: ReviewSectionInfo[]; // For Exam Prep chapter
    // Potentially add custom components or text for lessons
  };
  quizId?: string; // ID to fetch quiz questions for this chapter
  examList?: ExamInfo[]; // List of exams for exam hub chapters
  // drawingPracticeAvailable?: boolean; // Specific to alphabet chapter
}

export interface ReviewSectionInfo { // For Exam Prep chapter
    id: string;
    title: string;
    description?: string;
    content?: string[]; // list of items to review or practice prompts
}

export interface UserAnswer {
  questionId: string;
  answer: string | string[]; // string for fill-in-blank/drawn, array of option IDs for MCQ
  isCorrect: boolean;
  isDrawn?: boolean; // To indicate if the answer was drawn
  drawnImage?: string; // New field for the image data URL of the drawing
}

export interface QuizAttempt {
  quizId: string;
  questions: QuizQuestion[];
  answers: UserAnswer[];
  score: number;
  totalQuestions: number;
  completed: boolean;
}
