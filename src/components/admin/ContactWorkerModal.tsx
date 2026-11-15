import React from 'react';
import { Worker } from '../../types';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../context/LanguageContext';
import { Modal } from '../common/Modal';
import { DoorwayArchAvatar } from '../common/DoorwayArch';
import { Phone, MessageSquare, Copy, MapPin } from 'lucide-react';

interface ContactWorkerModalProps {
  worker: Worker | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ContactWorkerModal: React.FC<ContactWorkerModalProps> = ({ worker, isOpen, onClose }) => {
  const { showToast } = useApp();
  const { language, t } = useLanguage();

  if (!worker) return null;

  const initials = worker.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const cleanPhone = worker.phone.replace(/[^0-9]/g, '');
  const whatsappMsg = encodeURIComponent(
    language === 'ta'
      ? `வணக்கம் ${worker.name}, நான் Vetrion தளத்தில் உங்கள் சுயவிவரத்தைப் பார்த்தேன். வேலை தொடர்பாக பேசலாமா?`
      : `Hello ${worker.name}, I found your profile on Vetrion. We have work opportunities for you.`
  );

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(worker.phone);
    showToast(language === 'ta' ? `எண் நகலெடுக்கப்பட்டது: ${worker.phone}` : `Copied: ${worker.phone}`);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t('contactWorker')}>
      <div className="text-center py-2">
        <DoorwayArchAvatar initials={initials} size="lg" className="mx-auto mb-3" />

        <h4 className="font-display font-bold text-lg text-indigo-950 mb-0.5">{worker.name}</h4>
        <div className="text-xs font-semibold text-indigo-600 mb-1">{worker.headline}</div>
        <div className="flex items-center justify-center gap-1 text-xs text-text-muted mb-4">
          <MapPin className="w-3.5 h-3.5 text-indigo-500" />
          <span>{worker.locality}, {worker.city}</span>
        </div>

        <div className="bg-lilac-bg border border-lilac-border rounded-2xl p-4 mb-5">
          <div className="text-[11px] font-bold uppercase tracking-wider text-marigold-600 mb-1">
            {language === 'ta' ? 'தொழிலாளி எண் (Demo)' : 'Worker Phone (Demo)'}
          </div>
          <div className="font-display font-extrabold text-2xl text-indigo-950 tracking-wider my-2">
            {worker.phone}
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
          onClick={onClose}
          className="w-full bg-lilac-subtle hover:bg-lilac-border text-indigo-950 font-bold py-2.5 px-6 rounded-full text-xs transition-colors"
        >
          {language === 'ta' ? 'மூடு' : 'Close'}
        </button>
      </div>
    </Modal>
  );
};
