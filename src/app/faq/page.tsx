import Link from "next/link";
import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { faqSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "الأسئلة الشائعة | GStore Q8",
  description: "إجابات على أكثر الأسئلة شيوعاً حول التسوق والتوصيل في جي ستور كيو ايت.",
};

const faqs = [
  {
    q: "كيف أطلب منتج؟",
    a: "تصفّح المنتجات، أضف ما تريد إلى السلة، ثم انتقل إلى صفحة إتمام الطلب واملأ بياناتك. اضغط «إرسال الطلب عبر واتساب» وسيتم إرسال تفاصيل طلبك تلقائياً.",
  },
  {
    q: "ما طرق الدفع المتاحة؟",
    a: "حالياً الدفع عند الاستلام أو التحويل البنكي. سيتم تأكيد طريقة الدفع معك عبر واتساب بعد استلام الطلب.",
  },
  {
    q: "هل التوصيل متاح لجميع مناطق الكويت؟",
    a: "نعم، نوصل لمعظم مناطق الكويت. قد تختلف رسوم التوصيل حسب المنطقة وسيتم إبلاغك بها عند تأكيد الطلب.",
  },
  {
    q: "هل المنتجات أصلية؟",
    a: "جميع منتجاتنا أصلية ومضمونة. نتعامل مع موردين معتمدين فقط.",
  },
  {
    q: "كم يستغرق التوصيل؟",
    a: "عادةً من 1 إلى 3 أيام عمل داخل الكويت، حسب توفر المنتج ومنطقتك.",
  },
  {
    q: "هل يمكنني إلغاء أو تعديل الطلب؟",
    a: "نعم، تواصل معنا عبر واتساب في أسرع وقت قبل شحن الطلب وسنساعدك في التعديل أو الإلغاء.",
  },
];

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqSchema(faqs)} />
      <div className="mx-auto max-w-[900px] px-4 py-12 lg:px-6">
      <nav className="mb-4 text-xs text-[#888]">
        <Link href="/" className="hover:text-[#e53935]">الرئيسية</Link>
        <span className="mx-2">/</span>
        <span className="text-[#555]">الأسئلة الشائعة</span>
      </nav>

      <h1 className="text-3xl font-black text-[#333]">الأسئلة الشائعة</h1>
      <p className="mt-2 text-sm text-[#777]">إجابات سريعة على أكثر ما يُسأل</p>

      <div className="mt-8 space-y-4">
        {faqs.map((item, i) => (
          <details
            key={i}
            className="group rounded-sm border border-[#eee] bg-white open:border-[#333]"
          >
            <summary className="cursor-pointer list-none px-5 py-4 font-bold text-[#333] marker:content-none [&::-webkit-details-marker]:hidden">
              <span className="flex items-center justify-between gap-4">
                {item.q}
                <span className="text-[#999] transition group-open:rotate-45">+</span>
              </span>
            </summary>
            <p className="border-t border-[#eee] px-5 py-4 text-sm leading-7 text-[#666]">{item.a}</p>
          </details>
        ))}
      </div>

      <p className="mt-8 text-sm text-[#777]">
        لم تجد إجابتك؟{" "}
        <Link href="/contact" className="font-bold text-[#e53935] hover:underline">
          تواصل معنا
        </Link>
      </p>
    </div>
    </>
  );
}
