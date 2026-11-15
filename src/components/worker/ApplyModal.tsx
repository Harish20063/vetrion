import React, { useState } from 'react';
import { Job } from '../../types';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../context/LanguageContext';
import { Modal } from '../common/Modal';
import { Phone, MessageSquare, Copy, CheckCircle2, Send, MapPin } from 'lucide-react';

interface ApplyModalProps {
  job: Job | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ApplyModal: React.FC<ApplyModalProps> = ({ job, isOpen, onClose }) => {
  const { workerProfile, applyToJob, showToast } = useApp();
  const { language, t } = useLanguage();

  const [workerName, setWorkerName] = useState(workerProfile?.name || '');
  const [workerPhone, setWorkerPhone] = useState(workerProfile?.phone || '');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!job) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!workerName.trim() || !workerPhone.trim()) return;

    applyToJob(job.id, workerName.trim(), workerPhone.trim());
    setIsSubmitted(true);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(job.phone);
    showToast(language === 'ta' ? `எண் நகலெடுக்கப்பட்டது: ${job.phone}` : `Copied: ${job.phone}`);
  };

  const cleanPhone = job.phone.replace(/[^0-9]/g, '');
  const whatsappMsg = encodeURIComponent(
    language === 'ta'
      ? `வணக்கம், நான் Vetrion தளத்தில் உங்கள் "${job.title}" வேலை விளம்பரத்தைப் பார்த்தேன். எனது பெயர் ${workerName}.`
      : `Hello, I saw your job post for "${job.title}" on Vetrion. My name is ${workerName}.`
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        setIsSubmitted(false);
        onClose();
      }}
      title={isSubmitted ? (language === 'ta' ? 'விண்ணப்பம் அனுப்பப்பட்டது!' : 'Application Submitted!') : t('applyNow')}
    >
      {!isSubmitted ? (
        <div>
          {/* Target Job Info */}
          <div className="bg-lilac-subtle rounded-2xl p-4 mb-5 border border-lilac-border">
            <h4 className="font-display font-bold text-base text-indigo-950 mb-1">{job.title}</h4>
            <div className="flex items-center gap-2 text-xs text-text-muted">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-indigo-500" />
                {job.locality}, {job.city}
              </span>
              <span>•</span>
              <span className="font-bold text-indigo-900">
                ₹{job.payAmount.toLocaleString('en-IN')} {job.payUnit === 'day' ? t('dayWageUnit') : t('monthSalaryUnit')}
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-indigo-950 mb-1.5">
                {language === 'ta' ? 'உங்கள் பெயர்' : 'Your Full Name'} <span className="text-marigold-600">*</span>
              </label>
              <input
                type="text"
                required
                value={workerName}
                onChange={(e) => setWorkerName(e.target.value)}
                placeholder="e.g. S. Murugesan"
                className="w-full px-4 py-2.5 rounded-xl border border-lilac-border bg-lilac-bg focus:bg-white focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/10 outline-none text-sm font-medium transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-indigo-950 mb-1.5">
                {language === 'ta' ? 'தொலைபேசி எண்' : 'Phone Number'} <span className="text-marigold-600">*</span>
              </label>
              <input
                type="tel"
                required
                value={workerPhone}
                onChange={(e) => setWorkerPhone(e.target.value)}
                placeholder="e.g. 98421 98765"
                className="w-full px-4 py-2.5 rounded-xl border border-lilac-border bg-lilac-bg focus:bg-white focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/10 outline-none text-sm font-medium transition-all"
              />
              <p className="text-[11px] text-text-light mt-1">
                {language === 'ta' ? 'முதலாளி உங்களை இந்த எண்ணில் அழைப்பார்.' : 'The employer will use this number to contact you.'}
              </p>
            </div>

            <button
              type="submit"
              className="w-full mt-2 bg-indigo-900 hover:bg-indigo-800 text-white font-bold py-3 px-6 rounded-full text-sm shadow-md shadow-indigo-900/20 flex items-center justify-center gap-2 transition-all"
            >
              <Send className="w-4 h-4 text-marigold-400" />
              <span>{language === 'ta' ? 'விண்ணப்பித்து முதலாளி எண்ணை பார்க்க' : 'Apply & Reveal Contact'}</span>
            </button>
          </form>
        </div>
      ) : (
        <div className="text-center py-2">
          <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <h4 className="font-display font-bold text-lg text-indigo-950 mb-1">
            {language === 'ta' ? 'முதலாளியின் நேரடி தொடர்பு விவரம்' : 'Employer Direct Contact'}
          </h4>
          <p className="text-xs text-text-muted mb-4">{job.postedBy || 'Direct Employer'}</p>

          <div className="bg-lilac-bg border border-lilac-border rounded-2xl p-4 mb-5">
            <div className="text-[11px] font-bold uppercase tracking-wider text-marigold-600 mb-1">
              {language === 'ta' ? 'தொலைபேசி எண் (Demo)' : 'Verified Phone (Demo)'}
            </div>
            <div className="font-display font-extrabold text-2xl text-indigo-950 tracking-wider my-2">
              {job.phone}
            </div>

            <div className="grid grid-cols-3 gap-2 mt-4">
              <a
                href={`tel:${cleanPhone}`}
                className="flex flex-col items-center gap-1 p-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm"
              >
                <Phone className="w-4 h-4" />
                <span>{language === 'ta' ? 'அழைக்க' : 'Call Now'}</span>
              </a>

              <a
                href={`https://wa.me/91${cleanPhone}?text=${whatsappMsg}`}
                target="_blank"
                rel="noreferrer"
                className="flex flex-col items-center gap-1 p-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={handleCopyPhone}
                className="flex flex-col items-center gap-1 p-2.5 bg-indigo-900 hover:bg-indigo-800 text-white rounded-xl text-xs font-bold transition-all shadow-sm"
              >
                <Copy className="w-4 h-4" />
                <span>{language === 'ta' ? 'நகலெடு' : 'Copy'}</span>
              </button>
            </div>
          </div>

          <button
            onClick={() => {
              setIsSubmitted(false);
              onClose();
            }}
            className="w-full bg-lilac-subtle hover:bg-lilac-border text-indigo-950 font-bold py-2.5 px-6 rounded-full text-xs transition-colors"
          >
            {language === 'ta' ? 'சரி (முடிந்தது)' : 'Done'}
          </button>
        </div>
      )}
    </Modal>
  );
};
