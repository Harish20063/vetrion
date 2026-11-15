import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, Info, AlertCircle, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-20 md:bottom-6 right-4 left-4 md:left-auto md:right-6 z-50 flex flex-col gap-2 pointer-events-none max-w-sm">
      {toasts.map((toast) => {
        let Icon = CheckCircle2;
        let colorClass = 'text-marigold-400';
        if (toast.type === 'error') {
          Icon = AlertCircle;
          colorClass = 'text-red-400';
        } else if (toast.type === 'info') {
          Icon = Info;
          colorClass = 'text-indigo-300';
        }

        return (
          <div
            key={toast.id}
            className="pointer-events-auto bg-indigo-950 text-white px-4 py-3 rounded-full text-sm font-medium flex items-center justify-between gap-3 shadow-2xl border border-marigold-500/40 animate-slide-up"
          >
            <div className="flex items-center gap-2.5">
              <Icon className={`w-4 h-4 shrink-0 ${colorClass}`} />
              <span className="leading-tight">{toast.text}</span>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-gray-400 hover:text-white p-1 rounded-full transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
