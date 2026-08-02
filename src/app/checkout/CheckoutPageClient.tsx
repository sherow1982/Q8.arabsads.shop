"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import { useCart } from "@/context/CartContext";
import { buildWhatsAppOrderUrl } from "@/lib/whatsapp";
import { KUWAIT_GOVERNORATES } from "@/lib/kuwait-locations";
import { isValidKuwaitPhone } from "@/lib/phone";
import type { CustomerInfo } from "@/types/cart";
import { formatCartItemPrice, getItemLineTotal } from "@/types/cart";

const emptyCustomer: CustomerInfo = {
  name: "",
  phone: "",
  email: "",
  governorate: "",
  city: "",
  block: "",
  street: "",
  building: "",
  floor: "",
  apartment: "",
  notes: "",
};

export default function CheckoutPageClient() {
  const { items, total, isLoaded } = useCart();
  const [customer, setCustomer] = useState<CustomerInfo>(emptyCustomer);
  const [errors, setErrors] = useState<Partial<Record<keyof CustomerInfo, string>>>({});

  const cities = useMemo(
    () => KUWAIT_GOVERNORATES.find((g) => g.id === customer.governorate)?.cities ?? [],
    [customer.governorate]
  );

  function validate(): boolean {
    const next: Partial<Record<keyof CustomerInfo, string>> = {};
    if (!customer.name.trim()) next.name = "الاسم مطلوب";
    if (!customer.phone.trim()) next.phone = "رقم الهاتف مطلوب";
    else if (!isValidKuwaitPhone(customer.phone.trim())) {
      next.phone = "أدخل رقم كويتي صحيح (8 أرقام)";
    }
    if (!customer.governorate) next.governorate = "المحافظة مطلوبة";
    if (!customer.city) next.city = "المنطقة / المدينة مطلوبة";
    if (!customer.block.trim()) next.block = "رقم القطعة مطلوب";
    if (!customer.street.trim()) next.street = "اسم الشارع مطلوب";
    if (!customer.building.trim()) next.building = "رقم المبنى مطلوب";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate() || !items.length) return;
    const url = buildWhatsAppOrderUrl(items, customer);
    window.open(url, "_blank", "noopener,noreferrer");
  }

  function updateField(field: keyof CustomerInfo, value: string) {
    setCustomer((prev) => {
      const next = { ...prev, [field]: value };
      if (field === "governorate") next.city = "";
      return next;
    });
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  if (!isLoaded) {
    return (
      <div className="mx-auto max-w-[1400px] px-4 py-12 lg:px-6">
        <div className="h-64 animate-pulse rounded bg-[#f0f0f0]" />
      </div>
    );
  }

  if (!items.length) {
    return (
      <div className="mx-auto max-w-[1400px] px-4 py-16 text-center lg:px-6">
        <h1 className="text-2xl font-black text-[#333]">لا توجد منتجات للطلب</h1>
        <p className="mt-2 text-sm text-[#777]">أضف منتجات إلى السلة أولاً.</p>
        <Link href="/products" className="mt-6 inline-block rounded bg-[#333] px-8 py-3 text-sm font-bold text-white hover:bg-[#e53935]">
          تصفّح المنتجات
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-8 lg:px-6">
      <nav className="mb-4 text-xs text-[#888]">
        <Link href="/" className="hover:text-[#e53935]">الرئيسية</Link>
        <span className="mx-2">/</span>
        <Link href="/cart" className="hover:text-[#e53935]">السلة</Link>
        <span className="mx-2">/</span>
        <span className="text-[#555]">إتمام الطلب</span>
      </nav>

      <h1 className="mb-2 text-2xl font-black text-[#333]">إتمام الطلب</h1>
      <p className="mb-8 text-sm text-[#777]">التوصيل متاح داخل الكويت فقط 🇰🇼</p>

      <div className="grid gap-8 lg:grid-cols-5">
        <form onSubmit={handleSubmit} className="lg:col-span-3">
          <div className="rounded-sm border border-[#eee] bg-white p-6">
            <h2 className="mb-5 text-lg font-black text-[#333]">بيانات التوصيل</h2>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="الاسم الكامل *" error={errors.name}>
                <input
                  value={customer.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  className={inputClass(errors.name)}
                  placeholder="محمد أحمد"
                />
              </Field>

              <Field label="رقم الهاتف (كويت) *" error={errors.phone}>
                <div className="flex overflow-hidden rounded border border-[#ddd] focus-within:border-[#333]">
                  <span className="flex items-center bg-[#f5f5f5] px-3 text-sm font-bold text-[#555]" dir="ltr">
                    +965
                  </span>
                  <input
                    value={customer.phone}
                    onChange={(e) => updateField("phone", e.target.value.replace(/[^\d\s-]/g, ""))}
                    type="tel"
                    dir="ltr"
                    maxLength={12}
                    className={`w-full px-3 py-2.5 text-sm outline-none ${errors.phone ? "border-[#e53935]" : ""}`}
                    placeholder="XXXX XXXX"
                  />
                </div>
              </Field>

              <Field label="البريد الإلكتروني" className="sm:col-span-2">
                <input
                  value={customer.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  type="email"
                  dir="ltr"
                  className={inputClass()}
                  placeholder="email@example.com"
                />
              </Field>

              <Field label="المحافظة *" error={errors.governorate}>
                <select
                  value={customer.governorate}
                  onChange={(e) => updateField("governorate", e.target.value)}
                  className={inputClass(errors.governorate)}
                >
                  <option value="">اختر المحافظة</option>
                  {KUWAIT_GOVERNORATES.map((g) => (
                    <option key={g.id} value={g.id}>{g.name}</option>
                  ))}
                </select>
              </Field>

              <Field label="المنطقة / المدينة *" error={errors.city}>
                <select
                  value={customer.city}
                  onChange={(e) => updateField("city", e.target.value)}
                  disabled={!customer.governorate}
                  className={`${inputClass(errors.city)} disabled:bg-[#f5f5f5] disabled:text-[#999]`}
                >
                  <option value="">اختر المنطقة</option>
                  {cities.map((city) => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </Field>

              <Field label="رقم القطعة *" error={errors.block}>
                <input
                  value={customer.block}
                  onChange={(e) => updateField("block", e.target.value)}
                  className={inputClass(errors.block)}
                  placeholder="مثال: 3"
                  inputMode="numeric"
                />
              </Field>

              <Field label="الشارع *" error={errors.street}>
                <input
                  value={customer.street}
                  onChange={(e) => updateField("street", e.target.value)}
                  className={inputClass(errors.street)}
                  placeholder="اسم الشارع"
                />
              </Field>

              <Field label="رقم المبنى / المنزل *" error={errors.building}>
                <input
                  value={customer.building}
                  onChange={(e) => updateField("building", e.target.value)}
                  className={inputClass(errors.building)}
                  placeholder="مثال: 12"
                />
              </Field>

              <Field label="الدور">
                <input
                  value={customer.floor}
                  onChange={(e) => updateField("floor", e.target.value)}
                  className={inputClass()}
                  placeholder="اختياري"
                />
              </Field>

              <Field label="الشقة">
                <input
                  value={customer.apartment}
                  onChange={(e) => updateField("apartment", e.target.value)}
                  className={inputClass()}
                  placeholder="اختياري"
                />
              </Field>

              <Field label="ملاحظات إضافية" className="sm:col-span-2">
                <textarea
                  value={customer.notes}
                  onChange={(e) => updateField("notes", e.target.value)}
                  rows={3}
                  className={inputClass()}
                  placeholder="وقت التوصيل المفضل، تعليمات إضافية..."
                />
              </Field>
            </div>
          </div>

          <div className="mt-6 rounded-sm border border-[#25D366]/30 bg-[#f0fdf4] p-4">
            <p className="text-sm leading-7 text-[#333]">
              <span className="font-black text-[#25D366]">📱 الطلب عبر واتساب</span>
              <br />
              بعد الضغط على &quot;إرسال الطلب عبر واتساب&quot; سيتم فتح واتساب مع رسالة جاهزة تحتوي على
              بياناتك الكاملة (المحافظة، القطعة، العنوان) ومنتجاتك وأسعارها وروابطها.
            </p>
          </div>

          <button
            type="submit"
            className="mt-6 flex w-full items-center justify-center gap-2 rounded bg-[#25D366] py-4 text-sm font-black text-white hover:bg-[#20bd5a] sm:w-auto sm:px-10"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.881 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            إرسال الطلب عبر واتساب
          </button>
        </form>

        <div className="lg:col-span-2">
          <div className="sticky top-24 rounded-sm border border-[#eee] bg-[#fafafa] p-6">
            <h2 className="text-lg font-black text-[#333]">ملخص الطلب</h2>
            <ul className="mt-4 space-y-3">
              {items.map((item) => (
                <li key={item.id} className="flex gap-3 border-b border-[#eee] pb-3 last:border-0">
                  {item.image ? (
                    <img src={item.image} alt="" className="h-14 w-14 shrink-0 rounded border border-[#eee] bg-white object-contain p-1" />
                  ) : null}
                  <div className="min-w-0 flex-1">
                    <p className="line-clamp-2 text-xs font-bold text-[#333]">{item.title}</p>
                    <p className="mt-1 text-xs text-[#666]">
                      {item.quantity} × KD {formatCartItemPrice(item)} = KD {getItemLineTotal(item).toFixed(3)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex justify-between border-t border-[#eee] pt-4">
              <span className="font-black">المجموع</span>
              <span className="text-xl font-black">KD {total.toFixed(3)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function inputClass(error?: string) {
  return `w-full rounded border px-4 py-2.5 text-sm outline-none focus:border-[#333] ${
    error ? "border-[#e53935]" : "border-[#ddd]"
  }`;
}

function Field({
  label,
  error,
  className = "",
  children,
}: {
  label: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <label className="mb-1.5 block text-xs font-bold text-[#555]">{label}</label>
      {children}
      {error ? <p className="mt-1 text-xs text-[#e53935]">{error}</p> : null}
    </div>
  );
}
