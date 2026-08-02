import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-lg px-4 py-24 text-center">
      <p className="text-6xl font-black text-[#e53935]">404</p>
      <h1 className="mt-4 text-2xl font-black text-[#333]">الصفحة غير موجودة</h1>
      <p className="mt-2 text-sm text-[#777]">لم نتمكن من العثور على الصفحة المطلوبة.</p>
      <Link
        href="/"
        className="mt-8 inline-block rounded bg-[#333] px-8 py-3 text-sm font-bold text-white hover:bg-[#e53935]"
      >
        العودة للرئيسية
      </Link>
    </div>
  );
}
