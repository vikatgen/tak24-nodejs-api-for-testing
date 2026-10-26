export const ROLES = ["admin", "organizer", "attendee", "security"] as const;

export type Role = (typeof ROLES)[number];