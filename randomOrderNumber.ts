// utils/orderNumber.ts
export function generateOrderNumber(): string {
  // Get today's date in YYYYMMDD
  const now = new Date();
  const datePart = now
    .toISOString()
    .slice(0, 10)
    .replace(/-/g, ""); // e.g. 20250825

  // Generate a random 6-character alphanumeric string
  const randomPart = Math.random().toString(36).substring(2, 8).toUpperCase();

  // Combine with prefix
  return `ORD-${datePart}-${randomPart}`;
}
