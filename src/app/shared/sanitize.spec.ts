import { FIELD_MAX_LENGTHS, sanitizeLine, sanitizeMultiline } from './sanitize';

describe('sanitizeLine', () => {
  it('HTML-escapes angle brackets, quotes and ampersands', () => {
    expect(sanitizeLine('<script>alert(1)</script>', 100)).toBe(
      '&lt;script&gt;alert(1)&lt;/script&gt;',
    );
    expect(sanitizeLine(`O'Brien & "Sons"`, 100)).toBe('O&#39;Brien &amp; &quot;Sons&quot;');
  });

  it('strips CR/LF and other control characters (email/header-injection guard)', () => {
    const input = 'Jane\r\nBcc: attacker@evil.test';
    expect(sanitizeLine(input, 100)).not.toContain('\r');
    expect(sanitizeLine(input, 100)).not.toContain('\n');
    expect(sanitizeLine(input, 100)).toBe('JaneBcc: attacker@evil.test');
  });

  it('trims surrounding whitespace', () => {
    expect(sanitizeLine('   Jane Tan   ', 100)).toBe('Jane Tan');
  });

  it('truncates to the given max length', () => {
    expect(sanitizeLine('a'.repeat(50), 10)).toBe('a'.repeat(10));
  });

  it('leaves an ordinary name untouched', () => {
    expect(sanitizeLine('Jane Tan', FIELD_MAX_LENGTHS.name)).toBe('Jane Tan');
  });
});

describe('sanitizeMultiline', () => {
  it('keeps newlines but strips other control characters', () => {
    const input = 'Line one\nLine two\r\nLine three\x00';
    const result = sanitizeMultiline(input, 1000);
    expect(result).toContain('\n');
    expect(result).not.toContain('\r');
    expect(result).not.toContain('\x00');
  });

  it('HTML-escapes content while preserving line breaks', () => {
    const result = sanitizeMultiline('Hi <b>there</b>\nSee you soon', 1000);
    expect(result).toBe('Hi &lt;b&gt;there&lt;/b&gt;\nSee you soon');
  });

  it('truncates to the given max length', () => {
    expect(sanitizeMultiline('a'.repeat(5000), 100).length).toBe(100);
  });
});
