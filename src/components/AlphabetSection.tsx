import React from 'react';
import { AlphabetInfo } from '../types';
import { UYIR_EZHUTHUKKAL, MEI_EZHUTHUKKAL, AAYUTHA_EZHUTHU } from '../constants';
import AlphabetCard from './AlphabetCard';
// DrawingCanvas is now integrated into ChapterLessonView for the alphabet chapter specifically

const AlphabetCategory: React.FC<{ title: string; alphabets: AlphabetInfo[] | AlphabetInfo, titleColor?: string }> = ({ title, alphabets, titleColor = "text-brand-primary" }) => (
  <section className="mb-12">
    <h3 className={`text-2xl sm:text-3xl font-semibold ${titleColor} mb-6 pb-2 border-b-2 border-brand-secondary`}>{title}</h3>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5 sm:gap-6">
      {Array.isArray(alphabets) ? (
        alphabets.map((alpha) => <AlphabetCard key={alpha.tamil} alphabet={alpha} />)
      ) : (
        <AlphabetCard alphabet={alphabets} />
      )}
    </div>
  </section>
);

const AlphabetSection: React.FC = () => {
  // This component can still be used as a standalone reference if linked directly,
  // but chapter-based learning will use ChapterLessonView which might embed these categories.
  return (
    <div className="container mx-auto p-4 sm:p-6">
      <AlphabetCategory title="உயிர் எழுத்துக்கள் (Vowels)" alphabets={UYIR_EZHUTHUKKAL} titleColor="text-brand-primary" />
      <AlphabetCategory title="மெய் எழுத்துக்கள் (Consonants)" alphabets={MEI_EZHUTHUKKAL} titleColor="text-brand-teal" />
      <AlphabetCategory title="ஆய்த எழுத்து (Special Character)" alphabets={AAYUTHA_EZHUTHU} titleColor="text-brand-purple"/>
      
      {/* 
        DrawingCanvas is now conditionally rendered within ChapterLessonView 
        when the alphabet chapter is selected.
      */}

    </div>
  );
};

export default AlphabetSection;
