import React from 'react';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../context/LanguageContext';
import { 
  Search, 
  Bookmark, 
  User, 
  Users, 
  PlusCircle, 
  ClipboardList, 
  Building 
} from 'lucide-react';

export const MobileBottomNav: React.FC = () => {
  const { 
    role, 
    workerTab, 
    setWorkerTab, 
    adminTab, 
    setAdminTab,
    savedJobIds,
    jobs 
  } = useApp();
  const { t } = useLanguage();

  const myPostsCount = jobs.filter((j) => j.isUserPost || j.entityType === 'company').length;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-lilac-border md:hidden shadow-lg">
      <div className="flex items-center justify-around py-2 px-2">
        {role === 'worker' ? (
          <>
            <button
              onClick={() => setWorkerTab('find-work')}
              className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all relative ${
                workerTab === 'find-work'
                  ? 'text-indigo-900 font-bold'
                  : 'text-text-muted font-medium'
              }`}
            >
              <Search className="w-5 h-5" />
              <span className="text-[11px]">{t('tabFindWork')}</span>
              {workerTab === 'find-work' && (
                <span className="w-5 h-1 bg-marigold-500 rounded-full absolute -top-2" />
              )}
            </button>

            <button
              onClick={() => setWorkerTab('saved')}
              className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all relative ${
                workerTab === 'saved'
                  ? 'text-indigo-900 font-bold'
                  : 'text-text-muted font-medium'
              }`}
            >
              <Bookmark className="w-5 h-5" />
              <span className="text-[11px]">{t('tabSaved')}</span>
              {savedJobIds.length > 0 && (
                <span className="absolute top-0 right-2 bg-marigold-500 text-indigo-950 text-[10px] font-bold px-1.5 rounded-full">
                  {savedJobIds.length}
                </span>
              )}
              {workerTab === 'saved' && (
                <span className="w-5 h-1 bg-marigold-500 rounded-full absolute -top-2" />
              )}
            </button>

            <button
              onClick={() => setWorkerTab('worker-profile')}
              className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all relative ${
                workerTab === 'worker-profile'
                  ? 'text-indigo-900 font-bold'
                  : 'text-text-muted font-medium'
              }`}
            >
              <User className="w-5 h-5" />
              <span className="text-[11px]">{t('tabWorkerProfile')}</span>
              {workerTab === 'worker-profile' && (
                <span className="w-5 h-1 bg-marigold-500 rounded-full absolute -top-2" />
              )}
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setAdminTab('find-workers')}
              className={`flex flex-col items-center gap-1 py-1 px-2 rounded-xl transition-all relative ${
                adminTab === 'find-workers'
                  ? 'text-indigo-900 font-bold'
                  : 'text-text-muted font-medium'
              }`}
            >
              <Users className="w-5 h-5" />
              <span className="text-[11px]">{t('tabFindWorkers')}</span>
              {adminTab === 'find-workers' && (
                <span className="w-5 h-1 bg-marigold-500 rounded-full absolute -top-2" />
              )}
            </button>

            <button
              onClick={() => setAdminTab('post-job')}
              className={`flex flex-col items-center gap-1 py-1 px-2 rounded-xl transition-all relative ${
                adminTab === 'post-job'
                  ? 'text-indigo-900 font-bold'
                  : 'text-text-muted font-medium'
              }`}
            >
              <PlusCircle className="w-5 h-5 text-indigo-600" />
              <span className="text-[11px]">{t('tabPostJob')}</span>
              {adminTab === 'post-job' && (
                <span className="w-5 h-1 bg-marigold-500 rounded-full absolute -top-2" />
              )}
            </button>

            <button
              onClick={() => setAdminTab('your-posts')}
              className={`flex flex-col items-center gap-1 py-1 px-2 rounded-xl transition-all relative ${
                adminTab === 'your-posts'
                  ? 'text-indigo-900 font-bold'
                  : 'text-text-muted font-medium'
              }`}
            >
              <ClipboardList className="w-5 h-5" />
              <span className="text-[11px]">{t('tabYourPosts')}</span>
              {myPostsCount > 0 && (
                <span className="absolute top-0 right-2 bg-marigold-500 text-indigo-950 text-[10px] font-bold px-1.5 rounded-full">
                  {myPostsCount}
                </span>
              )}
              {adminTab === 'your-posts' && (
                <span className="w-5 h-1 bg-marigold-500 rounded-full absolute -top-2" />
              )}
            </button>

            <button
              onClick={() => setAdminTab('admin-profile')}
              className={`flex flex-col items-center gap-1 py-1 px-2 rounded-xl transition-all relative ${
                adminTab === 'admin-profile'
                  ? 'text-indigo-900 font-bold'
                  : 'text-text-muted font-medium'
              }`}
            >
              <Building className="w-5 h-5" />
              <span className="text-[11px]">{t('tabAdminProfile')}</span>
              {adminTab === 'admin-profile' && (
                <span className="w-5 h-1 bg-marigold-500 rounded-full absolute -top-2" />
              )}
            </button>
          </>
        )}
      </div>
    </nav>
  );
};
