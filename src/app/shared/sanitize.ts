// Input hardening for the /contact form (owner request, 19 Oct 2026).
//
// Important context: this site has no database or backend of its own — the
// form POSTs straight to Web3Forms over JSON (see WEB3FORMS_ENDPOINT in
// shared/contact.ts), which is a third-party SaaS API, not a SQL query we
// build. So classic SQL injection ("' OR '1'='1", etc.) has nothing to
// inject into on our side; there's no query string for it to break out of.
//
// What IS a real risk for any contact form, regardless of backend:
// 1. Stored/reflected-style XSS — if a submitted value ever gets rendered
//    as HTML somewhere downstream (a notification email client, an admin
//    dashboard, a future "view submissions" page), unescaped `<script>` or
//    `<img onerror=...>` text could execute. We neutralise this by encoding
//    HTML-special characters before the value leaves the browser.
// 2. Email/header injection — a value containing a raw CR/LF could, in a
//    naively-built outbound email, inject extra headers (e.g. a fake
//    "Bcc:" line). We strip CR/LF (and other control characters) from
//    every single-line field. The Message field is multi-line by design,
//    so it keeps its newlines but still has control characters stripped.
// 3. Oversized payloads — each field is capped to a sane max length.
//
// This is defense-in-depth on top of Web3Forms' own server-side handling,
// not a replacement for it.

const HTML_ESCAPES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
};

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (char) => HTML_ESCAPES[char]);
}

// Strips all C0/C1 control characters (including CR/LF) except the ones the
// caller explicitly keeps (sanitizeMultiline keeps \n).
function stripControlChars(value: string, keep: readonly string[] = []): string {
  return Array.from(value)
    .filter((char) => keep.includes(char) || char.codePointAt(0)! >= 0x20)
    .join('')
    .replace(/[\x7f-\x9f]/g, ''); // DEL + C1 controls not caught by the codepoint check above
}

export const FIELD_MAX_LENGTHS = {
  name: 100,
  phone: 20,
  email: 100,
  venue: 150,
  message: 3000,
} as const;

/** For single-line fields (name, phone, email, venue): no newlines allowed. */
export function sanitizeLine(value: string, maxLength: number): string {
  const trimmed = stripControlChars(value).trim();
  return escapeHtml(trimmed).slice(0, maxLength);
}

/** For the Message textarea: newlines are legitimate, everything else is stripped. */
export function sanitizeMultiline(value: string, maxLength: number): string {
  const trimmed = stripControlChars(value, ['\n']).trim();
  return escapeHtml(trimmed).slice(0, maxLength);
}
