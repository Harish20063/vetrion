import React from 'react';
import { Worker } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { DoorwayArchAvatar } from '../common/DoorwayArch';
import { MapPin, Phone } from 'lucide-react';

interface WorkerCardProps {
  worker: Worker;
  onContact: (worker: Worker) => void;
}

export const WorkerCard: React.FC<WorkerCardProps> = ({ worker, onContact }) => {
  const { language, t } = useLanguage();

  const initials = worker.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const payUnitText = worker.payUnit === 'day' ? t('dayWageUnit') : t('monthSalaryUnit');

  let statusBg = 'bg-emerald-50 text-emerald-700 border-emerald-200';
  let statusText = t('availableNow');
  if (worker.availability === 'within-week') {
    statusBg = 'bg-amber-50 text-amber-700 border-amber-200';
    statusText = t('withinWeek');
  } else if (worker.availability === 'unavailable') {
    statusBg = 'bg-gray-100 text-gray-600 border-gray-200';
    statusText = t('notAvailable');
  }

  return (
    <div className="bg-white border border-lilac-border rounded-card p-5 shadow-soft hover:shadow-lift hover:-translate-y-0.5 transition-all flex flex-col justify-between">
      <div>
        {/* Worker Header */}
        <div className="flex items-start gap-3.5 mb-3">
          <DoorwayArchAvatar initials={initials} />
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-display font-bold text-base md:text-lg text-indigo-950 leading-snug truncate">
                {worker.name}
              </h3>
              <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border shrink-0 ${statusBg}`}>
                {statusText}
              </span>
            </div>
            <div className="text-xs font-semibold text-indigo-600 mt-0.5 truncate">
              {worker.headline}
            </div>
            <div className="flex items-center gap-1 text-xs text-text-muted mt-1">
              <MapPin className="w-3.5 h-3.5 text-indigo-500" />
              <span>{worker.locality}, {worker.city}</span>
            </div>
          </div>
        </div>

        {/* Skills Chips */}
        <div className="flex flex-wrap gap-1.5 my-3">
          {worker.skills.map((skill) => (
            <span
              key={skill}
              className="bg-lilac-subtle text-indigo-900 border border-lilac-border text-[11px] font-semibold px-2.5 py-0.5 rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>

        {/* Details Pill Box */}
        <div className="grid grid-cols-2 gap-2 bg-lilac-bg border border-lilac-border rounded-xl p-2.5 my-3 text-xs">
          <div>
            <div className="text-[10px] uppercase font-bold text-text-light">
              {language === 'ta' ? 'அனுபவம்' : 'Experience'}
            </div>
            <div className="font-bold text-indigo-950 mt-0.5">
              {worker.experience} {language === 'ta' ? 'ஆண்டுகள்' : 'Years'}
            </div>
          </div>
          <div>
            <div className="text-[10px] uppercase font-bold text-text-light">
              {language === 'ta' ? 'சம்பளம்' : 'Expected Pay'}
            </div>
            <div className="font-bold text-indigo-950 mt-0.5">
              ₹{worker.expectedPay.toLocaleString('en-IN')} {payUnitText}
            </div>
          </div>
        </div>

        {/* About snippet */}
        {worker.about && (
          <p className="text-text-muted text-xs line-clamp-2 leading-relaxed mb-4">
            {worker.about}
          </p>
        )}
      </div>

      {/* Footer Contact Button */}
      <div className="border-t border-dashed border-lilac-border pt-3.5 mt-auto">
        <button
          onClick={() => onContact(worker)}
          className="w-full bg-indigo-900 hover:bg-indigo-800 text-white text-xs font-bold py-2.5 px-4 rounded-full shadow-sm flex items-center justify-center gap-2 transition-all"
        >
          <Phone className="w-3.5 h-3.5 text-marigold-400" />
          <span>{t('contactWorker')}</span>
        </button>
      </div>
    </div>
  );
};
