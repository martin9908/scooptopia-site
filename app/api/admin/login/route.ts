import { NextResponse } from "next/server";
import {
    ADMIN_COOKIE,
    SESSION_MAX_AGE_SECONDS,
    createSessionToken,
    getAdminPassword,
    verifyPassword,
} from "@/app/lib/admin-auth";

export async function POST(request: Request) {
    if (!getAdminPassword()) {
        return NextResponse.json(
            { error: "Admin login is not configured. Set ADMIN_PASSWORD." },
            { status: 503 }
        );
    }

    let password = "";
    try {
        const body = (await request.json()) as { password?: unknown };
        password = typeof body.password === "string" ? body.password : "";
    } catch {
        return NextResponse.json({ error: "Invalid request." }, { status: 400 });
    }

    if (!verifyPassword(password)) {
        return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
    }

    const token = await createSessionToken();
    if (!token) {
        return NextResponse.json({ error: "Could not start session." }, { status: 500 });
    }

    const response = NextResponse.json({ ok: true });
    response.cookies.set(ADMIN_COOKIE, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: SESSION_MAX_AGE_SECONDS,
    });
    return response;
}
