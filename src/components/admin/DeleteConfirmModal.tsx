import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Modal } from '../common/Modal';
import { Trash2 } from 'lucide-react';

interface DeleteConfirmModalProps {
  jobTitle: string;
  isOpen: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

export const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  jobTitle,
  isOpen,
  onConfirm,
  onClose
}) => {
  const { language } = useLanguage();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={language === 'ta' ? 'வேலையை நீக்குவதா?' : 'Delete Job Post?'}
      headerBg="bg-red-600"
    >
      <div className="py-1">
        <p className="text-sm text-indigo-950 mb-6 leading-relaxed">
          {language === 'ta' ? (
            <>
              நீங்கள் <strong>"{jobTitle}"</strong> விளம்பரத்தை நிரந்தரமாக நீக்க விரும்புகிறீர்களா? இந்த செயலை மீண்டும் மாற்ற முடியாது.
            </>
          ) : (
            <>
              Are you sure you want to permanently delete <strong>"{jobTitle}"</strong>? This action cannot be undone.
            </>
          )}
        </p>

        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-full text-xs font-semibold text-text-muted hover:bg-lilac-subtle transition-colors"
          >
            {language === 'ta' ? 'ரத்து செய்' : 'Cancel'}
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="flex items-center gap-1.5 px-5 py-2 rounded-full text-xs font-bold bg-red-600 hover:bg-red-700 text-white shadow-sm transition-all"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>{language === 'ta' ? 'ஆம், நீக்கு' : 'Yes, Delete'}</span>
          </button>
        </div>
      </div>
    </Modal>
  );
};
