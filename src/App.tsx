import React from 'react';
import { useApp } from './context/AppContext';
import { Header } from './components/layout/Header';
import { HeroBanner } from './components/layout/HeroBanner';
import { MobileBottomNav } from './components/layout/MobileBottomNav';
import { Footer } from './components/layout/Footer';
import { ToastContainer } from './components/common/ToastContainer';

// Worker Views
import { FindWorkView } from './components/worker/FindWorkView';
import { SavedJobsView } from './components/worker/SavedJobsView';
import { WorkerProfileView } from './components/worker/WorkerProfileView';

// Admin Views
import { FindWorkersView } from './components/admin/FindWorkersView';
import { PostJobView } from './components/admin/PostJobView';
import { YourPostsView } from './components/admin/YourPostsView';
import { AdminProfileView } from './components/admin/AdminProfileView';

export const App: React.FC = () => {
  const { role, workerTab, adminTab } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-lilac-bg text-indigo-950 font-sans selection:bg-marigold-100 selection:text-indigo-950">
      {/* Toast Notification Container */}
      <ToastContainer />

      {/* Main Header */}
      <Header />

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 pb-12">
        {/* Hero Banner with Doorway Arch Motif */}
        <HeroBanner />

        {/* Dynamic Route View */}
        <div className="animate-fade-in">
          {role === 'worker' ? (
            <>
              {workerTab === 'find-work' && <FindWorkView />}
              {workerTab === 'saved' && <SavedJobsView />}
              {workerTab === 'worker-profile' && <WorkerProfileView />}
            </>
          ) : (
            <>
              {adminTab === 'find-workers' && <FindWorkersView />}
              {adminTab === 'post-job' && <PostJobView />}
              {adminTab === 'your-posts' && <YourPostsView />}
              {adminTab === 'admin-profile' && <AdminProfileView />}
            </>
          )}
        </div>
      </main>

      {/* Mobile Sticky Bottom Nav */}
      <MobileBottomNav />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;
