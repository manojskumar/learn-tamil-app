import React from 'react';
import { BASIC_WORDS } from '../constants';
import WordCard from './WordCard';

const WordSection: React.FC = () => {
  return (
    <div className="container mx-auto p-4 sm:p-6">
      <section className="mb-12">
        <h3 className="text-2xl sm:text-3xl font-semibold text-brand-teal mb-6 pb-2 border-b-2 border-brand-secondary">அடிப்படை வார்த்தைகள் (Basic Words)</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
          {BASIC_WORDS.map((word) => (
            <WordCard key={word.tamil} word={word} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default WordSection;
