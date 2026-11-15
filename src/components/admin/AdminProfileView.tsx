import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../context/LanguageContext';
import { HiringEntity, City, AdminProfile } from '../../types';
import { Building, Save } from 'lucide-react';

export const AdminProfileView: React.FC = () => {
  const { adminProfile, saveAdminProfile } = useApp();
  const { language, t } = useLanguage();

  const cities: City[] = ['Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem', 'Tirunelveli'];

  const [name, setName] = useState(adminProfile?.name || '');
  const [entityType, setEntityType] = useState<HiringEntity>(adminProfile?.entityType || 'household');
  const [phone, setPhone] = useState(adminProfile?.phone || '');
  const [city, setCity] = useState<City>(adminProfile?.city || 'Chennai');
  const [locality, setLocality] = useState(adminProfile?.locality || '');
  const [about, setAbout] = useState(adminProfile?.about || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const updated: AdminProfile = {
      name: name.trim(),
      entityType,
      phone: phone.trim(),
      city,
      locality: locality.trim(),
      about: about.trim()
    };

    saveAdminProfile(updated);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white border border-lilac-border rounded-card p-6 md:p-8 shadow-soft">
        {/* Header */}
        <div className="border-b border-lilac-border pb-5 mb-6">
          <div className="flex items-center gap-2.5 text-indigo-950 font-display font-bold text-xl">
            <Building className="w-6 h-6 text-marigold-500" />
            <h3>{t('tabAdminProfile')}</h3>
          </div>
          <p className="text-xs text-text-muted mt-1">
            {language === 'ta'
              ? 'இந்த விவரங்கள் நீங்கள் புதிய வேலை பதிவிடும் போது தானாகவே நிரப்பப்படும்.'
              : 'Your business or household profile details will automatically pre-fill your future job postings.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-indigo-950 mb-1.5">
                {language === 'ta' ? 'உங்கள் பெயர் அல்லது நிறுவன பெயர்' : 'Your Name / Business Name'}{' '}
                <span className="text-marigold-600">*</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Vasantham Supermarket / S. Murugesan"
                className="w-full px-4 py-2.5 rounded-xl border border-lilac-border bg-lilac-bg focus:bg-white focus:border-indigo-600 outline-none text-sm font-medium transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-indigo-950 mb-1.5">
                {language === 'ta' ? 'வகை' : 'Entity Type'} <span className="text-marigold-600">*</span>
              </label>
              <select
                value={entityType}
                onChange={(e) => setEntityType(e.target.value as HiringEntity)}
                className="w-full px-4 py-2.5 rounded-xl border border-lilac-border bg-lilac-bg focus:bg-white focus:border-indigo-600 outline-none text-sm font-semibold text-indigo-950 cursor-pointer"
              >
                <option value="household">{t('household')}</option>
                <option value="shop">{t('shop')}</option>
                <option value="company">{t('company')}</option>
                <option value="contractor">{t('contractor')}</option>
                <option value="farm">{t('farm')}</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-indigo-950 mb-1.5">
                {language === 'ta' ? 'தொடர்பு தொலைபேசி எண்' : 'Contact Phone'}{' '}
                <span className="text-marigold-600">*</span>
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. 98421 98765"
                className="w-full px-4 py-2.5 rounded-xl border border-lilac-border bg-lilac-bg focus:bg-white focus:border-indigo-600 outline-none text-sm font-medium transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-indigo-950 mb-1.5">
                {language === 'ta' ? 'மாவட்டம் / ஊர்' : 'City'} <span className="text-marigold-600">*</span>
              </label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value as City)}
                className="w-full px-4 py-2.5 rounded-xl border border-lilac-border bg-lilac-bg focus:bg-white focus:border-indigo-600 outline-none text-sm font-semibold text-indigo-950 cursor-pointer"
              >
                {cities.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-indigo-950 mb-1.5">
                {language === 'ta' ? 'பகுதி / ஏரியா' : 'Area / Locality'}{' '}
                <span className="text-marigold-600">*</span>
              </label>
              <input
                type="text"
                required
                value={locality}
                onChange={(e) => setLocality(e.target.value)}
                placeholder="e.g. Gandhipuram"
                className="w-full px-4 py-2.5 rounded-xl border border-lilac-border bg-lilac-bg focus:bg-white focus:border-indigo-600 outline-none text-sm font-medium transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-indigo-950 mb-1.5">
              {language === 'ta'
                ? 'நிறுவனம் அல்லது பணி பற்றிய குறிப்பு'
                : 'About Your Business / Household'}
            </label>
            <textarea
              rows={3}
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              placeholder="Short description of your business, store, or household requirements..."
              className="w-full px-4 py-2.5 rounded-xl border border-lilac-border bg-lilac-bg focus:bg-white focus:border-indigo-600 outline-none text-sm font-medium transition-all resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-4 bg-indigo-900 hover:bg-indigo-800 text-white font-bold py-3 px-6 rounded-full text-sm shadow-md shadow-indigo-900/20 flex items-center justify-center gap-2 transition-all"
          >
            <Save className="w-4 h-4 text-marigold-400" />
            <span>{language === 'ta' ? 'நிர்வாகி விவரத்தை சேமி' : 'Save Admin Profile'}</span>
          </button>
        </form>
      </div>
    </div>
  );
};
