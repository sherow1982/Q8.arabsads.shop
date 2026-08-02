import LegalLayout from "@/components/LegalLayout";
import JsonLd from "@/components/JsonLd";
import { legalMetadata } from "@/lib/legal";
import { webPageSchema } from "@/lib/schema";
import { STORE_EMAIL, STORE_NAME, STORE_PHONE_FULL } from "@/lib/constants";

const title = "الشروط والأحكام";
const description = "شروط وأحكام استخدام متجر GStore Q8 في الكويت.";
const path = "/legal/terms";

export const metadata = legalMetadata(title, description, path);

export default function TermsPage() {
  return (
    <>
      <JsonLd data={webPageSchema(title, description, path)} />
      <LegalLayout title={title}>
        <section>
          <h2 className="text-lg font-black text-[#333]">1. القبول</h2>
          <p>
            باستخدامك لموقع {STORE_NAME} فإنك توافق على هذه الشروط. إذا لم توافق، يرجى
            عدم استخدام الموقع.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-black text-[#333]">2. الخدمة</h2>
          <p>
            يقدم المتجر منتجات إلكترونية وألعاب وإكسسوارات للبيع داخل دولة الكويت فقط.
            الأسعار معروضة بالدينار الكويتي (KD) وقد تتغير دون إشعار مسبق.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-black text-[#333]">3. الطلبات والدفع</h2>
          <ul className="list-disc space-y-2 pr-5">
            <li>يتم تأكيد الطلب عبر واتساب أو الهاتف بعد استلامه</li>
            <li>طرق الدفع: الدفع عند الاستلام أو التحويل البنكي حسب الاتفاق</li>
            <li>يحق للمتجر رفض أو إلغاء أي طلب في حالات الاشتباه أو نفاد المخزون</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-black text-[#333]">4. المنتجات</h2>
          <p>
            نبذل جهدنا لعرض معلومات وصور دقيقة. قد تختلف الألوان أو المواصفات الفعلية
            قليلاً. جميع المنتجات أصلية ما لم يُذكر خلاف ذلك.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-black text-[#333]">5. الملكية الفكرية</h2>
          <p>
            جميع محتويات الموقع (الشعار، النصوص، التصميم) مملوكة لـ {STORE_NAME} ومحمية
            بموجب قوانين الملكية الفكرية.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-black text-[#333]">6. التواصل</h2>
          <p>
            للاستفسارات: {STORE_PHONE_FULL} — {STORE_EMAIL}
          </p>
        </section>
      </LegalLayout>
    </>
  );
}
