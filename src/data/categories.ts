export interface CategoryItem {
  id: string;
  labelEn: string;
  labelTa: string;
  iconName: string;
}

export const CATEGORIES: CategoryItem[] = [
  { id: "all", labelEn: "All Work", labelTa: "அனைத்தும்", iconName: "LayoutGrid" },
  { id: "Construction", labelEn: "Construction", labelTa: "கட்டுமானம்", iconName: "Hammer" },
  { id: "Home Care", labelEn: "Home Care", labelTa: "வீட்டு பராமரிப்பு", iconName: "HeartHandshake" },
  { id: "Food & Cooking", labelEn: "Food & Cooking", labelTa: "சமையல் & ஹோட்டல்", iconName: "UtensilsCrossed" },
  { id: "Driving & Delivery", labelEn: "Driving & Delivery", labelTa: "டிரைவிங் & டெலிவரி", iconName: "Bike" },
  { id: "Farm & Agri", labelEn: "Farm & Agri", labelTa: "விவசாயம் & தோட்டம்", iconName: "Sprout" },
  { id: "Shop & Retail", labelEn: "Shop & Retail", labelTa: "கடை & வியாபாரம்", iconName: "Store" },
  { id: "Office & Admin", labelEn: "Office & Admin", labelTa: "அலுவலக வேலை", iconName: "Building2" },
  { id: "Tailoring & Garments", labelEn: "Tailoring", labelTa: "தையல் வேலை", iconName: "Scissors" },
  { id: "Factory & Machine", labelEn: "Factory & Tech", labelTa: "தொழிற்சாலை", iconName: "Cog" },
  { id: "Other", labelEn: "Other Work", labelTa: "பிற பணிகள்", iconName: "MoreHorizontal" }
];
