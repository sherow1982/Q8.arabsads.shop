/** Kuwait phone: 8 digits, optional +965 / 965 prefix. Mobile: 5/6/9, landline: 2/4. */
export function normalizeKuwaitPhone(phone: string): string {
  const cleaned = phone.replace(/[\s-]/g, "");
  const match = cleaned.match(/^(\+965|965)?(\d{8})$/);
  if (!match) return cleaned;
  return `+965${match[2]}`;
}

export function isValidKuwaitPhone(phone: string): boolean {
  const cleaned = phone.replace(/[\s-]/g, "");
  return /^(\+965|965)?[245569]\d{7}$/.test(cleaned);
}

export function formatKuwaitPhoneDisplay(phone: string): string {
  const normalized = normalizeKuwaitPhone(phone);
  const digits = normalized.replace("+965", "");
  if (digits.length !== 8) return phone;
  return `+965 ${digits.slice(0, 4)} ${digits.slice(4)}`;
}
