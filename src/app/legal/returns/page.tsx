import LegalLayout from "@/components/LegalLayout";
import JsonLd from "@/components/JsonLd";
import { legalMetadata } from "@/lib/legal";
import { webPageSchema } from "@/lib/schema";
import { STORE_EMAIL, STORE_PHONE_FULL } from "@/lib/constants";

const title = "سياسة الإرجاع والاستبدال";
const description = "سياسة الإرجاع والاستبدال والاسترداد في GStore Q8 - الكويت.";
const path = "/legal/returns";

export const metadata = legalMetadata(title, description, path);

export default function ReturnsPage() {
  return (
    <>
      <JsonLd data={webPageSchema(title, description, path)} />
      <LegalLayout title={title}>
        <section>
          <h2 className="text-lg font-black text-[#333]">1. فترة الإرجاع</h2>
          <p>
            يمكنك طلب إرجاع أو استبدال المنتج خلال <strong>7 أيام</strong> من تاريخ
            الاستلام، بشرط أن يكون المنتج في حالته الأصلية مع جميع الملحقات والتغليف.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-black text-[#333]">2. شروط الإرجاع</h2>
          <ul className="list-disc space-y-2 pr-5">
            <li>المنتج غير مستخدم وبحالة سليمة</li>
            <li>وجود فاتورة الشراء أو رقم الطلب</li>
            <li>المنتجات الرقمية أو المفتوحة (ألعاب، برمجيات) غير قابلة للإرجاع بعد التفعيل</li>
            <li>المنتجات المخصصة أو الطلبات الخاصة قد تكون مستثناة</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-black text-[#333]">3. المنتجات المعيبة</h2>
          <p>
            في حالة وجود عيب مصنعي، يرجى التواصل خلال 48 ساعة مع صور للمنتج. سنقوم
            بالاستبدال أو الإصلاح أو الاسترداد حسب الحالة.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-black text-[#333]">4. عملية الإرجاع</h2>
          <ol className="list-decimal space-y-2 pr-5">
            <li>تواصل معنا عبر واتساب أو {STORE_PHONE_FULL}</li>
            <li>اذكر رقم الطلب وسبب الإرجاع</li>
            <li>سيتم ترتيب استلام المنتج من عنوانك في الكويت</li>
            <li>يتم معالجة الاسترداد خلال 5–10 أيام عمل بعد فحص المنتج</li>
          </ol>
        </section>

        <section>
          <h2 className="text-lg font-black text-[#333]">5. الاسترداد</h2>
          <p>
            يُسترد المبلغ بنفس طريقة الدفع الأصلية. رسوم الشحن الأصلية غير قابلة
            للاسترداد إلا في حالة خطأ من المتجر.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-black text-[#333]">6. التواصل</h2>
          <p>{STORE_EMAIL} — {STORE_PHONE_FULL}</p>
        </section>
      </LegalLayout>
    </>
  );
}
