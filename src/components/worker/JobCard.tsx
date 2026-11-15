import React from 'react';
import { Job } from '../../types';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../context/LanguageContext';
import { 
  Home, 
  Store, 
  Building, 
  HardHat, 
  Sprout, 
  MapPin, 
  Bookmark, 
  Clock, 
  Zap, 
  Check 
} from 'lucide-react';

interface JobCardProps {
  job: Job;
  onApply: (job: Job) => void;
}

export const JobCard: React.FC<JobCardProps> = ({ job, onApply }) => {
  const { savedJobIds, appliedJobIds, toggleSaveJob } = useApp();
  const { t } = useLanguage();

  const isSaved = savedJobIds.includes(job.id);
  const isApplied = appliedJobIds.includes(job.id);

  let EntityIcon = Building;
  if (job.entityType === 'household') EntityIcon = Home;
  else if (job.entityType === 'shop') EntityIcon = Store;
  else if (job.entityType === 'farm') EntityIcon = Sprout;
  else if (job.entityType === 'contractor') EntityIcon = HardHat;

  const payUnitText = job.payUnit === 'day' ? t('dayWageUnit') : t('monthSalaryUnit');

  return (
    <div className="bg-white border border-lilac-border rounded-card p-5 shadow-soft hover:shadow-lift hover:-translate-y-0.5 transition-all flex flex-col justify-between">
      <div>
        {/* Card Header */}
        <div className="flex items-start gap-3.5 mb-3">
          {/* Doorway Arch Entity Icon */}
          <div className="w-11 h-13 rounded-t-[18px] rounded-b-[6px] bg-indigo-50 border border-indigo-100 text-indigo-700 flex items-center justify-center shrink-0">
            <EntityIcon className="w-5 h-5" />
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="font-display font-bold text-base md:text-lg text-indigo-950 leading-snug truncate">
              {job.title}
            </h3>
            <div className="flex items-center flex-wrap gap-2 text-xs mt-1">
              <span className="bg-lilac-subtle text-indigo-900 font-semibold px-2.5 py-0.5 rounded-full">
                {t(job.entityType)}
              </span>
              <span className="text-text-muted flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-indigo-500" />
                {job.locality}, {job.city}
              </span>
            </div>
          </div>

          {/* Bookmark Button */}
          <button
            onClick={() => toggleSaveJob(job.id)}
            className={`p-1.5 rounded-full hover:bg-lilac-subtle transition-transform hover:scale-110 ${
              isSaved ? 'text-marigold-500' : 'text-gray-400 hover:text-marigold-500'
            }`}
            title={isSaved ? t('savedJob') : t('saveJob')}
          >
            <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-marigold-500' : ''}`} />
          </button>
        </div>

        {/* Description */}
        <p className="text-text-muted text-xs md:text-sm line-clamp-2 leading-relaxed mb-4">
          {job.desc}
        </p>
      </div>

      {/* Footer */}
      <div className="border-t border-dashed border-lilac-border pt-3.5 mt-auto flex items-center justify-between gap-3">
        <div>
          <div className="font-display font-black text-lg text-indigo-950 leading-none">
            ₹{job.payAmount.toLocaleString('en-IN')}
            <span className="text-xs font-semibold text-text-muted ml-0.5">{payUnitText}</span>
          </div>
          <div className="flex items-center gap-1 text-[11px] text-text-light mt-1">
            <Clock className="w-3 h-3" />
            <span>{job.postedDaysAgo}</span>
          </div>
        </div>

        <button
          onClick={() => onApply(job)}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all shadow-sm ${
            isApplied
              ? 'bg-emerald-50 text-emerald-700 border border-emerald-300'
              : 'bg-indigo-900 hover:bg-indigo-800 text-white shadow-indigo-900/20'
          }`}
        >
          {isApplied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span>{t('applied')}</span>
            </>
          ) : (
            <>
              <Zap className="w-3.5 h-3.5 text-marigold-400 fill-marigold-400" />
              <span>{t('applyNow')}</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
