import Link from "next/link";

type Props = {
  title: string;
  children: React.ReactNode;
};

export default function LegalLayout({ title, children }: Props) {
  return (
    <div className="mx-auto max-w-[900px] px-4 py-12 lg:px-6">
      <nav className="mb-4 text-xs text-[#888]">
        <Link href="/" className="hover:text-[#e53935]">الرئيسية</Link>
        <span className="mx-2">/</span>
        <span className="text-[#555]">{title}</span>
      </nav>

      <h1 className="text-3xl font-black text-[#333]">{title}</h1>
      <p className="mt-2 text-xs text-[#999]">آخر تحديث: {new Date().toLocaleDateString("ar-KW")}</p>

      <article className="prose prose-sm mt-8 space-y-6 text-sm leading-8 text-[#555]">
        {children}
      </article>

      <div className="mt-10 border-t border-[#eee] pt-6">
        <p className="text-xs text-[#888]">
          صفحات قانونية أخرى:{" "}
          <Link href="/legal/privacy" className="text-[#e53935] hover:underline">الخصوصية</Link>
          {" · "}
          <Link href="/legal/terms" className="text-[#e53935] hover:underline">الشروط</Link>
          {" · "}
          <Link href="/legal/returns" className="text-[#e53935] hover:underline">الإرجاع</Link>
          {" · "}
          <Link href="/legal/shipping" className="text-[#e53935] hover:underline">الشحن</Link>
          {" · "}
          <Link href="/legal/cookies" className="text-[#e53935] hover:underline">الكوكيز</Link>
        </p>
      </div>
    </div>
  );
}
