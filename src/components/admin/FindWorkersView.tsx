import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../context/LanguageContext';
import { Worker, City, Availability } from '../../types';
import { WorkerCard } from './WorkerCard';
import { ContactWorkerModal } from './ContactWorkerModal';
import { Search, MapPin, UserCheck, Briefcase, RotateCcw, Users, X } from 'lucide-react';

export const FindWorkersView: React.FC = () => {
  const { workers } = useApp();
  const { language, t } = useLanguage();

  const [search, setSearch] = useState('');
  const [selectedCity, setSelectedCity] = useState<string>('all');
  const [selectedAvailability, setSelectedAvailability] = useState<string>('all');
  const [selectedWorkType, setSelectedWorkType] = useState<string>('all');

  const [selectedWorkerForContact, setSelectedWorkerForContact] = useState<Worker | null>(null);

  const cities: City[] = ['Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem', 'Tirunelveli'];

  const filteredWorkers = useMemo(() => {
    return workers.filter((worker) => {
      // Search
      if (search.trim()) {
        const q = search.toLowerCase();
        const matchName = worker.name.toLowerCase().includes(q);
        const matchHead = worker.headline.toLowerCase().includes(q);
        const matchLoc = worker.locality.toLowerCase().includes(q);
        const matchCity = worker.city.toLowerCase().includes(q);
        const matchSkills = worker.skills.some((s) => s.toLowerCase().includes(q));
        if (!matchName && !matchHead && !matchLoc && !matchCity && !matchSkills) return false;
      }

      // City
      if (selectedCity !== 'all' && worker.city !== selectedCity) return false;

      // Availability
      if (selectedAvailability !== 'all' && worker.availability !== (selectedAvailability as Availability)) {
        return false;
      }

      // Work type / skill
      if (selectedWorkType !== 'all') {
        const hasSkill = worker.skills.some((s) =>
          s.toLowerCase().includes(selectedWorkType.toLowerCase())
        );
        if (!hasSkill) return false;
      }

      return true;
    });
  }, [workers, search, selectedCity, selectedAvailability, selectedWorkType]);

  const resetFilters = () => {
    setSearch('');
    setSelectedCity('all');
    setSelectedAvailability('all');
    setSelectedWorkType('all');
  };

  const hasActiveFilters =
    search.trim() !== '' ||
    selectedCity !== 'all' ||
    selectedAvailability !== 'all' ||
    selectedWorkType !== 'all';

  return (
    <div>
      {/* Search & Filter Card */}
      <section className="bg-white border border-lilac-border rounded-card p-4 md:p-5 shadow-soft mb-6">
        {/* Search */}
        <div className="flex items-center bg-lilac-subtle border border-lilac-border focus-within:border-indigo-600 focus-within:bg-white focus-within:ring-2 focus-within:ring-indigo-600/10 rounded-full px-4 py-1.5 transition-all">
          <Search className="w-4 h-4 text-indigo-700 mr-2.5 shrink-0" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t('searchPlaceholderWorkers')}
            className="w-full bg-transparent border-none outline-none text-sm font-medium text-indigo-950 placeholder:text-text-light py-1.5"
          />
          {search && (
            <button onClick={() => setSearch('')} className="text-text-light hover:text-indigo-900 p-1">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Dropdowns */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3.5">
          {/* City */}
          <div className="relative">
            <MapPin className="w-4 h-4 text-indigo-700 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full bg-lilac-bg border border-lilac-border rounded-full pl-9 pr-8 py-2 text-xs font-semibold text-indigo-950 appearance-none outline-none focus:border-indigo-600 focus:bg-white cursor-pointer"
            >
              <option value="all">{t('allCities')}</option>
              {cities.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Availability */}
          <div className="relative">
            <UserCheck className="w-4 h-4 text-indigo-700 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <select
              value={selectedAvailability}
              onChange={(e) => setSelectedAvailability(e.target.value)}
              className="w-full bg-lilac-bg border border-lilac-border rounded-full pl-9 pr-8 py-2 text-xs font-semibold text-indigo-950 appearance-none outline-none focus:border-indigo-600 focus:bg-white cursor-pointer"
            >
              <option value="all">{t('allAvailability')}</option>
              <option value="available">{t('availableNow')}</option>
              <option value="within-week">{t('withinWeek')}</option>
            </select>
          </div>

          {/* Work Type Skill */}
          <div className="relative">
            <Briefcase className="w-4 h-4 text-indigo-700 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <select
              value={selectedWorkType}
              onChange={(e) => setSelectedWorkType(e.target.value)}
              className="w-full bg-lilac-bg border border-lilac-border rounded-full pl-9 pr-8 py-2 text-xs font-semibold text-indigo-950 appearance-none outline-none focus:border-indigo-600 focus:bg-white cursor-pointer"
            >
              <option value="all">{language === 'ta' ? 'அனைத்து தொழில்கள்' : 'All Work Types'}</option>
              <option value="Construction">Construction / கொத்தனார்</option>
              <option value="Wiring">Electrician / எலக்ட்ரீசியன்</option>
              <option value="Plumbing">Plumber / பிளம்பர்</option>
              <option value="Cooking">Cook / சமையல் கலைஞர்</option>
              <option value="Driver">Driver / டிரைவர்</option>
              <option value="Tailor">Tailoring / தையல்</option>
              <option value="Care">Caregiver / பராமரிப்பு</option>
              <option value="Gardening">Gardener / தோட்டம்</option>
            </select>
          </div>
        </div>
      </section>

      {/* Results Bar */}
      <div className="flex items-center justify-between mb-4 px-1">
        <span className="text-xs md:text-sm font-semibold text-text-muted">
          {filteredWorkers.length} {language === 'ta' ? 'தொழிலாளர்கள் தயாராக உள்ளனர்' : 'Workers Available to Hire'}
        </span>
        {hasActiveFilters && (
          <button
            onClick={resetFilters}
            className="flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-900 transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span>{language === 'ta' ? 'வடிகட்டிகளை நீக்கு' : 'Reset Filters'}</span>
          </button>
        )}
      </div>

      {/* Grid or Empty */}
      {filteredWorkers.length === 0 ? (
        <div className="bg-white border border-dashed border-lilac-border rounded-card p-10 text-center my-4">
          <div className="w-14 h-16 rounded-t-[24px] rounded-b-[8px] bg-lilac-subtle border-2 border-dashed border-indigo-400 text-indigo-600 flex items-center justify-center mx-auto mb-3">
            <Users className="w-6 h-6" />
          </div>
          <h3 className="font-display font-bold text-lg text-indigo-950 mb-1">{t('noWorkersFound')}</h3>
          <p className="text-xs text-text-muted max-w-sm mx-auto mb-4">{t('tryAdjusting')}</p>
          <button
            onClick={resetFilters}
            className="bg-indigo-900 hover:bg-indigo-800 text-white text-xs font-bold py-2 px-5 rounded-full transition-all"
          >
            {language === 'ta' ? 'அனைத்து தொழிலாளர்களையும் பார்க்க' : 'View All Workers'}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredWorkers.map((worker) => (
            <WorkerCard
              key={worker.id}
              worker={worker}
              onContact={(w) => setSelectedWorkerForContact(w)}
            />
          ))}
        </div>
      )}

      {/* Contact Worker Modal */}
      <ContactWorkerModal
        worker={selectedWorkerForContact}
        isOpen={!!selectedWorkerForContact}
        onClose={() => setSelectedWorkerForContact(null)}
      />
    </div>
  );
};
