export function formatUsername(name) {
  if (!name || typeof name !== "string") throw new Error("Invalid name");
  return name.trim().toLowerCase().replace(/\s+/g, "_");
}

export function validateEmail(email) {
  if (!email || typeof email !== "string") return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
