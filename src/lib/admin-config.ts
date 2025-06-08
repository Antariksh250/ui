export const ADMIN_EMAILS = [
  "antariksh250@gmail.com",
  "antarikshinfotech2024@gmail.com",
];

export function isAdminEmail(email: string): boolean {
  return ADMIN_EMAILS.includes(email.toLowerCase());
}
