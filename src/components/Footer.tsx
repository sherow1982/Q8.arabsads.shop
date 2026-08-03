import Link from "next/link";
import { buildWhatsAppInquiryUrl } from "@/lib/whatsapp";
import { STORE_ADDRESS_AR, STORE_EMAIL, STORE_NAME_AR, STORE_PHONE_FULL, STORE_POSTAL_CODE, STORE_WHATSAPP_LINK } from "@/lib/constants";

const LOGO = "/logo.webp";

const socialLinks = [
  {
    label: "واتساب",
    href: buildWhatsAppInquiryUrl(),
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
      </svg>
    ),
    color: "#25D366",
  },
  {
    label: "إنستغرام",
    href: "https://www.instagram.com/arabsads",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
    color: "#E1306C",
  },
  {
    label: "تويتر",
    href: "https://twitter.com/arabsads",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    color: "#1DA1F2",
  },
  {
    label: "فيسبوك",
    href: "https://www.facebook.com/arabsads",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
    color: "#1877F2",
  },
];

const shopLinks = [
  { label: "جميع المنتجات", href: "/products" },
  { label: "العروض والتخفيضات", href: "/products?q=عرض" },
  { label: "إلكترونيات", href: "/products?category=إلكترونيات" },
  { label: "ألعاب وهوايات", href: "/products?category=ألعاب وهوايات" },
  { label: "سلة التسوق", href: "/cart" },
];

const storeLinks = [
  { label: "عن Q8 اعلانات العرب", href: "/about" },
  { label: "الاتصال بنا", href: "/contact" },
  { label: "الأسئلة الشائعة", href: "/faq" },
  { label: "سلة التسوق", href: "/cart" },
];

const legalLinks = [
  { label: "سياسة الخصوصية", href: "/legal/privacy" },
  { label: "الشروط والأحكام", href: "/legal/terms" },
  { label: "الإرجاع والاستبدال", href: "/legal/returns" },
  { label: "الشحن والتوصيل", href: "/legal/shipping" },
  { label: "ملفات الارتباط", href: "/legal/cookies" },
  { label: "خريطة الموقع", href: "/sitemap-view" },
];

export default function Footer() {
  return (
    <footer className="mt-auto border-t-4 border-[#e53935] bg-[#1a1a2e] text-[#a0a0b8]">
      {/* الجسم الرئيسي */}
      <div className="mx-auto grid max-w-[1400px] gap-8 px-4 py-12 md:grid-cols-2 lg:grid-cols-5 lg:px-6">
        {/* عمود الهوية */}
        <div className="lg:col-span-2">
          <Link href="/" className="inline-block">
            <img
              src={LOGO}
              alt={STORE_NAME_AR}
              width={160}
              height={40}
              className="mb-5 h-10 w-auto"
            />
          </Link>
          <p className="mb-6 text-sm leading-7 text-[#8888a8]">
            Q8 اعلانات العرب — منصة التسوق الإلكتروني الأولى في الكويت. آلاف
            المنتجات بأفضل الأسعار بالدينار الكويتي مع خدمة عملاء 24/7.
          </p>

          {/* معلومات التواصل */}
          <div className="mb-6 space-y-3">
            {/* رقم الهاتف مخفي بصرياً للـ schema فقط */}
            <span className="sr-only" aria-hidden="true">{STORE_PHONE_FULL}</span>
            <a
              href={`${STORE_WHATSAPP_LINK}?text=${encodeURIComponent('مرحباً، أريد التواصل معكم')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-sm transition-colors hover:text-white"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-[#25D366]">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
              </span>
              تواصل عبر واتساب
            </a>
            <a
              href={`mailto:${STORE_EMAIL}`}
              className="flex items-center gap-3 text-sm transition-colors hover:text-white"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-[#e53935]">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
              </span>
              {STORE_EMAIL}
            </a>
            <div className="flex items-center gap-3 text-sm">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-[#e53935]">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
              </span>
              <address className="not-italic text-sm text-[#a0a0b8]">
                {STORE_ADDRESS_AR}<br />
                <span className="text-xs text-[#6666aa]">الرمز البريدي: {STORE_POSTAL_CODE} — الكويت 🇰🇼</span>
              </address>
            </div>
          </div>

          {/* سوشيال ميديا */}
          <div className="flex gap-3">
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                style={{ "--social-color": s.color } as React.CSSProperties}
                className="group flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-[#a0a0b8] transition-all duration-200 hover:scale-110 hover:bg-[var(--social-color)] hover:text-white"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* التسوق */}
        <div>
          <h4 className="mb-4 text-sm font-black uppercase tracking-wider text-white">التسوق</h4>
          <ul className="space-y-2.5">
            {shopLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="flex items-center gap-2 text-sm transition-colors hover:text-[#e53935]"
                >
                  <span className="h-1 w-1 shrink-0 rounded-full bg-[#e53935]" />
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* عن المتجر */}
        <div>
          <h4 className="mb-4 text-sm font-black uppercase tracking-wider text-white">عن المتجر</h4>
          <ul className="space-y-2.5">
            {storeLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="flex items-center gap-2 text-sm transition-colors hover:text-[#e53935]"
                >
                  <span className="h-1 w-1 shrink-0 rounded-full bg-[#e53935]" />
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* قانوني */}
        <div>
          <h4 className="mb-4 text-sm font-black uppercase tracking-wider text-white">قانوني</h4>
          <ul className="space-y-2.5">
            {legalLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="flex items-center gap-2 text-sm transition-colors hover:text-[#e53935]"
                >
                  <span className="h-1 w-1 shrink-0 rounded-full bg-[#e53935]" />
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* شريط واتساب CTA */}
      <div className="border-t border-white/10 bg-[#111122]">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-4 px-4 py-5 lg:px-6">
          <div>
            <p className="text-sm font-bold text-white">تحتاج مساعدة؟</p>
            <p className="text-xs text-[#8888a8]">
              فريق Q8 اعلانات العرب متاح 24/7 للإجابة على استفساراتك
            </p>
          </div>
          <a
            href={buildWhatsAppInquiryUrl("مرحباً، لدي استفسار عن Q8 اعلانات العرب.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 rounded-lg bg-[#25D366] px-5 py-2.5 text-sm font-bold text-white shadow-lg transition-all duration-200 hover:scale-[1.03] hover:bg-[#20bd5a]"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
            تواصل عبر واتساب
          </a>
        </div>
      </div>

      {/* شريط الحقوق */}
      <div className="border-t border-white/5 bg-[#0d0d1a]">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-3 px-4 py-4 lg:px-6">
          <p className="text-xs text-[#555570]">
            © {new Date().getFullYear()} Q8 اعلانات العرب — جميع الحقوق محفوظة
          </p>
          <div className="flex flex-wrap items-center gap-4 text-xs text-[#555570]">
            <span>مصنوع بـ ❤️ للكويت 🇰🇼</span>
            <Link href="/legal/privacy" className="transition-colors hover:text-[#e53935]">
              الخصوصية
            </Link>
            <Link href="/legal/terms" className="transition-colors hover:text-[#e53935]">
              الشروط
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
