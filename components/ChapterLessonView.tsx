
import React from 'react';
import { ChapterInfo, AlphabetInfo, WordInfo, SentenceInfo, ParagraphInfo, StoryInfo, ReviewSectionInfo, ExamInfo } from '../types';
import AlphabetCard from './AlphabetCard';
import WordCard from './WordCard';
import DrawingCanvas from './DrawingCanvas'; 

// Helper components for displaying different content types
const LessonAlphabetSection: React.FC<{ alphabets: AlphabetInfo[] }> = ({ alphabets }) => (
  <section className="mb-6 sm:mb-8">
    <h4 className="text-xl sm:text-2xl font-semibold text-brand-primary mb-3 sm:mb-4 border-b-2 border-brand-primary pb-1 sm:pb-2">🔤 Alphabets</h4>
    <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 sm:gap-3 md:gap-4">
      {alphabets.map(alpha => <AlphabetCard key={alpha.tamil} alphabet={alpha} />)}
    </div>
  </section>
);

const LessonWordSection: React.FC<{ words: WordInfo[] }> = ({ words }) => (
  <section className="mb-6 sm:mb-8">
    <h4 className="text-xl sm:text-2xl font-semibold text-brand-teal mb-3 sm:mb-4 border-b-2 border-brand-teal pb-1 sm:pb-2">🗣️ Words</h4>
    <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
      {words.map(word => <WordCard key={word.tamil} word={word} />)}
    </div>
  </section>
);

const LessonSentenceSection: React.FC<{ sentences: SentenceInfo[] }> = ({ sentences }) => (
    <section className="mb-6 sm:mb-8">
      <h4 className="text-xl sm:text-2xl font-semibold text-brand-purple mb-3 sm:mb-4 border-b-2 border-brand-purple pb-1 sm:pb-2">💬 Sentences</h4>
      <div className="space-y-3 sm:space-y-4">
        {sentences.map(sentence => (
          <div key={sentence.id} className="p-3 sm:p-4 bg-brand-purple-light rounded-xl shadow-sm">
            <p className="text-base sm:text-lg text-brand-text-primary font-tamil mb-1" lang="ta">{sentence.tamil}</p>
            {sentence.transliteration && <p className="text-xs sm:text-sm text-brand-text-secondary mb-1">{sentence.transliteration}</p>}
            <p className="text-sm sm:text-md text-slate-700">{sentence.meaning}</p>
          </div>
        ))}
      </div>
    </section>
  );

const LessonParagraphSection: React.FC<{ paragraphs: ParagraphInfo[] }> = ({ paragraphs }) => (
  <section className="mb-6 sm:mb-8">
    <h4 className="text-xl sm:text-2xl font-semibold text-orange-500 mb-3 sm:mb-4 border-b-2 border-orange-500 pb-1 sm:pb-2">📖 Paragraphs</h4>
    {paragraphs.map(para => (
      <div key={para.id} className="p-3 sm:p-4 bg-orange-50 rounded-xl shadow-sm mb-3 sm:mb-4">
        {para.title && <h5 className="text-lg sm:text-xl font-medium text-orange-700 mb-1 sm:mb-2 font-tamil" lang="ta">{para.title}</h5>}
        <p className="text-sm sm:text-md text-brand-text-primary whitespace-pre-line leading-relaxed font-tamil" lang="ta">{para.tamil}</p>
        <p className="text-xs sm:text-sm text-brand-text-secondary mt-1 sm:mt-2"><em>Meaning: {para.meaning}</em></p>
      </div>
    ))}
  </section>
);

const LessonStorySection: React.FC<{ story: StoryInfo }> = ({ story }) => (
  <section className="mb-6 sm:mb-8">
    <h4 className="text-xl sm:text-2xl font-semibold text-red-500 mb-3 sm:mb-4 border-b-2 border-red-500 pb-1 sm:pb-2 font-tamil" lang="ta">📜 {story.title}</h4>
    <div className="p-3 sm:p-4 bg-red-50 rounded-xl shadow-sm">
      <p className="text-sm sm:text-md text-brand-text-primary whitespace-pre-line leading-relaxed font-tamil" lang="ta">{story.tamil}</p>
      {story.meaning && <p className="text-xs sm:text-sm text-brand-text-secondary mt-2 sm:mt-3"><em>Summary: {story.meaning}</em></p>}
    </div>
  </section>
);

const LessonReviewSection: React.FC<{ reviewSections: ReviewSectionInfo[] }> = ({ reviewSections }) => (
    <section className="mb-6 sm:mb-8">
         <h4 className="text-xl sm:text-2xl font-semibold text-indigo-500 mb-3 sm:mb-4 border-b-2 border-indigo-500 pb-1 sm:pb-2">📝 Exam Review Topics</h4>
        {reviewSections.map(section => (
            <div key={section.id} className="p-3 sm:p-4 bg-indigo-50 rounded-xl shadow-sm mb-4 sm:mb-6">
                <h5 className="text-lg sm:text-xl font-medium text-indigo-700 mb-1 sm:mb-2">{section.title}</h5>
                {section.description && <p className="text-sm sm:text-md text-brand-text-secondary mb-1 sm:mb-2">{section.description}</p>}
                {section.content && (
                    <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm text-brand-text-primary">
                        {section.content.map((item, index) => (
                            <li key={index} className="font-tamil" lang="ta">{item}</li>
                        ))}
                    </ul>
                )}
            </div>
        ))}
    </section>
);


interface ChapterLessonViewProps {
  chapter: ChapterInfo;
  onStartQuiz: (quizOrExamId: string) => void;
  showDrawingCanvas?: boolean; 
  allAlphabets?: AlphabetInfo[]; 
}

const ChapterLessonView: React.FC<ChapterLessonViewProps> = ({ chapter, onStartQuiz, showDrawingCanvas, allAlphabets }) => {
  const { learningContent } = chapter;

  // If this chapter is an Exam Hub (has an examList)
  if (chapter.examList && chapter.examList.length > 0) {
    return (
      <div className="container mx-auto p-3 sm:p-4 md:p-6">
        <header className="mb-6 sm:mb-8 border-b-4 border-brand-secondary pb-3 sm:pb-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-brand-primary-dark font-tamil" lang="ta">{chapter.title}</h2>
          <p className="text-base sm:text-lg text-brand-text-secondary mt-1 sm:mt-2">{chapter.description}</p>
        </header>
        <h3 className="text-xl sm:text-2xl font-semibold text-indigo-600 mb-4 sm:mb-6 text-center">Available Final Exams:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {chapter.examList.map((exam) => (
            <button
              key={exam.id}
              onClick={() => onStartQuiz(exam.id)} // Pass exam.id to start the specific exam
              className="bg-brand-surface rounded-2xl shadow-card p-4 sm:p-6 hover:shadow-card-hover transition-all duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-brand-accent focus:ring-opacity-75 text-left flex flex-col items-start h-full"
              aria-label={`Start exam: ${exam.title}`}
            >
              <h4 className="text-lg sm:text-xl font-semibold text-brand-accent mb-2">{exam.title}</h4>
              <p className="text-brand-text-secondary text-xs sm:text-sm flex-grow">{exam.description}</p>
              <span className="mt-auto text-sm sm:text-base font-medium text-brand-primary-dark hover:text-brand-primary self-end transition-colors">
                Start Exam &rarr;
              </span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Otherwise, render regular chapter content
  return (
    <div className="container mx-auto p-3 sm:p-4 md:p-6">
      <header className="mb-6 sm:mb-8 border-b-4 border-brand-secondary pb-3 sm:pb-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-brand-primary-dark font-tamil" lang="ta">{chapter.title}</h2>
        <p className="text-base sm:text-lg text-brand-text-secondary mt-1 sm:mt-2">{chapter.description}</p>
      </header>

      <div className="prose-xs sm:prose-sm md:prose max-w-none prose-headings:font-tamil prose-p:text-brand-text-primary"> 
        {learningContent?.alphabets && <LessonAlphabetSection alphabets={learningContent.alphabets} />}
        
        {showDrawingCanvas && allAlphabets && chapter.id === 'ch1' && (
          <section className="my-6 sm:my-8 p-3 sm:p-4 border-t-2 border-brand-teal-light rounded-2xl bg-brand-surface shadow-card">
            <DrawingCanvas alphabets={allAlphabets} />
          </section>
        )}

        {learningContent?.words && <LessonWordSection words={learningContent.words} />}
        {learningContent?.sentences && <LessonSentenceSection sentences={learningContent.sentences} />}
        {learningContent?.paragraphs && <LessonParagraphSection paragraphs={learningContent.paragraphs} />}
        {learningContent?.story && <LessonStorySection story={learningContent.story} />}
        {learningContent?.reviewSections && <LessonReviewSection reviewSections={learningContent.reviewSections} />}


        {!learningContent || (Object.keys(learningContent).length === 0 && !showDrawingCanvas) && (
          <p className="text-brand-text-secondary text-sm sm:text-base">No learning material available for this chapter yet. Stay tuned! 🧸</p>
        )}
      </div>

      {chapter.quizId && !chapter.examList && ( // Only show this button if it's NOT an exam hub and HAS a quizId
        <div className="mt-8 sm:mt-12 text-center">
          <button
            onClick={() => onStartQuiz(chapter.id)} // For regular chapters, use chapter.id
            className="px-6 py-3 sm:px-8 sm:py-4 bg-brand-accent text-white text-base sm:text-lg font-semibold rounded-2xl shadow-lg hover:bg-brand-accent-dark transition-all duration-150 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-brand-secondary focus:ring-opacity-50 animate-bounce"
          >
            Test Your Knowledge - Start Quiz! 🚀
          </button>
        </div>
      )}
    </div>
  );
};

export default ChapterLessonView;
