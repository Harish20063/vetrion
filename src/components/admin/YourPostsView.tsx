import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../context/LanguageContext';
import { Job } from '../../types';
import { DeleteConfirmModal } from './DeleteConfirmModal';
import { 
  Users, 
  CheckCircle2, 
  XCircle, 
  Trash2, 
  Phone, 
  MessageSquare, 
  PlusCircle, 
  Clock, 
  MapPin, 
  ChevronDown, 
  ChevronUp 
} from 'lucide-react';

export const YourPostsView: React.FC = () => {
  const { jobs, applications, setAdminTab, toggleJobStatus, deleteJobPost } = useApp();
  const { language, t } = useLanguage();

  const [expandedJobId, setExpandedJobId] = useState<string | null>(null);
  const [jobToDelete, setJobToDelete] = useState<Job | null>(null);

  const myPosts = jobs.filter((j) => j.isUserPost || j.entityType === 'company');

  const toggleExpand = (jobId: string) => {
    setExpandedJobId((prev) => (prev === jobId ? null : jobId));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4 px-1">
        <h3 className="font-display font-bold text-lg text-indigo-950">
          {t('tabYourPosts')} ({myPosts.length})
        </h3>
        <button
          onClick={() => setAdminTab('post-job')}
          className="flex items-center gap-1.5 bg-indigo-900 hover:bg-indigo-800 text-white text-xs font-bold py-2 px-4 rounded-full shadow-sm transition-all"
        >
          <PlusCircle className="w-3.5 h-3.5 text-marigold-400" />
          <span>{t('tabPostJob')}</span>
        </button>
      </div>

      {myPosts.length === 0 ? (
        <div className="bg-white border border-dashed border-lilac-border rounded-card p-10 text-center my-4">
          <div className="w-14 h-16 rounded-t-[24px] rounded-b-[8px] bg-lilac-subtle border-2 border-dashed border-indigo-400 text-indigo-600 flex items-center justify-center mx-auto mb-3">
            <PlusCircle className="w-6 h-6" />
          </div>
          <h3 className="font-display font-bold text-lg text-indigo-950 mb-1">
            {language === 'ta' ? 'நீங்கள் இன்னும் எந்த வேலையும் பதிவிடவில்லை' : 'You haven’t posted any jobs yet'}
          </h3>
          <p className="text-xs text-text-muted max-w-sm mx-auto mb-4">
            {language === 'ta'
              ? 'புதிய வேலை விளம்பரத்தை பதிவிட்டு உடனடியாக ஆட்களை கண்டறியுங்கள்.'
              : 'Post your first opening to connect with qualified workers across Tamil Nadu.'}
          </p>
          <button
            onClick={() => setAdminTab('post-job')}
            className="bg-indigo-900 hover:bg-indigo-800 text-white text-xs font-bold py-2.5 px-6 rounded-full transition-all"
          >
            {t('tabPostJob')}
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {myPosts.map((post) => {
            const postApplicants = applications.filter((a) => a.jobId === post.id);
            const isActive = post.status === 'active';
            const isExpanded = expandedJobId === post.id;
            const payUnitText = post.payUnit === 'day' ? t('dayWageUnit') : t('monthSalaryUnit');

            return (
              <div
                key={post.id}
                className="bg-white border border-lilac-border rounded-card p-5 shadow-soft transition-all"
              >
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                  <div>
                    <h4 className="font-display font-bold text-base md:text-lg text-indigo-950">
                      {post.title}
                    </h4>
                    <div className="flex items-center flex-wrap gap-2 text-xs text-text-muted mt-1">
                      <span className="bg-lilac-subtle text-indigo-900 font-semibold px-2.5 py-0.5 rounded-full">
                        {t(post.entityType)}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-indigo-500" />
                        {post.locality}, {post.city}
                      </span>
                      <span>•</span>
                      <span className="font-bold text-indigo-900">
                        ₹{post.payAmount.toLocaleString('en-IN')} {payUnitText}
                      </span>
                    </div>
                  </div>

                  <span
                    className={`self-start text-[11px] font-bold px-3 py-1 rounded-full border ${
                      isActive
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : 'bg-gray-100 text-gray-600 border-gray-200'
                    }`}
                  >
                    {isActive ? t('active') : t('closed')}
                  </span>
                </div>

                <p className="text-text-muted text-xs md:text-sm line-clamp-2 leading-relaxed mb-4">
                  {post.desc}
                </p>

                {/* Actions row */}
                <div className="border-t border-dashed border-lilac-border pt-3.5 flex items-center flex-wrap gap-2 text-xs">
                  <button
                    onClick={() => toggleExpand(post.id)}
                    className="flex items-center gap-1.5 bg-lilac-subtle hover:bg-lilac-border text-indigo-950 font-bold px-3 py-1.5 rounded-full transition-all"
                  >
                    <Users className="w-3.5 h-3.5 text-indigo-600" />
                    <span>
                      {t('viewApplicants')} ({postApplicants.length})
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="w-3.5 h-3.5" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5" />
                    )}
                  </button>

                  <button
                    onClick={() => toggleJobStatus(post.id)}
                    className="flex items-center gap-1.5 bg-lilac-subtle hover:bg-lilac-border text-indigo-950 font-bold px-3 py-1.5 rounded-full transition-all"
                  >
                    {isActive ? (
                      <>
                        <XCircle className="w-3.5 h-3.5 text-amber-600" />
                        <span>{language === 'ta' ? 'முடிந்தது என மாற்று' : 'Mark as Closed'}</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{language === 'ta' ? 'மீண்டும் திறக்கவும்' : 'Reopen Job'}</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => setJobToDelete(post)}
                    className="flex items-center gap-1.5 bg-red-50 hover:bg-red-100 text-red-600 font-bold px-3 py-1.5 rounded-full transition-all sm:ml-auto"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>{language === 'ta' ? 'நீக்கு' : 'Remove'}</span>
                  </button>
                </div>

                {/* Expandable Applicants Drawer */}
                {isExpanded && (
                  <div className="mt-4 bg-lilac-bg border border-lilac-border rounded-2xl p-4 animate-fade-in">
                    <h5 className="font-display font-bold text-xs uppercase tracking-wider text-indigo-950 mb-3">
                      {t('viewApplicants')} ({postApplicants.length})
                    </h5>

                    {postApplicants.length === 0 ? (
                      <p className="text-xs text-text-light italic">
                        {language === 'ta'
                          ? 'இன்னும் யாரும் இந்த வேலைக்கு விண்ணப்பிக்கவில்லை.'
                          : 'No applicants have applied to this job yet.'}
                      </p>
                    ) : (
                      <div className="space-y-2">
                        {postApplicants.map((app) => {
                          const cleanPhone = app.workerPhone.replace(/[^0-9]/g, '');
                          const waMsg = encodeURIComponent(
                            language === 'ta'
                              ? `வணக்கம் ${app.workerName}, நீங்கள் Vetrion-ல் விண்ணப்பித்த "${post.title}" வேலை குறித்து பேசுகிறேன்.`
                              : `Hello ${app.workerName}, regarding your application for "${post.title}" on Vetrion.`
                          );

                          return (
                            <div
                              key={app.id}
                              className="bg-white border border-lilac-border rounded-xl p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs"
                            >
                              <div>
                                <div className="font-bold text-sm text-indigo-950">
                                  {app.workerName}
                                </div>
                                <div className="flex items-center gap-1 text-[11px] text-text-muted mt-0.5">
                                  <Clock className="w-3 h-3 text-text-light" />
                                  <span>{app.appliedAt}</span>
                                </div>
                              </div>

                              <div className="flex items-center gap-2">
                                <a
                                  href={`tel:${cleanPhone}`}
                                  className="flex items-center gap-1.5 bg-sky-50 text-sky-700 hover:bg-sky-100 border border-sky-200 px-3 py-1.5 rounded-full text-xs font-bold transition-colors"
                                >
                                  <Phone className="w-3 h-3" />
                                  <span>{language === 'ta' ? 'அழைக்க' : 'Call'}</span>
                                </a>

                                <a
                                  href={`https://wa.me/91${cleanPhone}?text=${waMsg}`}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="flex items-center gap-1.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 px-3 py-1.5 rounded-full text-xs font-bold transition-colors"
                                >
                                  <MessageSquare className="w-3 h-3" />
                                  <span>WhatsApp</span>
                                </a>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {jobToDelete && (
        <DeleteConfirmModal
          jobTitle={jobToDelete.title}
          isOpen={!!jobToDelete}
          onClose={() => setJobToDelete(null)}
          onConfirm={() => {
            deleteJobPost(jobToDelete.id);
            setJobToDelete(null);
          }}
        />
      )}
    </div>
  );
};
