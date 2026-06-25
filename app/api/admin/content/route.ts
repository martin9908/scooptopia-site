import { NextResponse } from "next/server";
import { getSiteContent, saveSiteContent } from "@/app/lib/site-content-store";

export async function GET() {
    try {
        const content = await getSiteContent();
        return NextResponse.json(content);
    } catch {
        return NextResponse.json({ error: "Failed to load content from storage." }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const payload = await request.json();
        const saved = await saveSiteContent(payload);
        return NextResponse.json(saved);
    } catch {
        return NextResponse.json({ error: "Invalid content payload." }, { status: 400 });
    }
}
