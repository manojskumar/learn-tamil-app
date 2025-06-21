import React, { useRef, useState, useEffect, useCallback } from 'react';

interface DrawingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (imageDataUrl: string) => void;
  targetWord?: string; 
}

const DrawingModal: React.FC<DrawingModalProps> = ({ isOpen, onClose, onSubmit, targetWord }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [canvasSize, setCanvasSize] = useState({ width: 350, height: 150 });

  useEffect(() => {
    const updateCanvasSize = () => {
      // Adjust canvas size for smaller screens
      if (window.innerWidth < 480) {
        setCanvasSize({ width: 280, height: 120 });
      } else if (window.innerWidth < 380) {
        setCanvasSize({ width: 240, height: 100 });
      } else {
        setCanvasSize({ width: 350, height: 150 });
      }
    };
    if (isOpen) {
      updateCanvasSize(); // Set initial size when opened
      clearCanvas();
      window.addEventListener('resize', updateCanvasSize);
    }
    return () => window.removeEventListener('resize', updateCanvasSize);
  }, [isOpen]);

  const clearCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);
  
  useEffect(() => { // Ensure canvas is cleared if size changes while open
    if (isOpen) {
      clearCanvas();
    }
  }, [canvasSize, isOpen, clearCanvas]);


  const getPos = (canvas: HTMLCanvasElement, event: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
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

  const startDrawing = (event: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    setIsDrawing(true);
    const pos = getPos(canvas, event);
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
  };

  const draw = (event: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    event.preventDefault(); // Prevent page scroll on touch
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const pos = getPos(canvas, event);
    ctx.lineTo(pos.x, pos.y);
    ctx.strokeStyle = '#374151'; 
    ctx.lineWidth = Math.max(2, canvasSize.width * 0.012); // Responsive line width
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (ctx) ctx.closePath();
  };

  const handleSubmitDrawing = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const imageDataUrl = canvas.toDataURL('image/png'); 
      onSubmit(imageDataUrl);
    } else {
      onSubmit(''); 
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-2 sm:p-4 z-50 transition-opacity duration-300 ease-in-out">
      <div className="bg-brand-surface p-4 sm:p-6 rounded-2xl shadow-xl w-full max-w-sm sm:max-w-md transform transition-all duration-300 ease-in-out scale-100 relative">
        <button
            onClick={onClose}
            className="absolute top-2 right-2 sm:top-3 sm:right-3 text-brand-text-secondary hover:text-brand-text-primary text-2xl sm:text-3xl p-1 leading-none"
            aria-label="Close drawing modal"
        >
            &times;
        </button>
        <h3 className="text-xl sm:text-2xl font-semibold text-brand-primary mb-1 text-center">Draw Your Answer</h3>
        {targetWord && <p className="text-center text-brand-text-secondary mb-2 sm:mb-3 text-base sm:text-lg font-tamil" lang="ta">(Draw: {targetWord})</p>}
        <p className="text-xs sm:text-sm text-brand-text-secondary text-center mb-3 sm:mb-4">Draw the Tamil word in the box below.</p>
        
        <canvas
          ref={canvasRef}
          width={canvasSize.width} 
          height={canvasSize.height} 
          className="border-2 border-brand-secondary rounded-xl bg-white cursor-crosshair touch-none shadow-inner mx-auto block max-w-full"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          aria-label="Drawing canvas for Tamil word"
        />
        <div className="mt-4 sm:mt-6 flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:justify-around sm:gap-3">
          <button
            onClick={clearCanvas}
            className="w-full sm:w-auto px-4 py-2 sm:px-5 sm:py-2.5 bg-brand-secondary text-brand-text-primary font-semibold rounded-lg hover:bg-brand-secondary-dark transition-colors focus:outline-none focus:ring-2 focus:ring-brand-secondary-dark focus:ring-opacity-50 shadow-md text-sm sm:text-base"
          >
            Clear 🧹
          </button>
          <button
            onClick={handleSubmitDrawing}
            className="w-full sm:w-auto px-4 py-2 sm:px-5 sm:py-2.5 bg-brand-accent text-white font-semibold rounded-lg hover:bg-brand-accent-dark transition-colors focus:outline-none focus:ring-2 focus:ring-brand-accent-dark focus:ring-opacity-50 shadow-md text-sm sm:text-base"
          >
            Submit Drawing 👍
          </button>
        </div>
      </div>
    </div>
  );
};

export default DrawingModal;
