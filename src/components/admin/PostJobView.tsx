import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../context/LanguageContext';
import { HiringEntity, City, PayUnit } from '../../types';
import { PlusCircle, Megaphone } from 'lucide-react';

export const PostJobView: React.FC = () => {
  const { adminProfile, createJobPost } = useApp();
  const { language, t } = useLanguage();

  const cities: City[] = ['Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem', 'Tirunelveli'];

  const [title, setTitle] = useState('');
  const [entityType, setEntityType] = useState<HiringEntity>(adminProfile?.entityType || 'household');
  const [workType, setWorkType] = useState('Construction');
  const [customOtherType, setCustomOtherType] = useState('');
  const [city, setCity] = useState<City>(adminProfile?.city || 'Madurai');
  const [locality, setLocality] = useState(adminProfile?.locality || '');
  const [payAmount, setPayAmount] = useState<number>(850);
  const [payUnit, setPayUnit] = useState<PayUnit>('day');
  const [phone, setPhone] = useState(adminProfile?.phone || '');
  const [desc, setDesc] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let finalWorkType = workType;
    if (workType === 'OTHER_CUSTOM') {
      finalWorkType = customOtherType.trim() || 'Other';
    }

    createJobPost({
      title: title.trim(),
      entityType,
      workType: finalWorkType,
      locality: locality.trim(),
      city,
      payAmount: Number(payAmount) || 800,
      payUnit,
      phone: phone.trim(),
      desc: desc.trim(),
      postedBy: adminProfile?.name ? `${adminProfile.name} (${t(entityType)})` : 'Employer'
    });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white border border-lilac-border rounded-card p-6 md:p-8 shadow-soft">
        {/* Header */}
        <div className="border-b border-lilac-border pb-5 mb-6">
          <div className="flex items-center gap-2.5 text-indigo-950 font-display font-bold text-xl">
            <PlusCircle className="w-6 h-6 text-marigold-500" />
            <h3>{t('tabPostJob')}</h3>
          </div>
          <p className="text-xs text-text-muted mt-1">
            {language === 'ta'
              ? 'உங்கள் வேலை தேவையை சில நிமிடங்களில் பதிவிடுங்கள். தகுதியான தொழிலாளர்கள் உடனே அழைப்பார்கள்.'
              : 'Post your job requirement in seconds. Qualified local workers will call you directly.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-indigo-950 mb-1.5">
              {language === 'ta' ? 'வேலையின் பெயர் (Job Title)' : 'Job Title'}{' '}
              <span className="text-marigold-600">*</span>
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Mason for House Construction / Textile Sales Staff"
              className="w-full px-4 py-2.5 rounded-xl border border-lilac-border bg-lilac-bg focus:bg-white focus:border-indigo-600 outline-none text-sm font-medium transition-all"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-indigo-950 mb-1.5">
                {language === 'ta' ? 'வேலை வழங்குபவர் யார்?' : 'Who is Hiring?'}{' '}
                <span className="text-marigold-600">*</span>
              </label>
              <select
                value={entityType}
                onChange={(e) => setEntityType(e.target.value as HiringEntity)}
                className="w-full px-4 py-2.5 rounded-xl border border-lilac-border bg-lilac-bg focus:bg-white focus:border-indigo-600 outline-none text-sm font-semibold text-indigo-950 cursor-pointer"
              >
                <option value="household">{t('household')} (வீட்டு வேலை)</option>
                <option value="shop">{t('shop')} (கடை)</option>
                <option value="company">{t('company')} (நிறுவனம்)</option>
                <option value="contractor">{t('contractor')} (ஒப்பந்ததாரர்)</option>
                <option value="farm">{t('farm')} (விவசாயம்)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-indigo-950 mb-1.5">
                {language === 'ta' ? 'வேலை வகை' : 'Type of Work'} <span className="text-marigold-600">*</span>
              </label>
              <select
                value={workType}
                onChange={(e) => setWorkType(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-lilac-border bg-lilac-bg focus:bg-white focus:border-indigo-600 outline-none text-sm font-semibold text-indigo-950 cursor-pointer"
              >
                <option value="Construction">Construction (கட்டுமானம்)</option>
                <option value="Home Care">Home Care (வீட்டு பராமரிப்பு)</option>
                <option value="Food & Cooking">Food & Cooking (சமையல்)</option>
                <option value="Driving & Delivery">Driving & Delivery (டிரைவிங்)</option>
                <option value="Farm & Agri">Farm & Agri (விவசாயம்)</option>
                <option value="Shop & Retail">Shop & Retail (கடை)</option>
                <option value="Office & Admin">Office & Admin (அலுவலகம்)</option>
                <option value="Tailoring & Garments">Tailoring (தையல்)</option>
                <option value="Factory & Machine">Factory (தொழிற்சாலை)</option>
                <option value="OTHER_CUSTOM">Other (பிற வேலைகள் - நீங்களே டைப் செய்யவும்)</option>
              </select>
            </div>
          </div>

          {/* Custom Other Work Type Input */}
          {workType === 'OTHER_CUSTOM' && (
            <div className="animate-fade-in">
              <label className="block text-xs font-semibold text-indigo-950 mb-1.5">
                {language === 'ta'
                  ? 'உங்கள் வேலையின் வகையை உள்ளிடவும்'
                  : 'Specify Custom Type of Work'}{' '}
                <span className="text-marigold-600">*</span>
              </label>
              <input
                type="text"
                required
                value={customOtherType}
                onChange={(e) => setCustomOtherType(e.target.value)}
                placeholder="e.g. Aquarium Cleaning, Tree Trimming, Catering Helper"
                className="w-full px-4 py-2.5 rounded-xl border border-lilac-border bg-lilac-bg focus:bg-white focus:border-indigo-600 outline-none text-sm font-medium transition-all"
              />
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                placeholder="e.g. KK Nagar / Thillai Nagar"
                className="w-full px-4 py-2.5 rounded-xl border border-lilac-border bg-lilac-bg focus:bg-white focus:border-indigo-600 outline-none text-sm font-medium transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-indigo-950 mb-1.5">
                {language === 'ta' ? 'சம்பளம் தொகை (₹)' : 'Pay Amount (₹)'}{' '}
                <span className="text-marigold-600">*</span>
              </label>
              <input
                type="number"
                required
                value={payAmount}
                onChange={(e) => setPayAmount(Number(e.target.value))}
                placeholder="e.g. 850 or 15000"
                className="w-full px-4 py-2.5 rounded-xl border border-lilac-border bg-lilac-bg focus:bg-white focus:border-indigo-600 outline-none text-sm font-medium transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-indigo-950 mb-1.5">
                {language === 'ta' ? 'சம்பள முறை' : 'Pay Unit'} <span className="text-marigold-600">*</span>
              </label>
              <select
                value={payUnit}
                onChange={(e) => setPayUnit(e.target.value as PayUnit)}
                className="w-full px-4 py-2.5 rounded-xl border border-lilac-border bg-lilac-bg focus:bg-white focus:border-indigo-600 outline-none text-sm font-semibold text-indigo-950 cursor-pointer"
              >
                <option value="day">{t('dailyWage')}</option>
                <option value="month">{t('monthlySalary')}</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-indigo-950 mb-1.5">
              {language === 'ta' ? 'தொடர்பு தொலைபேசி எண்' : 'Contact Phone Number'}{' '}
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
            <p className="text-[11px] text-text-light mt-1">
              {language === 'ta'
                ? 'தொழிலாளர்கள் இந்த எண்ணில் நேரடியாக அழைப்பார்கள்.'
                : 'Applicants will use this phone number to contact you directly.'}
            </p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-indigo-950 mb-1.5">
              {language === 'ta' ? 'வேலை பற்றிய விவரங்கள் & நேரம்' : 'Job Details & Work Timings'}{' '}
              <span className="text-marigold-600">*</span>
            </label>
            <textarea
              required
              rows={4}
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Mention exact duties, shift hours, holidays, and if food/stay is provided..."
              className="w-full px-4 py-2.5 rounded-xl border border-lilac-border bg-lilac-bg focus:bg-white focus:border-indigo-600 outline-none text-sm font-medium transition-all resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-4 bg-indigo-900 hover:bg-indigo-800 text-white font-bold py-3 px-6 rounded-full text-sm shadow-md shadow-indigo-900/20 flex items-center justify-center gap-2 transition-all"
          >
            <Megaphone className="w-4 h-4 text-marigold-400" />
            <span>{language === 'ta' ? 'வேலையை உடனே வெளியிடவும்' : 'Publish Job Opening'}</span>
          </button>
        </form>
      </div>
    </div>
  );
};
