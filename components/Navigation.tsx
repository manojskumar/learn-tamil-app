import React from 'react';
import { LearningMode } from '../types';
import BookOpenIcon from './icons/BookOpenIcon';
import LightbulbIcon from './icons/LightbulbIcon'; 

interface NavigationProps {
  currentMode: LearningMode | null;
  onModeChange: (mode: LearningMode) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentMode, onModeChange }) => {
  const navItems = [
    { mode: LearningMode.Chapters, label: 'Chapters & Quizzes', icon: <LightbulbIcon className="mr-1 sm:mr-2 w-4 h-4 sm:w-6 sm:h-6" /> },
  ];

  return (
    <nav className="bg-brand-primary-dark p-3 sm:p-4 shadow-md">
      <div className="container mx-auto flex justify-center space-x-2 sm:space-x-3 md:space-x-4">
        {navItems.map((item) => (
          <button
            key={item.mode}
            onClick={() => onModeChange(item.mode)}
            className={`
              flex items-center px-2 py-1.5 sm:px-3 sm:py-2 rounded-md sm:rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 ease-in-out
              focus:outline-none focus:ring-2 focus:ring-brand-secondary focus:ring-opacity-75 transform hover:scale-105
              ${
                currentMode === item.mode
                  ? 'bg-brand-secondary text-brand-text-primary shadow-lg'
                  : 'text-white hover:bg-brand-primary hover:shadow-md'
              }
            `}
            aria-current={currentMode === item.mode ? 'page' : undefined}
          >
            {item.icon}
            <span className="truncate">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;