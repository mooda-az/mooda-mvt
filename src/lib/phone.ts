// Azərbaycan mobil nömrəsi: +994 və operator kodu, ardınca 7 rəqəm.
const MOBILE = /^(?:\+?994|0)?(10|50|51|55|60|70|77|99)(\d{7})$/;

export function normalizePhone(input: string): string | null {
  const match = input.replace(/[\s()-]/g, "").match(MOBILE);
  return match ? `+994${match[1]}${match[2]}` : null;
}
