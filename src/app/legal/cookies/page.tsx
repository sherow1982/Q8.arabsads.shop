import LegalLayout from "@/components/LegalLayout";
import JsonLd from "@/components/JsonLd";
import { legalMetadata } from "@/lib/legal";
import { webPageSchema } from "@/lib/schema";
import { STORE_NAME } from "@/lib/constants";

const title = "سياسة ملفات تعريف الارتباط";
const description = "سياسة ملفات تعريف الارتباط (Cookies) في GStore Q8 - الكويت.";
const path = "/legal/cookies";

export const metadata = legalMetadata(title, description, path);

export default function CookiesPage() {
  return (
    <>
      <JsonLd data={webPageSchema(title, description, path)} />
      <LegalLayout title={title}>
        <section>
          <h2 className="text-lg font-black text-[#333]">1. ما هي ملفات تعريف الارتباط؟</h2>
          <p>
            ملفات تعريف الارتباط (Cookies) هي ملفات نصية صغيرة تُخزَّن على جهازك عند زيارة موقع
            {STORE_NAME}. تساعدنا على تحسين تجربة التصفح وتذكر بعض التفضيلات.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-black text-[#333]">2. أنواع ملفات تعريف الارتباط التي نستخدمها</h2>
          <ul className="list-disc space-y-2 pr-5">
            <li>
              <strong>ضرورية:</strong> مطلوبة لتشغيل الموقع، مثل حفظ محتويات سلة التسوق في
              المتصفح (localStorage).
            </li>
            <li>
              <strong>وظيفية:</strong> تذكر تفضيلاتك لتحسين تجربة الاستخدام.
            </li>
            <li>
              <strong>تحليلية:</strong> تساعدنا على فهم كيفية استخدام الزوار للموقع (إن وُجدت).
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-black text-[#333]">3. التخزين المحلي (localStorage)</h2>
          <p>
            نستخدم التخزين المحلي في متصفحك لحفظ منتجات سلة التسوق. هذه البيانات تبقى على جهازك
            ولا تُرسل إلى خوادمنا إلا عند إتمام الطلب عبر واتساب.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-black text-[#333]">4. إدارة ملفات تعريف الارتباط</h2>
          <p>
            يمكنك حذف أو تعطيل ملفات تعريف الارتباط من إعدادات متصفحك. قد يؤثر ذلك على بعض
            وظائف الموقع مثل حفظ السلة.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-black text-[#333]">5. التحديثات</h2>
          <p>
            قد نحدّث هذه السياسة من وقت لآخر. يرجى مراجعتها دورياً. للاستفسارات، راجع{" "}
            <a href="/legal/privacy" className="text-[#e53935] hover:underline">
              سياسة الخصوصية
            </a>
            .
          </p>
        </section>
      </LegalLayout>
    </>
  );
}
