"use client";

import { FormEvent, useEffect, useState } from "react";
import { buildWhatsAppInquiryUrlFromForm } from "@/lib/whatsapp";
import { isValidKuwaitPhone } from "@/lib/phone";
import { emptyInquiry, type InquiryInfo, type ProductInquiryContext } from "@/types/inquiry";

type Props = {
  open: boolean;
  onClose: () => void;
  product?: ProductInquiryContext | null;
};

export default function WhatsAppInquiryModal({ open, onClose, product }: Props) {
  const [inquiry, setInquiry] = useState<InquiryInfo>(emptyInquiry);
  const [errors, setErrors] = useState<Partial<Record<keyof InquiryInfo, string>>>({});

  useEffect(() => {
    if (!open) {
      setInquiry(emptyInquiry);
      setErrors({});
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  function validate(): boolean {
    const next: Partial<Record<keyof InquiryInfo, string>> = {};
    if (!inquiry.name.trim()) next.name = "الاسم مطلوب";
    if (!inquiry.phone.trim()) next.phone = "رقم الهاتف مطلوب";
    else if (!isValidKuwaitPhone(inquiry.phone.trim())) {
      next.phone = "أدخل رقم كويتي صحيح (8 أرقام)";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    const url = buildWhatsAppInquiryUrlFromForm(inquiry, product ?? undefined);
    window.open(url, "_blank", "noopener,noreferrer");
    onClose();
  }

  return (
    <div
      className="fixed inset-0 z-[70] flex items-end justify-center bg-black/50 p-4 sm:items-center"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="whatsapp-inquiry-title"
      >
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <h2 id="whatsapp-inquiry-title" className="text-lg font-black text-[#333]">
              {product ? "استفسار عن المنتج" : "تواصل عبر واتساب"}
            </h2>
            <p className="mt-1 text-xs text-[#777]">
              أدخل بياناتك وسيتم إرسال رسالة جاهزة عبر واتساب
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded p-1 text-[#999] hover:bg-[#f5f5f5] hover:text-[#333]"
            aria-label="إغلاق"
          >
            ✕
          </button>
        </div>

        {product ? (
          <div className="mb-4 rounded-sm border border-[#eee] bg-[#fafafa] p-3 text-sm">
            <p className="line-clamp-2 font-bold text-[#333]">{product.title}</p>
            <p className="mt-1 text-xs text-[#666]">KD {product.price}</p>
            <a
              href={product.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 block truncate text-xs text-[#e53935] hover:underline"
              dir="ltr"
            >
              {product.link}
            </a>
          </div>
        ) : null}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Field label="الاسم الكامل *" error={errors.name}>
            <input
              value={inquiry.name}
              onChange={(e) => {
                setInquiry((prev) => ({ ...prev, name: e.target.value }));
                if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
              }}
              className={inputClass(errors.name)}
              placeholder="محمد أحمد"
              autoFocus
            />
          </Field>

          <Field label="رقم الهاتف (كويت) *" error={errors.phone}>
            <div className="flex overflow-hidden rounded border border-[#ddd] focus-within:border-[#333]">
              <span className="flex items-center bg-[#f5f5f5] px-3 text-sm font-bold text-[#555]" dir="ltr">
                +965
              </span>
              <input
                value={inquiry.phone}
                onChange={(e) => {
                  setInquiry((prev) => ({ ...prev, phone: e.target.value.replace(/[^\d\s-]/g, "") }));
                  if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
                }}
                type="tel"
                dir="ltr"
                maxLength={12}
                className="w-full px-3 py-2.5 text-sm outline-none"
                placeholder="XXXX XXXX"
              />
            </div>
          </Field>

          <Field label="البريد الإلكتروني (اختياري)">
            <input
              value={inquiry.email}
              onChange={(e) => setInquiry((prev) => ({ ...prev, email: e.target.value }))}
              type="email"
              dir="ltr"
              className={inputClass()}
              placeholder="example@email.com"
            />
          </Field>

          <Field label="ملاحظات (اختياري)">
            <textarea
              value={inquiry.notes}
              onChange={(e) => setInquiry((prev) => ({ ...prev, notes: e.target.value }))}
              rows={3}
              className={inputClass()}
              placeholder={product ? "مثال: هل المنتج متوفر؟ وقت التوصيل؟" : "اكتب استفسارك..."}
            />
          </Field>

          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded bg-[#25D366] py-3 text-sm font-black text-white hover:bg-[#20bd5a]"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.881 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            فتح واتساب
          </button>
        </form>
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
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-bold text-[#555]">{label}</label>
      {children}
      {error ? <p className="mt-1 text-xs text-[#e53935]">{error}</p> : null}
    </div>
  );
}
