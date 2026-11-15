import React from 'react';
import { useApp } from '../../context/AppContext';
import { RotateCcw } from 'lucide-react';

export const Footer: React.FC = () => {
  const { resetDemoData } = useApp();

  return (
    <footer className="mt-auto border-t border-lilac-border bg-white py-6 mb-16 md:mb-0">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-text-muted text-center md:text-left">
        <div>
          <strong className="text-indigo-950 font-bold">Vetrion (வெற்றி)</strong> • Made for Tamil Nadu workers, households & local businesses.
        </div>
        <div className="flex items-center gap-4">
          <span>Sample phone numbers are for demonstration.</span>
          <button
            onClick={resetDemoData}
            className="flex items-center gap-1.5 text-indigo-600 hover:text-indigo-900 font-semibold underline transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo Data</span>
          </button>
        </div>
      </div>
    </footer>
  );
};
