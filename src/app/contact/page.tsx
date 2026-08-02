import Link from "next/link";
import { buildWhatsAppInquiryUrl } from "@/lib/whatsapp";
import { STORE_EMAIL, STORE_PHONE, STORE_PHONE_FULL } from "@/lib/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "اتصل بنا",
  description:
    "تواصل مع فريق Q8 اعلانات العرب في الكويت عبر واتساب أو الهاتف أو البريد الإلكتروني — خدمة عملاء 24/7.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-[900px] px-4 py-12 lg:px-6">
      <nav className="mb-4 text-xs text-[#888]">
        <Link href="/" className="hover:text-[#e53935]">الرئيسية</Link>
        <span className="mx-2">/</span>
        <span className="text-[#555]">اتصل بنا</span>
      </nav>

      <h1 className="text-3xl font-black text-[#333]">اتصل بنا</h1>
      <p className="mt-2 text-sm text-[#777]">
        فريق Q8 اعلانات العرب يخدمك في الكويت على مدار الساعة 🇰🇼
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <ContactCard
          icon="📞"
          title="الهاتف (كويت)"
          value={STORE_PHONE_FULL}
          href={`tel:${STORE_PHONE}`}
        />
        <ContactCard
          icon="✉️"
          title="البريد الإلكتروني"
          value={STORE_EMAIL}
          href={`mailto:${STORE_EMAIL}`}
        />
        <ContactCard
          icon="📍"
          title="الموقع"
          value="حولي، الكويت"
        />
        <ContactCard
          icon="💬"
          title="واتساب"
          value="راسلنا مباشرة"
          href={buildWhatsAppInquiryUrl("مرحباً، لدي استفسار عن Q8 اعلانات العرب.")}
          external
        />
      </div>

      <div className="mt-10 rounded-sm border border-[#eee] bg-[#fafafa] p-6">
        <h2 className="font-black text-[#333]">ساعات العمل</h2>
        <p className="mt-2 text-sm leading-7 text-[#666]">
          خدمة العملاء متاحة <strong>24/7</strong> عبر واتساب والهاتف.
          <br />
          معالجة الطلبات: يومياً من 9 صباحاً حتى 10 مساءً (توقيت الكويت).
        </p>
      </div>
    </div>
  );
}

function ContactCard({
  icon,
  title,
  value,
  href,
  external,
}: {
  icon: string;
  title: string;
  value: string;
  href?: string;
  external?: boolean;
}) {
  const content = (
    <div className="rounded-sm border border-[#eee] bg-white p-6 transition hover:border-[#e53935] hover:shadow-sm">
      <span className="text-2xl">{icon}</span>
      <h3 className="mt-3 font-black text-[#333]">{title}</h3>
      <p
        className="mt-1 text-sm text-[#666]"
        dir={title.includes("هاتف") ? "ltr" : undefined}
      >
        {value}
      </p>
    </div>
  );

  if (href) {
    return (
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
      >
        {content}
      </a>
    );
  }
  return content;
}
