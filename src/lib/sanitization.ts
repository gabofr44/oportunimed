const HTML_TAG_REGEX = /<[^>]*>/g;
const SCRIPT_REGEX = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
const EVENT_HANDLER_REGEX = /\s*on\w+\s*=\s*["'][^"']*["']/gi;
const DANGEROUS_ATTRS = /javascript\s*:/gi;

export function sanitize(input: string): string {
  return input
    .replace(SCRIPT_REGEX, "")
    .replace(EVENT_HANDLER_REGEX, "")
    .replace(DANGEROUS_ATTRS, "")
    .replace(HTML_TAG_REGEX, "")
    .trim();
}

export function sanitizeHtml(input: string): string {
  const ALLOWED_TAGS = ["b", "i", "em", "strong", "a", "p", "br", "ul", "ol", "li"];

  return input
    .replace(SCRIPT_REGEX, "")
    .replace(EVENT_HANDLER_REGEX, "")
    .replace(DANGEROUS_ATTRS, "")
    .replace(/<\/?([a-zA-Z][a-zA-Z0-9]*)\b[^>]*>/g, (match, tag) => {
      if (ALLOWED_TAGS.includes(tag.toLowerCase())) {
        return match;
      }
      return "";
    })
    .trim();
}
