import { v4 as uuid } from "uuid";
import { appendRow } from "../lib/sheets.js";
const ALLOWED_ORIGINS = [
    "https://alumni.bit.camp",
    "http://localhost:3000",
    "http://localhost:5173",
];
function setCors(req, res) {
    const origin = req.headers.origin ?? "";
    if (ALLOWED_ORIGINS.includes(origin)) {
        res.setHeader("Access-Control-Allow-Origin", origin);
    }
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}
export default async function handler(req, res) {
    setCors(req, res);
    if (req.method === "OPTIONS")
        return res.status(204).end();
    if (req.method !== "POST")
        return res.status(405).json({ error: "Method not allowed" });
    try {
        const { name, email, subject, message, 
        // honeypot — hidden via CSS; bots fill it, real users don't
        phone, } = req.body ?? {};
        // Honeypot
        if (phone)
            return res.status(200).json({ success: true });
        // Validation
        if (!name?.trim())
            return res.status(400).json({ error: "Name is required" });
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return res.status(400).json({ error: "Valid email is required" });
        }
        if (!message?.trim())
            return res.status(400).json({ error: "Message is required" });
        await appendRow("Contacts", [
            uuid(),
            name.trim(),
            email.trim().toLowerCase(),
            subject?.trim() || "(no subject)",
            message.trim(),
            new Date().toISOString(),
        ]);
        // Optional email notification via Resend
        // Remove this block if you prefer to just check the Sheet.
        if (process.env.RESEND_API_KEY && process.env.ADMIN_EMAIL) {
            await sendEmailNotification({ name, email, subject, message });
        }
        return res.status(200).json({ success: true });
    }
    catch (err) {
        console.error("[/api/contact] Error:", err);
        return res.status(500).json({ error: "Something went wrong. Please try again." });
    }
}
async function sendEmailNotification({ name, email, subject, message, }) {
    const r = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            from: "alumni@bit.camp",
            to: process.env.ADMIN_EMAIL,
            subject: `[Bitcamp Alumni] ${subject ?? "(no subject)"}`,
            text: `From: ${name} <${email}>\n\n${message}`,
        }),
    });
    if (!r.ok) {
        console.error("[/api/contact] Resend error:", await r.text());
    }
}
