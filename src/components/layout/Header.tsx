import React from 'react';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../context/LanguageContext';
import { DoorwayArchLogo } from '../common/DoorwayArch';
import { 
  HardHat, 
  UserCheck, 
  Globe, 
  Search, 
  Bookmark, 
  User, 
  Users, 
  PlusCircle, 
  ClipboardList, 
  Building 
} from 'lucide-react';

export const Header: React.FC = () => {
  const { 
    role, 
    setRole, 
    workerTab, 
    setWorkerTab, 
    adminTab, 
    setAdminTab,
    savedJobIds,
    jobs 
  } = useApp();
  const { language, toggleLanguage, t } = useLanguage();

  const myPostsCount = jobs.filter((j) => j.isUserPost || j.entityType === 'company').length;

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-lilac-border shadow-xs">
      <div className="max-w-6xl mx-auto px-4">
        {/* Top bar */}
        <div className="flex items-center justify-between py-3 gap-2">
          {/* Brand */}
          <div 
            className="flex items-center gap-3 cursor-pointer select-none"
            onClick={() => {
              if (role === 'worker') setWorkerTab('find-work');
              else setAdminTab('find-workers');
            }}
          >
            <DoorwayArchLogo />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-extrabold text-xl tracking-tight text-indigo-950">
                  Vetrion
                </span>
                <span className="font-bold text-base text-marigold-600">
                  வெற்றி
                </span>
              </div>
              <p className="text-[11px] text-text-muted font-medium hidden sm:block">
                {t('tagline')}
              </p>
            </div>
          </div>

          {/* Role switcher & Language */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Pill role toggle */}
            <div className="flex bg-lilac-subtle border border-lilac-border p-1 rounded-full shadow-inner">
              <button
                onClick={() => setRole('worker')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                  role === 'worker'
                    ? 'bg-indigo-900 text-white shadow-md'
                    : 'text-text-muted hover:text-indigo-900'
                }`}
              >
                <HardHat className="w-3.5 h-3.5" />
                <span>{t('roleWorker')}</span>
              </button>

              <button
                onClick={() => setRole('admin')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                  role === 'admin'
                    ? 'bg-indigo-900 text-white shadow-md'
                    : 'text-text-muted hover:text-indigo-900'
                }`}
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span>{t('roleAdmin')}</span>
              </button>
            </div>

            {/* Language toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-lilac-border hover:border-indigo-600 rounded-full text-xs sm:text-sm font-semibold text-indigo-900 shadow-xs hover:bg-indigo-50 transition-all"
            >
              <Globe className="w-3.5 h-3.5 text-indigo-600" />
              <span>{language === 'en' ? 'தமிழ்' : 'English'}</span>
            </button>
          </div>
        </div>

        {/* Desktop Tab Navigation */}
        <div className="hidden md:flex border-t border-lilac-border py-1 gap-2">
          {role === 'worker' ? (
            <>
              <button
                onClick={() => setWorkerTab('find-work')}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  workerTab === 'find-work'
                    ? 'bg-indigo-50 text-indigo-900 border border-indigo-100 shadow-xs'
                    : 'text-text-muted hover:bg-lilac-subtle hover:text-indigo-900'
                }`}
              >
                <Search className="w-4 h-4" />
                <span>{t('tabFindWork')}</span>
              </button>

              <button
                onClick={() => setWorkerTab('saved')}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  workerTab === 'saved'
                    ? 'bg-indigo-50 text-indigo-900 border border-indigo-100 shadow-xs'
                    : 'text-text-muted hover:bg-lilac-subtle hover:text-indigo-900'
                }`}
              >
                <Bookmark className="w-4 h-4" />
                <span>{t('tabSaved')}</span>
                {savedJobIds.length > 0 && (
                  <span className="bg-marigold-500 text-indigo-950 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {savedJobIds.length}
                  </span>
                )}
              </button>

              <button
                onClick={() => setWorkerTab('worker-profile')}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  workerTab === 'worker-profile'
                    ? 'bg-indigo-50 text-indigo-900 border border-indigo-100 shadow-xs'
                    : 'text-text-muted hover:bg-lilac-subtle hover:text-indigo-900'
                }`}
              >
                <User className="w-4 h-4" />
                <span>{t('tabWorkerProfile')}</span>
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setAdminTab('find-workers')}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  adminTab === 'find-workers'
                    ? 'bg-indigo-50 text-indigo-900 border border-indigo-100 shadow-xs'
                    : 'text-text-muted hover:bg-lilac-subtle hover:text-indigo-900'
                }`}
              >
                <Users className="w-4 h-4" />
                <span>{t('tabFindWorkers')}</span>
              </button>

              <button
                onClick={() => setAdminTab('post-job')}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  adminTab === 'post-job'
                    ? 'bg-indigo-50 text-indigo-900 border border-indigo-100 shadow-xs'
                    : 'text-text-muted hover:bg-lilac-subtle hover:text-indigo-900'
                }`}
              >
                <PlusCircle className="w-4 h-4" />
                <span>{t('tabPostJob')}</span>
              </button>

              <button
                onClick={() => setAdminTab('your-posts')}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  adminTab === 'your-posts'
                    ? 'bg-indigo-50 text-indigo-900 border border-indigo-100 shadow-xs'
                    : 'text-text-muted hover:bg-lilac-subtle hover:text-indigo-900'
                }`}
              >
                <ClipboardList className="w-4 h-4" />
                <span>{t('tabYourPosts')}</span>
                {myPostsCount > 0 && (
                  <span className="bg-marigold-500 text-indigo-950 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {myPostsCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setAdminTab('admin-profile')}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  adminTab === 'admin-profile'
                    ? 'bg-indigo-50 text-indigo-900 border border-indigo-100 shadow-xs'
                    : 'text-text-muted hover:bg-lilac-subtle hover:text-indigo-900'
                }`}
              >
                <Building className="w-4 h-4" />
                <span>{t('tabAdminProfile')}</span>
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
