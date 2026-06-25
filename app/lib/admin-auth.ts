// Shared admin session helpers. Used by both the Edge middleware and the
// Node API routes, so this module must stay framework-neutral: no "server-only",
// no Node-specific APIs — only the Web Crypto API available in every runtime.

export const ADMIN_COOKIE = "scooptopia_admin";
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 8; // 8 hours

const encoder = new TextEncoder();

export function getAdminPassword(): string | undefined {
    return process.env.ADMIN_PASSWORD;
}

// Sign with a dedicated secret when provided, otherwise fall back to the
// password itself (still a secret value). If neither exists, auth is impossible
// and every request is denied — a safe default.
export function getSessionSecret(): string | undefined {
    return process.env.ADMIN_SESSION_SECRET ?? process.env.ADMIN_PASSWORD;
}

function bufferToHex(buffer: ArrayBuffer): string {
    return Array.from(new Uint8Array(buffer))
        .map((byte) => byte.toString(16).padStart(2, "0"))
        .join("");
}

async function hmac(secret: string, data: string): Promise<string> {
    const key = await crypto.subtle.importKey(
        "raw",
        encoder.encode(secret),
        { name: "HMAC", hash: "SHA-256" },
        false,
        ["sign"]
    );
    const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(data));
    return bufferToHex(signature);
}

// Constant-time comparison to avoid leaking match progress via timing.
function timingSafeEqual(a: string, b: string): boolean {
    if (a.length !== b.length) {
        return false;
    }
    let mismatch = 0;
    for (let i = 0; i < a.length; i += 1) {
        mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
    }
    return mismatch === 0;
}

export function verifyPassword(input: string): boolean {
    const expected = getAdminPassword();
    if (!expected) {
        return false;
    }
    return timingSafeEqual(input, expected);
}

export async function createSessionToken(): Promise<string | null> {
    const secret = getSessionSecret();
    if (!secret) {
        return null;
    }
    const expiresAt = Date.now() + SESSION_MAX_AGE_SECONDS * 1000;
    const payload = `admin.${expiresAt}`;
    const signature = await hmac(secret, payload);
    return `${payload}.${signature}`;
}

export async function verifySessionToken(token: string | undefined | null): Promise<boolean> {
    if (!token) {
        return false;
    }
    const secret = getSessionSecret();
    if (!secret) {
        return false;
    }

    const parts = token.split(".");
    if (parts.length !== 3) {
        return false;
    }

    const [subject, expiresAtRaw, signature] = parts;
    const payload = `${subject}.${expiresAtRaw}`;
    const expected = await hmac(secret, payload);

    if (!timingSafeEqual(signature, expected)) {
        return false;
    }

    const expiresAt = Number(expiresAtRaw);
    if (!Number.isFinite(expiresAt) || expiresAt < Date.now()) {
        return false;
    }

    return subject === "admin";
}
