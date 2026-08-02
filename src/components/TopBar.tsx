import { STORE_EMAIL, STORE_PHONE_FULL } from "@/lib/constants";

export default function TopBar() {
  return (
    <div className="bg-[#1a1a2e] text-[#c8c8d8] text-xs">
      <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-2 px-4 py-2 lg:px-6">
        {/* يسار */}
        <div className="flex flex-wrap items-center gap-4">
          <span className="flex items-center gap-1.5">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="text-[#f0a500]">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            الكويت — حولي 🇰🇼
          </span>
          <span className="hidden items-center gap-1.5 sm:flex">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="text-[#25D366]">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
            </svg>
            خدمة العملاء 24/7
          </span>
          <span className="hidden items-center gap-1.5 md:flex text-[#f0a500] font-bold">
            دينار كويتي (KD)
          </span>
        </div>
        {/* يمين */}
        <div className="flex flex-wrap items-center gap-4">
          <a
            href={`tel:${STORE_PHONE_FULL.replace(/\s/g, "")}`}
            className="flex items-center gap-1.5 transition-colors hover:text-white"
            dir="ltr"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
            </svg>
            {STORE_PHONE_FULL}
          </a>
          <a
            href={`mailto:${STORE_EMAIL}`}
            className="hidden items-center gap-1.5 transition-colors hover:text-white md:flex"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
            </svg>
            {STORE_EMAIL}
          </a>
          <span className="hidden items-center gap-1 rounded bg-white/10 px-2 py-0.5 font-bold text-white sm:flex">
            العربية 🌐
          </span>
        </div>
      </div>
    </div>
  );
}
