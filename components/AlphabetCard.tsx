import React from 'react';
import { AlphabetInfo } from '../types';
import SpeakerIcon from './icons/SpeakerIcon';

interface AlphabetCardProps {
  alphabet: AlphabetInfo;
}

const AlphabetCard: React.FC<AlphabetCardProps> = ({ alphabet }) => {
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  const handleSpeak = () => {
    if (alphabet.audioSrc) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      const audio = new Audio(alphabet.audioSrc);
      audioRef.current = audio;
      audio.play().catch(error => {
        console.warn(`Error playing static audio ${alphabet.audioSrc}:`, error);
        // Fallback to SpeechSynthesis if static audio fails
        speakWithSynthesis();
      });
    } else {
      speakWithSynthesis();
    }
  };

  const speakWithSynthesis = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(alphabet.tamil);
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
    if ('speechSynthesis' in window && !alphabet.audioSrc) { // Only preload for synthesis if no static audio
      window.speechSynthesis.onvoiceschanged = () => {};
    }
    // Cleanup audio element on unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [alphabet.audioSrc]);

  return (
    <div className="bg-brand-surface rounded-2xl shadow-card p-4 sm:p-5 hover:shadow-card-hover transition-all duration-300 ease-in-out flex flex-col items-center text-center transform hover:scale-105">
      <div className="text-5xl sm:text-6xl md:text-7xl font-bold text-brand-primary mb-2 sm:mb-3 font-tamil" lang="ta">{alphabet.tamil}</div>
      <div className="text-base sm:text-lg text-brand-text-secondary mb-1 sm:mb-2">{alphabet.transliteration}</div>
      {alphabet.soundExample && (
        <div className="text-xs sm:text-sm text-slate-500 mb-2 sm:mb-3 italic">({alphabet.soundExample})</div>
      )}
      <button
        onClick={handleSpeak}
        className="mt-auto p-2 text-brand-primary hover:text-brand-primary-dark transition-colors"
        title={`Listen to ${alphabet.tamil}`}
        aria-label={`Listen to pronunciation of ${alphabet.tamil}`}
      >
        <SpeakerIcon className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>
    </div>
  );
};

export default AlphabetCard;