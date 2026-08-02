import LegalLayout from "@/components/LegalLayout";
import JsonLd from "@/components/JsonLd";
import { legalMetadata } from "@/lib/legal";
import { webPageSchema } from "@/lib/schema";
import { STORE_EMAIL, STORE_NAME, STORE_PHONE_FULL } from "@/lib/constants";

const title = "سياسة الشحن والتوصيل";
const description = "سياسة الشحن والتوصيل داخل الكويت - GStore Q8.";
const path = "/legal/shipping";

export const metadata = legalMetadata(title, description, path);

export default function ShippingPage() {
  return (
    <>
      <JsonLd data={webPageSchema(title, description, path)} />
      <LegalLayout title={title}>
        <section>
          <h2 className="text-lg font-black text-[#333]">1. نطاق التوصيل</h2>
          <p>
            نوصل الطلبات إلى <strong>جميع محافظات دولة الكويت</strong> الست: العاصمة،
            حولي، الفروانية، الأحمدي، الجهراء، ومبارك الكبير.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-black text-[#333]">2. مدة التوصيل</h2>
          <ul className="list-disc space-y-2 pr-5">
            <li>داخل الكويت: 1–3 أيام عمل للمنتجات المتوفرة</li>
            <li>المنتجات غير المتوفرة: يتم إبلاغك بموعد التوريد المتوقع</li>
            <li>الطلبات قبل 2 ظهراً قد تُشحن في نفس اليوم حسب المنطقة</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-black text-[#333]">3. رسوم الشحن</h2>
          <p>
            تختلف رسوم التوصيل حسب المنطقة وحجم الطلب. يتم إبلاغك بالرسوم النهائية
            عند تأكيد الطلب عبر واتساب. قد يكون الشحن مجانياً للعروض المحددة.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-black text-[#333]">4. عنوان التوصيل</h2>
          <p>
            يرجى إدخال عنوان كامل ودقيق يشمل: المحافظة، المنطقة، رقم القطعة، الشارع،
            رقم المبنى، الدور، والشقة. العناوين غير الدقيقة قد تؤخر التوصيل.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-black text-[#333]">5. استلام الطلب</h2>
          <p>
            سيتواصل معك المندوب قبل التوصيل. في حالة عدم التواجد، سيتم التنسيق
            لموعد بديل. يرجى التأكد من توفر رقم هاتف كويتي صحيح.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-black text-[#333]">6. التواصل</h2>
          <p>{STORE_NAME} — {STORE_PHONE_FULL} — {STORE_EMAIL}</p>
        </section>
      </LegalLayout>
    </>
  );
}
