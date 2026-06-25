import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ADMIN_COOKIE, verifySessionToken } from "@/app/lib/admin-auth";

// Paths that must remain reachable without a session, so a logged-out user can
// actually sign in (and sign out).
const PUBLIC_PATHS = new Set(["/admin/login", "/api/admin/login", "/api/admin/logout"]);

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    if (PUBLIC_PATHS.has(pathname)) {
        return NextResponse.next();
    }

    const token = request.cookies.get(ADMIN_COOKIE)?.value;
    const isAuthed = await verifySessionToken(token);

    if (isAuthed) {
        return NextResponse.next();
    }

    // API routes get a clean 401; page routes get redirected to the login form.
    if (pathname.startsWith("/api/")) {
        return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
}

export const config = {
    matcher: ["/admin/:path*", "/api/admin/:path*"],
};
