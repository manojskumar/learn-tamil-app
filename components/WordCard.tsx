import React from 'react';
import { WordInfo } from '../types';
import SpeakerIcon from './icons/SpeakerIcon';

interface WordCardProps {
  word: WordInfo;
}

const WordCard: React.FC<WordCardProps> = ({ word }) => {
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  const handleSpeak = () => {
    if (word.audioSrc) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      const audio = new Audio(word.audioSrc);
      audioRef.current = audio;
      audio.play().catch(error => {
        console.warn(`Error playing static audio ${word.audioSrc}:`, error);
        speakWithSynthesis();
      });
    } else {
      speakWithSynthesis();
    }
  };
  
  const speakWithSynthesis = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(word.tamil);
      const voices = window.speechSynthesis.getVoices();
      const tamilVoice = voices.find(voice => voice.lang === 'ta-IN');
      if (tamilVoice) {
        utterance.voice = tamilVoice;
      } else {
        utterance.lang = 'ta-IN';
      }
      utterance.rate = 0.8;
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    } else {
      alert('Sorry, your browser does not support text-to-speech.');
    }
  };

  React.useEffect(() => {
     if ('speechSynthesis' in window && !word.audioSrc) {
      window.speechSynthesis.onvoiceschanged = () => {};
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [word.audioSrc]);

  return (
    <div className="bg-brand-surface rounded-2xl shadow-card p-4 sm:p-5 hover:shadow-card-hover transition-all duration-300 ease-in-out flex flex-col items-center text-center transform hover:scale-105">
      <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-brand-teal mb-2 sm:mb-3 font-tamil" lang="ta">{word.tamil}</div>
      <div className="text-md sm:text-lg text-brand-text-secondary mb-1 sm:mb-2">{word.transliteration}</div>
      <div className="text-sm sm:text-md md:text-lg text-brand-text-primary font-medium mb-2 sm:mb-3">{word.meaning}</div>
      {word.exampleSentence && (
        <p className="text-xs sm:text-sm text-slate-500 italic mb-2 sm:mb-3">"{word.exampleSentence}"</p>
      )}
      <button
        onClick={handleSpeak}
        className="mt-auto p-2 text-brand-teal hover:text-green-700 transition-colors"
        title={`Listen to ${word.tamil}`}
        aria-label={`Listen to pronunciation of ${word.tamil}`}
      >
        <SpeakerIcon className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>
    </div>
  );
};

export default WordCard;