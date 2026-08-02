export type KuwaitGovernorate = {
  id: string;
  name: string;
  cities: string[];
};

export const KUWAIT_GOVERNORATES: KuwaitGovernorate[] = [
  {
    id: "capital",
    name: "محافظة العاصمة",
    cities: [
      "شرق",
      "قبلة",
      "المرقاب",
      "دسمان",
      "الدسمة",
      "الشامية",
      "الشويخ",
      "كيفان",
      "النزهة",
      "الفيحاء",
      "الروضة",
      "المنصورية",
      "القادسية",
      "اليرموك",
      "السرة",
      "الدعية",
      "قرطبة",
      "جابر الأحمد",
      "سعد العبدالله",
      "الصليبخات",
      "الدوحة",
      "الخالدية",
    ],
  },
  {
    id: "hawalli",
    name: "محافظة حولي",
    cities: [
      "حولي",
      "السالمية",
      "الرميثية",
      "الجابرية",
      "بيان",
      "مشرف",
      "الشعب",
      "سلوى",
      "الزهراء",
      "ميدان حولي",
      "المنقف",
      "البدع",
      "السالمية - قطعة 1",
      "السالمية - قطعة 2",
      "السالمية - قطعة 3",
      "السالمية - قطعة 4",
      "السالمية - قطعة 5",
      "السالمية - قطعة 6",
      "السالمية - قطعة 7",
      "السالمية - قطعة 8",
      "السالمية - قطعة 9",
      "السالمية - قطعة 10",
      "السالمية - قطعة 11",
      "السالمية - قطعة 12",
    ],
  },
  {
    id: "farwaniya",
    name: "محافظة الفروانية",
    cities: [
      "الفروانية",
      "خيطان",
      "الرقعي",
      "العارضية",
      "الفردوس",
      "الأندلس",
      "جليب الشيوخ",
      "عبدالله المبارك",
      "الرحاب",
      "إشبيلية",
      "العمرية",
      "الرابية",
      "ضاحية عبدالله المبارك",
      "الضجيج",
      "الري",
    ],
  },
  {
    id: "ahmadi",
    name: "محافظة الأحمدي",
    cities: [
      "الأحمدي",
      "الفحيحيل",
      "المهبولة",
      "الرقة",
      "صباح الأحمد",
      "الفنطاس",
      "أبو حليفة",
      "الظهر",
      "هدية",
      "الوفرة",
      "الخيران",
      "فهد الأحمد",
      "المنقف",
      "الصباحية",
      "النويصيب",
      "ميناء عبدالله",
      "الزور",
      "الجليعة",
      "الوفرة السكنية",
    ],
  },
  {
    id: "jahra",
    name: "محافظة الجهراء",
    cities: [
      "الجهراء",
      "القصر",
      "النعيم",
      "السالمي",
      "الصليبية",
      "أمغرة",
      "كبد",
      "تيماء",
      "سعد العبدالله - الجهراء",
      "النسيم",
      "العيون",
      "الواحة",
      "العبدلي",
      "المطلاع",
    ],
  },
  {
    id: "mubarak",
    name: "محافظة مبارك الكبير",
    cities: [
      "صباح السالم",
      "القرين",
      "القصور",
      "أبو فطيرة",
      "المسيلة",
      "مبارك الكبير",
      "الفنيطيس",
      "العدان",
      "المسايل",
      "صبحان",
      "القيروان",
    ],
  },
];

export function getGovernorateById(id: string): KuwaitGovernorate | undefined {
  return KUWAIT_GOVERNORATES.find((g) => g.id === id);
}

export function getCitiesByGovernorate(governorateId: string): string[] {
  return getGovernorateById(governorateId)?.cities ?? [];
}

export function formatKuwaitAddress(info: {
  governorate: string;
  city: string;
  block: string;
  street: string;
  building: string;
  floor?: string;
  apartment?: string;
}): string {
  const gov = getGovernorateById(info.governorate);
  const parts = [
    gov?.name ?? info.governorate,
    info.city,
    info.block ? `قطعة ${info.block}` : "",
    info.street ? `شارع ${info.street}` : "",
    info.building ? `مبنى ${info.building}` : "",
    info.floor ? `دور ${info.floor}` : "",
    info.apartment ? `شقة ${info.apartment}` : "",
    "الكويت",
  ].filter(Boolean);
  return parts.join("، ");
}
