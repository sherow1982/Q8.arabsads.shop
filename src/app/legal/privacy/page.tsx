import LegalLayout from "@/components/LegalLayout";
import JsonLd from "@/components/JsonLd";
import { legalMetadata } from "@/lib/legal";
import { webPageSchema } from "@/lib/schema";
import { STORE_EMAIL, STORE_NAME, STORE_PHONE_FULL } from "@/lib/constants";

const title = "سياسة الخصوصية";
const description = "سياسة الخصوصية وحماية البيانات في GStore Q8 - الكويت.";
const path = "/legal/privacy";

export const metadata = legalMetadata(title, description, path);

export default function PrivacyPage() {
  return (
    <>
      <JsonLd data={webPageSchema(title, description, path)} />
      <LegalLayout title={title}>
        <section>
          <h2 className="text-lg font-black text-[#333]">1. مقدمة</h2>
          <p>
            نحن في {STORE_NAME} («المتجر») نلتزم بحماية خصوصيتك. توضح هذه السياسة كيفية جمع
            واستخدام وحماية بياناتك الشخصية عند استخدام موقعنا الإلكتروني أو إتمام طلباتك داخل
            الكويت.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-black text-[#333]">2. البيانات التي نجمعها</h2>
          <ul className="list-disc space-y-2 pr-5">
            <li>الاسم الكامل ورقم الهاتف الكويتي</li>
            <li>عنوان التوصيل (المحافظة، المنطقة، القطعة، الشارع، المبنى)</li>
            <li>البريد الإلكتروني (اختياري)</li>
            <li>تفاصيل الطلب والمنتجات المختارة</li>
            <li>بيانات تقنية أساسية (نوع المتصفح، عنوان IP) لتحسين الأمان والأداء</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-black text-[#333]">3. كيف نستخدم بياناتك</h2>
          <ul className="list-disc space-y-2 pr-5">
            <li>معالجة وتسليم طلباتك داخل الكويت</li>
            <li>التواصل معك عبر الهاتف أو واتساب لتأكيد الطلب</li>
            <li>تحسين تجربة التسوق وخدمة العملاء</li>
            <li>الامتثال للمتطلبات القانونية المعمول بها في دولة الكويت</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-black text-[#333]">4. مشاركة البيانات</h2>
          <p>
            لا نبيع بياناتك لأطراف ثالثة. قد نشارك المعلومات الضرورية فقط مع شركات الشحن
            أو مزودي الدفع عند الحاجة لتنفيذ طلبك.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-black text-[#333]">5. التخزين والأمان</h2>
          <p>
            نستخدم إجراءات أمنية معقولة لحماية بياناتك. تُحفظ بيانات السلة محلياً في
            متصفحك، بينما تُرسل بيانات الطلب عبر واتساب بموافقتك عند إتمام الشراء.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-black text-[#333]">6. حقوقك</h2>
          <p>
            يحق لك طلب الوصول إلى بياناتك أو تصحيحها أو حذفها. للتواصل:{" "}
            <a href={`mailto:${STORE_EMAIL}`} className="text-[#e53935]">{STORE_EMAIL}</a>
            {" "}أو {STORE_PHONE_FULL}.
          </p>
        </section>
      </LegalLayout>
    </>
  );
}
