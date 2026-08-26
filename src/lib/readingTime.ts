export function calculateReadingTime(body: string): number {
  const cleanText = body
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`[^`]*`/g, '')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/[#>*_~\-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  const wordCount = cleanText
    ? cleanText.split(/\s+/).length
    : 0;

  return Math.max(1, Math.ceil(wordCount / 200));
}
