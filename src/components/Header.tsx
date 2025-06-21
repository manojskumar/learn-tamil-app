import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-brand-primary text-white p-4 sm:p-5 shadow-lg">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between text-center sm:text-left">
        <h1 className="text-2xl sm:text-3xl font-bold font-tamil mb-1 sm:mb-0">தமிழ் கற்கலாம்</h1>
        <h2 className="text-base sm:text-lg font-semibold">Tamil Learning Adventure - M&Ms</h2>
      </div>
    </header>
  );
};

export default Header;
