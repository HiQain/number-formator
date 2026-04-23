export function normalizePhoneNumber(input: string): string {
  const digits = input.replace(/\D/g, "");
  if (digits.length === 11 && digits.startsWith("1")) {
    return digits.substring(1);
  }
  return digits;
}

export function isValidPhoneNumber(digits: string): boolean {
  return digits.length === 10;
}

export function formatPhoneNumber(digits: string, format: string): string {
  if (!isValidPhoneNumber(digits)) return digits;
  
  const match = digits.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (!match) return digits;
  
  const [, area, prefix, line] = match;
  
  switch (format) {
    case "(555) 123-4567":
      return `(${area}) ${prefix}-${line}`;
    case "555-123-4567":
      return `${area}-${prefix}-${line}`;
    case "555.123.4567":
      return `${area}.${prefix}.${line}`;
    case "+15551234567":
      return `+1${area}${prefix}${line}`;
    default:
      return `(${area}) ${prefix}-${line}`;
  }
}
