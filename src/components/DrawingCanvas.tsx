import React, { useState, useRef, useEffect, useCallback } from 'react';
import { AlphabetInfo } from '../types';

interface DrawingCanvasProps {
  alphabets: AlphabetInfo[];
}

const DrawingCanvas: React.FC<DrawingCanvasProps> = ({ alphabets }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [selectedAlphabet, setSelectedAlphabet] = useState<AlphabetInfo | null>(alphabets.length > 0 ? alphabets[0] : null);
  const [drawingMode, setDrawingMode] = useState<'trace' | 'practice'>('trace');
  const [feedbackMessage, setFeedbackMessage] = useState<string>('');
  const [canvasSize, setCanvasSize] = useState({ width: 300, height: 300 }); // Default size

  useEffect(() => {
    const updateCanvasSize = () => {
      if (window.innerWidth < 480) { // Example breakpoint for smaller canvas
        setCanvasSize({ width: 240, height: 240 });
      } else {
        setCanvasSize({ width: 300, height: 300 });
      }
    };
    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);
    return () => window.removeEventListener('resize', updateCanvasSize);
  }, []);
  
  const drawTraceAlphabet = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !selectedAlphabet || drawingMode !== 'trace') return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height); 
    const fontSize = canvas.width * 0.5; // Scale font size with canvas
    ctx.font = `${fontSize}px Noto Sans Tamil, sans-serif`;
    ctx.fillStyle = '#D1D5DB'; 
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(selectedAlphabet.tamil, canvas.width / 2, canvas.height / 2);
  }, [selectedAlphabet, drawingMode]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (drawingMode === 'trace' && selectedAlphabet) {
      drawTraceAlphabet();
    }
  }, [selectedAlphabet, drawingMode, drawTraceAlphabet, canvasSize]); // Redraw on canvasSize change

  const startDrawing = (event: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsDrawing(true);
    const pos = getMousePos(canvas, event);
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
    setFeedbackMessage(''); 
  };

  const draw = (event: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    event.preventDefault(); // Prevent scrolling on touch devices
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const pos = getMousePos(canvas, event);
    ctx.lineTo(pos.x, pos.y);
    ctx.strokeStyle = '#374151'; 
    ctx.lineWidth = Math.max(2, canvasSize.width * 0.015); // Scale line width
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.closePath();
  };

  const getMousePos = (canvas: HTMLCanvasElement, event: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const rect = canvas.getBoundingClientRect();
    let clientX, clientY;

    if ('touches' in event.nativeEvent) {
      clientX = event.nativeEvent.touches[0].clientX;
      clientY = event.nativeEvent.touches[0].clientY;
    } else {
      clientX = event.nativeEvent.clientX;
      clientY = event.nativeEvent.clientY;
    }
    
    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  };

  const handleClear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (drawingMode === 'trace' && selectedAlphabet) {
      drawTraceAlphabet(); 
    }
    setFeedbackMessage('');
  };

  const handleValidate = () => {
    setFeedbackMessage(`Great effort! Keep practicing ${selectedAlphabet ? selectedAlphabet.tamil : ''}. 👍`);
  };

  const handleAlphabetChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = alphabets.find(a => a.tamil === event.target.value) || null;
    setSelectedAlphabet(selected);
    handleClear(); 
  };

  const handleModeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDrawingMode(event.target.value as 'trace' | 'practice');
    handleClear(); 
  };
  
  if (alphabets.length === 0) {
    return <p className="text-brand-text-secondary text-sm sm:text-base">No alphabets available for drawing practice.</p>;
  }

  return (
    <div className="bg-brand-teal-light p-3 sm:p-4 md:p-6 rounded-2xl shadow-card">
      <h4 className="text-lg sm:text-xl font-semibold text-brand-teal mb-3 sm:mb-4">🎨 எழுத்துப் பயிற்சி (Drawing Practice)</h4>
      
      <div className="mb-3 sm:mb-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
        <div className="flex-grow sm:flex-grow-0">
          <label htmlFor="alphabet-select" className="block text-xs sm:text-sm font-medium text-brand-text-primary mb-1">Select Alphabet:</label>
          <select
            id="alphabet-select"
            value={selectedAlphabet?.tamil || ''}
            onChange={handleAlphabetChange}
            className="w-full sm:w-auto p-2 border border-slate-300 rounded-lg shadow-sm focus:ring-brand-teal focus:border-brand-teal bg-white text-xs sm:text-sm"
          >
            {alphabets.map(alpha => (
              <option key={alpha.tamil} value={alpha.tamil} lang="ta">{alpha.tamil} ({alpha.transliteration})</option>
            ))}
          </select>
        </div>

        <div>
          <span className="block text-xs sm:text-sm font-medium text-brand-text-primary mb-1">Mode:</span>
          <div className="flex gap-3 sm:gap-4">
            <label className="flex items-center">
              <input 
                type="radio" 
                name="drawingMode" 
                value="trace" 
                checked={drawingMode === 'trace'} 
                onChange={handleModeChange}
                className="form-radio h-3.5 w-3.5 sm:h-4 sm:w-4 text-brand-teal border-slate-400 focus:ring-brand-teal" 
              />
              <span className="ml-1.5 sm:ml-2 text-brand-text-primary text-xs sm:text-sm">Trace</span>
            </label>
            <label className="flex items-center">
              <input 
                type="radio" 
                name="drawingMode" 
                value="practice" 
                checked={drawingMode === 'practice'} 
                onChange={handleModeChange}
                className="form-radio h-3.5 w-3.5 sm:h-4 sm:w-4 text-brand-teal border-slate-400 focus:ring-brand-teal"
              />
              <span className="ml-1.5 sm:ml-2 text-brand-text-primary text-xs sm:text-sm">Practice</span>
            </label>
          </div>
        </div>
      </div>

      <canvas
        ref={canvasRef}
        width={canvasSize.width} 
        height={canvasSize.height} 
        className="border-2 border-slate-400 rounded-xl bg-white cursor-crosshair touch-none shadow-inner mx-auto block max-w-full"
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing} 
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={stopDrawing}
        aria-label="Drawing canvas for Tamil alphabets"
      />

      <div className="mt-3 sm:mt-4 flex flex-wrap gap-2 sm:gap-3">
        <button
          onClick={handleClear}
          className="px-3 py-1.5 sm:px-4 sm:py-2 bg-brand-secondary text-brand-text-primary font-semibold rounded-lg hover:bg-brand-secondary-dark transition-colors focus:outline-none focus:ring-2 focus:ring-brand-secondary-dark focus:ring-opacity-50 shadow-md text-xs sm:text-sm"
        >
          Clear Canvas 🧹
        </button>
        <button
          onClick={handleValidate}
          className="px-3 py-1.5 sm:px-4 sm:py-2 bg-brand-success text-white font-semibold rounded-lg hover:bg-green-600 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 shadow-md text-xs sm:text-sm"
        >
          Validate ✨
        </button>
      </div>
      {feedbackMessage && (
        <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-brand-success font-medium animate-pulse">{feedbackMessage}</p>
      )}
    </div>
  );
};

export default DrawingCanvas;
