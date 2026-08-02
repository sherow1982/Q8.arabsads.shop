import Link from "next/link";
import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { webPageSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "عن المتجر",
  description:
    "تعرف على Q8 اعلانات العرب — منصة التسوق الإلكتروني الأولى في الكويت. نوفر آلاف المنتجات بأفضل الأسعار مع خدمة عملاء 24/7.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={webPageSchema(
          "عن Q8 اعلانات العرب",
          "تعرف على منصة التسوق الإلكتروني الأولى في الكويت",
          "/about"
        )}
      />
      <div className="mx-auto max-w-[900px] px-4 py-12 lg:px-6">
        <nav className="mb-4 text-xs text-[#888]">
          <Link href="/" className="hover:text-[#e53935]">الرئيسية</Link>
          <span className="mx-2">/</span>
          <span className="text-[#555]">عن المتجر</span>
        </nav>

        <h1 className="text-3xl font-black text-[#333]">عن Q8 اعلانات العرب</h1>
        <p className="mt-2 text-sm text-[#777]">منصة التسوق الإلكتروني الأولى في الكويت</p>

        <div className="prose prose-sm mt-8 max-w-none space-y-6 text-sm leading-8 text-[#555]">
          <p>
            <strong className="text-[#333]">Q8 اعلانات العرب</strong> هي منصتك المتخصصة في التسوق
            الإلكتروني بالكويت. نوفر آلاف المنتجات المنوّعة من إلكترونيات، ألعاب وهوايات، منتجات
            المنزل والحديقة، صحة وجمال، وملابس وإكسسوارات — كل ذلك بأفضل الأسعار بالدينار
            الكويتي.
          </p>
          <p>
            نؤمن بأن تجربة التسوق يجب أن تكون سهلة وسريعة وموثوقة. لذلك يمكنك تصفّح آلاف
            المنتجات، إضافتها إلى السلة، وإتمام طلبك مباشرة عبر واتساب مع فريق خدمة العملاء
            المتواجد على مدار الساعة.
          </p>

          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { icon: "🛍️", title: "آلاف المنتجات", desc: "تشكيلة واسعة من أفضل الماركات" },
              { icon: "🚚", title: "توصيل سريع", desc: "شحن لجميع مناطق الكويت" },
              { icon: "💬", title: "دعم 24/7", desc: "فريق واتساب جاهز لمساعدتك" },
              { icon: "✅", title: "منتجات أصلية", desc: "ضمان الجودة على جميع المنتجات" },
              { icon: "💳", title: "دفع آمن", desc: "KNET وتحويل بنكي وكاش" },
              { icon: "🔄", title: "إرجاع سهل", desc: "سياسة إرجاع واضحة وعادلة" },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-sm border border-[#eee] bg-[#fafafa] p-5 text-center"
              >
                <span className="text-3xl">{item.icon}</span>
                <h3 className="mt-2 font-black text-[#333]">{item.title}</h3>
                <p className="mt-1 text-xs">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href="/products"
            className="rounded bg-[#e53935] px-6 py-2.5 text-sm font-bold text-white hover:bg-[#c62828]"
          >
            تصفّح المنتجات
          </Link>
          <Link
            href="/contact"
            className="rounded border border-[#ddd] px-6 py-2.5 text-sm font-bold text-[#333] hover:border-[#333]"
          >
            اتصل بنا
          </Link>
        </div>
      </div>
    </>
  );
}
