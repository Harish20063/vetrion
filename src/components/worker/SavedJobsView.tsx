import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../context/LanguageContext';
import { Job } from '../../types';
import { JobCard } from './JobCard';
import { ApplyModal } from './ApplyModal';
import { Bookmark } from 'lucide-react';

export const SavedJobsView: React.FC = () => {
  const { jobs, savedJobIds, setWorkerTab } = useApp();
  const { language, t } = useLanguage();

  const [selectedJobForApply, setSelectedJobForApply] = useState<Job | null>(null);

  const savedJobs = jobs.filter((j) => savedJobIds.includes(j.id));

  return (
    <div>
      <div className="flex items-center justify-between mb-4 px-1">
        <h3 className="font-display font-bold text-lg text-indigo-950">
          {t('tabSaved')} ({savedJobs.length})
        </h3>
      </div>

      {savedJobs.length === 0 ? (
        <div className="bg-white border border-dashed border-lilac-border rounded-card p-10 text-center my-4">
          <div className="w-14 h-16 rounded-t-[24px] rounded-b-[8px] bg-lilac-subtle border-2 border-dashed border-indigo-400 text-indigo-600 flex items-center justify-center mx-auto mb-3">
            <Bookmark className="w-6 h-6" />
          </div>
          <h3 className="font-display font-bold text-lg text-indigo-950 mb-1">{t('noSavedJobs')}</h3>
          <p className="text-xs text-text-muted max-w-sm mx-auto mb-4">{t('saveHint')}</p>
          <button
            onClick={() => setWorkerTab('find-work')}
            className="bg-indigo-900 hover:bg-indigo-800 text-white text-xs font-bold py-2.5 px-6 rounded-full transition-all"
          >
            {language === 'ta' ? 'வேலைகளை தேட' : 'Explore Jobs'}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {savedJobs.map((job) => (
            <JobCard key={job.id} job={job} onApply={(j) => setSelectedJobForApply(j)} />
          ))}
        </div>
      )}

      {/* Apply Modal */}
      <ApplyModal
        job={selectedJobForApply}
        isOpen={!!selectedJobForApply}
        onClose={() => setSelectedJobForApply(null)}
      />
    </div>
  );
};
