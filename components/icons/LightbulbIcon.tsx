
import React from 'react';

interface LightbulbIconProps {
  className?: string;
}

const LightbulbIcon: React.FC<LightbulbIconProps> = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24" 
    strokeWidth={1.5} 
    stroke="currentColor" 
    className={`w-6 h-6 ${className}`}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.355a3.375 3.375 0 0 1-3 0m3-1.121c0 .69-.13 1.35-.386 1.951m-3.228-1.951c-.256-.601-.386-1.261-.386-1.951m0 0a3.001 3.001 0 0 1 3.75 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
  </svg>
);

export default LightbulbIcon;
