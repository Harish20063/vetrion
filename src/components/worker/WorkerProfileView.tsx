import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../context/LanguageContext';
import { City, PayUnit, Availability, WorkerProfile } from '../../types';
import { UserCheck, Save } from 'lucide-react';

export const WorkerProfileView: React.FC = () => {
  const { workerProfile, saveWorkerProfile } = useApp();
  const { language, t } = useLanguage();

  const cities: City[] = ['Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem', 'Tirunelveli'];

  const availableSkills = [
    'Construction',
    'Wiring',
    'Plumbing',
    'Food & Cooking',
    'Home Care',
    'Driving & Delivery',
    'Farm & Agri',
    'Shop & Retail',
    'Tailoring & Garments',
    'Factory & Machine',
    'Office & Admin',
    'Painting',
    'Gardening'
  ];

  const [name, setName] = useState(workerProfile?.name || '');
  const [phone, setPhone] = useState(workerProfile?.phone || '');
  const [city, setCity] = useState<City>(workerProfile?.city || 'Chennai');
  const [locality, setLocality] = useState(workerProfile?.locality || '');
  const [headline, setHeadline] = useState(workerProfile?.headline || '');
  const [selectedSkills, setSelectedSkills] = useState<string[]>(
    workerProfile?.skills || ['Construction', 'Wiring']
  );
  const [expectedPay, setExpectedPay] = useState<number>(workerProfile?.expectedPay || 800);
  const [payUnit, setPayUnit] = useState<PayUnit>(workerProfile?.payUnit || 'day');
  const [experience, setExperience] = useState<number>(workerProfile?.experience || 3);
  const [availability, setAvailability] = useState<Availability>(
    workerProfile?.availability || 'available'
  );
  const [about, setAbout] = useState(workerProfile?.about || '');

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const profileData: WorkerProfile = {
      id: workerProfile?.id,
      name: name.trim(),
      phone: phone.trim(),
      city,
      locality: locality.trim(),
      headline: headline.trim(),
      skills: selectedSkills.length > 0 ? selectedSkills : ['General Work'],
      expectedPay: Number(expectedPay) || 750,
      payUnit,
      experience: Number(experience) || 1,
      availability,
      about: about.trim()
    };

    saveWorkerProfile(profileData);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white border border-lilac-border rounded-card p-6 md:p-8 shadow-soft">
        {/* Header */}
        <div className="border-b border-lilac-border pb-5 mb-6">
          <div className="flex items-center gap-2.5 text-indigo-950 font-display font-bold text-xl">
            <UserCheck className="w-6 h-6 text-marigold-500" />
            <h3>{t('tabWorkerProfile')}</h3>
          </div>
          <p className="text-xs text-text-muted mt-1">
            {language === 'ta'
              ? 'உங்கள் சுயவிவரத்தை சேமித்தால், நிறுவனங்களும் முதலாளிகளும் உங்களை நேரடியாக தொடர்பு கொள்வார்கள்.'
              : 'Creating your profile makes you instantly visible in the Employer Directory for direct job calls.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-indigo-950 mb-1.5">
                {language === 'ta' ? 'உங்கள் பெயர்' : 'Full Name'} <span className="text-marigold-600">*</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. S. Murugesan"
                className="w-full px-4 py-2.5 rounded-xl border border-lilac-border bg-lilac-bg focus:bg-white focus:border-indigo-600 outline-none text-sm font-medium transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-indigo-950 mb-1.5">
                {language === 'ta' ? 'தொலைபேசி எண்' : 'Phone Number'} <span className="text-marigold-600">*</span>
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. 98421 12345"
                className="w-full px-4 py-2.5 rounded-xl border border-lilac-border bg-lilac-bg focus:bg-white focus:border-indigo-600 outline-none text-sm font-medium transition-all"
              />
            </div>
          </div>

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
                {language === 'ta' ? 'பகுதி / பகுதி முகவரி' : 'Area / Locality'}{' '}
                <span className="text-marigold-600">*</span>
              </label>
              <input
                type="text"
                required
                value={locality}
                onChange={(e) => setLocality(e.target.value)}
                placeholder="e.g. Goripalayam / Adyar"
                className="w-full px-4 py-2.5 rounded-xl border border-lilac-border bg-lilac-bg focus:bg-white focus:border-indigo-600 outline-none text-sm font-medium transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-indigo-950 mb-1.5">
              {language === 'ta' ? 'தலைப்பு (ஒரு வரி அறிமுகம்)' : 'One-Line Professional Headline'}{' '}
              <span className="text-marigold-600">*</span>
            </label>
            <input
              type="text"
              required
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              placeholder="e.g. Licensed Electrician & Plumbing Specialist"
              className="w-full px-4 py-2.5 rounded-xl border border-lilac-border bg-lilac-bg focus:bg-white focus:border-indigo-600 outline-none text-sm font-medium transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-indigo-950 mb-2">
              {language === 'ta'
                ? 'நீங்கள் செய்யும் வேலைகள் (பலவற்றை தேர்ந்தெடுக்கலாம்)'
                : 'Types of Work You Do (Multi-select)'}
            </label>
            <div className="flex flex-wrap gap-2">
              {availableSkills.map((skill) => {
                const isSelected = selectedSkills.includes(skill);
                return (
                  <button
                    type="button"
                    key={skill}
                    onClick={() => toggleSkill(skill)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all border ${
                      isSelected
                        ? 'bg-indigo-900 border-indigo-900 text-white shadow-sm'
                        : 'bg-lilac-subtle border-lilac-border text-text-muted hover:text-indigo-900'
                    }`}
                  >
                    {skill}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-indigo-950 mb-1.5">
                {language === 'ta' ? 'எதிர்பார்க்கும் சம்பளம்' : 'Expected Pay'} (₹)
              </label>
              <input
                type="number"
                required
                value={expectedPay}
                onChange={(e) => setExpectedPay(Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl border border-lilac-border bg-lilac-bg focus:bg-white focus:border-indigo-600 outline-none text-sm font-medium transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-indigo-950 mb-1.5">
                {language === 'ta' ? 'சம்பள முறை' : 'Pay Unit'}
              </label>
              <select
                value={payUnit}
                onChange={(e) => setPayUnit(e.target.value as PayUnit)}
                className="w-full px-4 py-2.5 rounded-xl border border-lilac-border bg-lilac-bg focus:bg-white focus:border-indigo-600 outline-none text-sm font-semibold text-indigo-950 cursor-pointer"
              >
                <option value="day">{t('perDay')}</option>
                <option value="month">{t('perMonth')}</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-indigo-950 mb-1.5">
                {language === 'ta' ? 'அனுபவம் (ஆண்டுகள்)' : 'Experience (Years)'}
              </label>
              <input
                type="number"
                required
                min={0}
                max={40}
                value={experience}
                onChange={(e) => setExperience(Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl border border-lilac-border bg-lilac-bg focus:bg-white focus:border-indigo-600 outline-none text-sm font-medium transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-indigo-950 mb-1.5">
              {language === 'ta' ? 'வேலைக்கு கிடைக்கும் நிலை' : 'Availability Status'}
            </label>
            <select
              value={availability}
              onChange={(e) => setAvailability(e.target.value as Availability)}
              className="w-full px-4 py-2.5 rounded-xl border border-lilac-border bg-lilac-bg focus:bg-white focus:border-indigo-600 outline-none text-sm font-semibold text-indigo-950 cursor-pointer"
            >
              <option value="available">{t('availableNow')}</option>
              <option value="within-week">{t('withinWeek')}</option>
              <option value="unavailable">{t('notAvailable')}</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-indigo-950 mb-1.5">
              {language === 'ta' ? 'உங்களைப் பற்றி கூடுதல் தகவல்' : 'About Your Work & Past Projects'}
            </label>
            <textarea
              rows={3}
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              placeholder="Mention your tools, past projects, specialty skills..."
              className="w-full px-4 py-2.5 rounded-xl border border-lilac-border bg-lilac-bg focus:bg-white focus:border-indigo-600 outline-none text-sm font-medium transition-all resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-4 bg-indigo-900 hover:bg-indigo-800 text-white font-bold py-3 px-6 rounded-full text-sm shadow-md shadow-indigo-900/20 flex items-center justify-center gap-2 transition-all"
          >
            <Save className="w-4 h-4 text-marigold-400" />
            <span>{language === 'ta' ? 'சுயவிவரத்தை சேமித்து வெளியிடவும்' : 'Save & Publish Profile'}</span>
          </button>
        </form>
      </div>
    </div>
  );
};
