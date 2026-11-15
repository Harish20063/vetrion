import React from 'react';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../context/LanguageContext';

export const HeroBanner: React.FC = () => {
  const { role, jobs, workers } = useApp();
  const { t } = useLanguage();

  const activeCount = role === 'worker' ? jobs.filter((j) => j.status === 'active').length : workers.length;
  const countLabel = role === 'worker' ? t('statJobs') : t('statWorkers');

  return (
    <div className="bg-gradient-to-br from-white to-[#faf8ff] border border-lilac-border rounded-card p-6 md:p-8 my-5 shadow-soft flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
      {/* Text Info */}
      <div className="max-w-xl">
        <h2
          className="font-display font-extrabold text-2xl md:text-3xl text-indigo-950 tracking-tight leading-tight mb-2"
          dangerouslySetInnerHTML={{
            __html: role === 'worker' ? t('heroWorkerH') : t('heroAdminH')
          }}
        />
        <p className="text-text-muted text-sm md:text-base leading-relaxed">
          {role === 'worker' ? t('heroWorkerP') : t('heroAdminP')}
        </p>
      </div>

      {/* Signature Doorway Arch Stat Card */}
      <div className="bg-gradient-to-br from-indigo-950 to-indigo-900 text-white rounded-t-[32px] rounded-b-[12px] p-5 border-2 border-marigold-500 shadow-lift flex items-center gap-4 shrink-0 min-w-[240px]">
        <div className="w-12 h-14 rounded-t-[20px] rounded-b-[6px] bg-white/10 border border-dashed border-marigold-400 flex items-center justify-center text-marigold-400">
          <svg
            className="w-6 h-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 20V10a6 6 0 0 1 12 0v10" />
            <path d="M4 20h16" />
          </svg>
        </div>
        <div>
          <div className="font-display font-black text-3xl text-white leading-none">
            {activeCount}
          </div>
          <div className="text-xs text-indigo-100 font-medium mt-1">
            {countLabel}
          </div>
        </div>
      </div>
    </div>
  );
};
