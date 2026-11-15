import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../context/LanguageContext';
import { Job, City, HiringEntity, PayUnit } from '../../types';
import { JobCard } from './JobCard';
import { ApplyModal } from './ApplyModal';
import { CATEGORIES } from '../../data/categories';
import { Search, MapPin, Building, Banknote, RotateCcw, Briefcase, X } from 'lucide-react';

export const FindWorkView: React.FC = () => {
  const { jobs } = useApp();
  const { language, t } = useLanguage();

  const [search, setSearch] = useState('');
  const [selectedCity, setSelectedCity] = useState<string>('all');
  const [selectedEntity, setSelectedEntity] = useState<string>('all');
  const [selectedPayType, setSelectedPayType] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const [selectedJobForApply, setSelectedJobForApply] = useState<Job | null>(null);

  const cities: City[] = ['Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem', 'Tirunelveli'];

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      // Search
      if (search.trim()) {
        const q = search.toLowerCase();
        const matchTitle = job.title.toLowerCase().includes(q);
        const matchLoc = job.locality.toLowerCase().includes(q);
        const matchCity = job.city.toLowerCase().includes(q);
        const matchDesc = job.desc.toLowerCase().includes(q);
        const matchType = job.workType.toLowerCase().includes(q);
        if (!matchTitle && !matchLoc && !matchCity && !matchDesc && !matchType) return false;
      }

      // City
      if (selectedCity !== 'all' && job.city !== selectedCity) return false;

      // Entity
      if (selectedEntity !== 'all' && job.entityType !== (selectedEntity as HiringEntity)) return false;

      // Pay Type
      if (selectedPayType !== 'all' && job.payUnit !== (selectedPayType as PayUnit)) return false;

      // Category
      if (selectedCategory !== 'all' && job.workType !== selectedCategory) return false;

      return true;
    });
  }, [jobs, search, selectedCity, selectedEntity, selectedPayType, selectedCategory]);

  const resetFilters = () => {
    setSearch('');
    setSelectedCity('all');
    setSelectedEntity('all');
    setSelectedPayType('all');
    setSelectedCategory('all');
  };

  const hasActiveFilters =
    search.trim() !== '' ||
    selectedCity !== 'all' ||
    selectedEntity !== 'all' ||
    selectedPayType !== 'all' ||
    selectedCategory !== 'all';

  return (
    <div>
      {/* Search & Filter Card */}
      <section className="bg-white border border-lilac-border rounded-card p-4 md:p-5 shadow-soft mb-6">
        {/* Pill Search */}
        <div className="flex items-center bg-lilac-subtle border border-lilac-border focus-within:border-indigo-600 focus-within:bg-white focus-within:ring-2 focus-within:ring-indigo-600/10 rounded-full px-4 py-1.5 transition-all">
          <Search className="w-4 h-4 text-indigo-700 mr-2.5 shrink-0" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t('searchPlaceholderJobs')}
            className="w-full bg-transparent border-none outline-none text-sm font-medium text-indigo-950 placeholder:text-text-light py-1.5"
          />
          {search && (
            <button onClick={() => setSearch('')} className="text-text-light hover:text-indigo-900 p-1">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filter Dropdowns */}
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

          {/* Hiring Entity */}
          <div className="relative">
            <Building className="w-4 h-4 text-indigo-700 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <select
              value={selectedEntity}
              onChange={(e) => setSelectedEntity(e.target.value)}
              className="w-full bg-lilac-bg border border-lilac-border rounded-full pl-9 pr-8 py-2 text-xs font-semibold text-indigo-950 appearance-none outline-none focus:border-indigo-600 focus:bg-white cursor-pointer"
            >
              <option value="all">{t('allHiring')}</option>
              <option value="household">{t('household')}</option>
              <option value="shop">{t('shop')}</option>
              <option value="company">{t('company')}</option>
              <option value="contractor">{t('contractor')}</option>
              <option value="farm">{t('farm')}</option>
            </select>
          </div>

          {/* Pay Type */}
          <div className="relative">
            <Banknote className="w-4 h-4 text-indigo-700 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <select
              value={selectedPayType}
              onChange={(e) => setSelectedPayType(e.target.value)}
              className="w-full bg-lilac-bg border border-lilac-border rounded-full pl-9 pr-8 py-2 text-xs font-semibold text-indigo-950 appearance-none outline-none focus:border-indigo-600 focus:bg-white cursor-pointer"
            >
              <option value="all">{t('allPay')}</option>
              <option value="day">{t('dailyWage')}</option>
              <option value="month">{t('monthlySalary')}</option>
            </select>
          </div>
        </div>

        {/* Category Chips Carousel */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pt-3.5 pb-1">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all border ${
                  isSelected
                    ? 'bg-indigo-900 border-indigo-900 text-white shadow-sm'
                    : 'bg-lilac-subtle border-lilac-border text-text-muted hover:border-indigo-200 hover:text-indigo-900'
                }`}
              >
                {language === 'ta' ? cat.labelTa : cat.labelEn}
              </button>
            );
          })}
        </div>
      </section>

      {/* Results Bar */}
      <div className="flex items-center justify-between mb-4 px-1">
        <span className="text-xs md:text-sm font-semibold text-text-muted">
          {filteredJobs.length} {language === 'ta' ? 'வேலைகள் உள்ளன' : 'Jobs Available'}
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
      {filteredJobs.length === 0 ? (
        <div className="bg-white border border-dashed border-lilac-border rounded-card p-10 text-center my-4">
          <div className="w-14 h-16 rounded-t-[24px] rounded-b-[8px] bg-lilac-subtle border-2 border-dashed border-indigo-400 text-indigo-600 flex items-center justify-center mx-auto mb-3">
            <Briefcase className="w-6 h-6" />
          </div>
          <h3 className="font-display font-bold text-lg text-indigo-950 mb-1">{t('noJobsFound')}</h3>
          <p className="text-xs text-text-muted max-w-sm mx-auto mb-4">{t('tryAdjusting')}</p>
          <button
            onClick={resetFilters}
            className="bg-indigo-900 hover:bg-indigo-800 text-white text-xs font-bold py-2 px-5 rounded-full transition-all"
          >
            {language === 'ta' ? 'அனைத்து வேலைகளையும் பார்க்க' : 'View All Jobs'}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredJobs.map((job) => (
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
