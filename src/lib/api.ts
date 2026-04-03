// src/lib/api.ts
// Frontend fetch() wrappers for the three Vercel serverless functions.
// All endpoints live at /api/* on the same domain — no CORS needed.
import type { JoinFormData, ContactFormData, SupportFormData } from "../types";

const API_BASE = "/api";

async function post<T>(path: string, data: T): Promise<void> {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error((body as { error?: string }).error ?? "Submission failed");
  }
}

/** Submit the alumni join / signup form → POST /api/join */
export function submitJoinForm(data: JoinFormData & { website_url?: string }): Promise<void> {
  return post("/join", data);
}

/** Submit the contact form → POST /api/contact */
export function submitContactForm(data: ContactFormData & { phone?: string }): Promise<void> {
  return post("/contact", data);
}

/** Submit the Give Back form → POST /api/support */
export function submitSupportForm(
  data: SupportFormData & { company_name?: string },
): Promise<void> {
  return post("/support", data);
}
