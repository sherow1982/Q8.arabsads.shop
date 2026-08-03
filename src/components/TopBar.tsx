import { STORE_ADDRESS_AR, STORE_EMAIL, STORE_PHONE_FULL, STORE_POSTAL_CODE, STORE_WHATSAPP_LINK } from "@/lib/constants";

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
            {STORE_ADDRESS_AR} — {STORE_POSTAL_CODE} 🇰🇼
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
          {/* رقم الهاتف مخفي للـ schema */}
          <span className="sr-only">{STORE_PHONE_FULL}</span>
          <a
            href={`${STORE_WHATSAPP_LINK}?text=${encodeURIComponent('مرحباً')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 transition-colors hover:text-white text-[#25D366] font-bold"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            واتساب
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
