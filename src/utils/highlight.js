// utils/highlight.ts
export function highlightKeywords(text, keywords = []) {
  if (!keywords.length) return text;

  const escaped = keywords.map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")); // Escape regex
  const pattern = new RegExp(`(${escaped.join("|")})`, "gi");

  return text.replace(pattern, "<mark>$1</mark>");
}
