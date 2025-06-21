import React from 'react';
import { ChapterInfo } from '../types';
import BookOpenIcon from './icons/BookOpenIcon';

interface ChapterSelectionProps {
  chapters: ChapterInfo[];
  onSelectChapter: (chapter: ChapterInfo) => void;
}

const ChapterSelection: React.FC<ChapterSelectionProps> = ({ chapters, onSelectChapter }) => {
  return (
    <div className="container mx-auto p-3 sm:p-4 md:p-6">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-brand-primary-dark mb-6 sm:mb-8 text-center">📚 Learning Chapters 🌟</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {chapters.map((chapter) => (
          <button
            key={chapter.id}
            onClick={() => onSelectChapter(chapter)}
            className="bg-brand-surface rounded-2xl shadow-card p-4 sm:p-6 hover:shadow-card-hover transition-all duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-brand-secondary focus:ring-opacity-75 text-left flex flex-col items-start h-full"
            aria-label={`Select chapter: ${chapter.title}`}
          >
            <div className="flex items-center mb-2 sm:mb-3">
              <BookOpenIcon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-brand-accent mr-2 sm:mr-3" />
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-brand-primary-dark font-tamil" lang="ta">{chapter.title}</h3>
            </div>
            <p className="text-brand-text-secondary text-xs sm:text-sm md:text-base mb-3 sm:mb-4 flex-grow">{chapter.description}</p>
            <span className="mt-auto text-xs sm:text-sm md:text-base font-medium text-brand-accent-dark hover:text-orange-700 self-end transition-colors">
              Start Learning &rarr;
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ChapterSelection;