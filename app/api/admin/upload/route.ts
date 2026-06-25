import { NextResponse } from "next/server";
import { getSupabaseAdminClient, storageBucket } from "@/app/lib/site-content-store";

const MAX_BYTES = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml", "image/avif"]);

function sanitizeName(name: string): string {
    const dot = name.lastIndexOf(".");
    const base = (dot === -1 ? name : name.slice(0, dot)).toLowerCase();
    const ext = dot === -1 ? "" : name.slice(dot).toLowerCase();
    const safeBase = base.replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 60) || "image";
    const safeExt = /^\.[a-z0-9]+$/.test(ext) ? ext : "";
    return `${safeBase}${safeExt}`;
}

export async function POST(request: Request) {
    const supabase = getSupabaseAdminClient();
    if (!supabase) {
        return NextResponse.json(
            { error: "Supabase Storage is not configured. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY." },
            { status: 503 }
        );
    }

    let file: File | null = null;
    try {
        const formData = await request.formData();
        const value = formData.get("file");
        file = value instanceof File ? value : null;
    } catch {
        return NextResponse.json({ error: "Invalid upload request." }, { status: 400 });
    }

    if (!file) {
        return NextResponse.json({ error: "No file provided." }, { status: 400 });
    }
    if (!ALLOWED_TYPES.has(file.type)) {
        return NextResponse.json({ error: `Unsupported file type: ${file.type || "unknown"}.` }, { status: 415 });
    }
    if (file.size > MAX_BYTES) {
        return NextResponse.json({ error: "File is larger than 5MB." }, { status: 413 });
    }

    // Create the bucket on first use; ignore "already exists".
    const { error: bucketError } = await supabase.storage.createBucket(storageBucket, { public: true });
    if (bucketError && !/exist/i.test(bucketError.message)) {
        return NextResponse.json({ error: `Could not prepare storage: ${bucketError.message}` }, { status: 500 });
    }

    const objectPath = `uploads/${Date.now()}-${crypto.randomUUID().slice(0, 8)}-${sanitizeName(file.name)}`;

    const { error: uploadError } = await supabase.storage
        .from(storageBucket)
        .upload(objectPath, file, { contentType: file.type, upsert: false });

    if (uploadError) {
        return NextResponse.json({ error: `Upload failed: ${uploadError.message}` }, { status: 500 });
    }

    const { data } = supabase.storage.from(storageBucket).getPublicUrl(objectPath);
    return NextResponse.json({ url: data.publicUrl, path: objectPath });
}
