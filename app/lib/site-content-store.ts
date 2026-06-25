import "server-only";

import { createClient } from "@supabase/supabase-js";
import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";

export type HomeSlide = {
    label: string;
    title: string;
    description: string;
    primaryImage: {
        src: string;
        alt: string;
    };
    secondaryImage: {
        src: string;
        alt: string;
    };
    eyebrow: string;
    points: string[];
};

export type ClassicSlide = {
    title: string;
    description: string;
    badge: string;
    image: {
        src: string;
        alt: string;
    };
    stats: [string, string];
};

export type SiteContent = {
    assets: {
        stationCollageImage: string;
    };
    home: {
        featuredFoods: string[];
        eventTypes: Array<{ title: string; description: string; icon: "party" | "wedding" | "corporate" }>;
        packages: Array<{ name: string; guestCount: string; stations: string; setup: string; staffing: string }>;
        testimonials: Array<{ quote: string; name: string; event: string }>;
        gallery: string[];
        heroSlides: HomeSlide[];
        stationNames: string[];
    };
    classic: {
        featuredFoods: Array<{ name: string; desc: string }>;
        eventTypes: Array<{ title: string; description: string; icon: "party" | "wedding" | "corporate" }>;
        packages: Array<{
            name: string;
            guestCount: string;
            stations: string;
            setup: string;
            staffing: string;
            highlight: boolean;
        }>;
        testimonials: Array<{ quote: string; name: string; event: string; rating: number }>;
        stations: Array<{ name: string; desc: string }>;
        gallery: Array<{ label: string; tall: boolean }>;
        heroSlides: ClassicSlide[];
    };
};

export const defaultSiteContent: SiteContent = {
    assets: {
        stationCollageImage: "/media/station-collage.svg",
    },
    home: {
        featuredFoods: ["Isaw", "Fish Balls", "Squid Balls", "Kwek-Kwek", "BBQ", "Lumpia", "Pancit", "Halo-Halo", "Sorbetes"],
        eventTypes: [
            {
                title: "Family Celebrations",
                description: "Birthdays, reunions, and milestone gatherings with kalsada favorites.",
                icon: "party",
            },
            {
                title: "Weddings",
                description: "A refined Filipino street food experience designed for joyful receptions.",
                icon: "wedding",
            },
            {
                title: "Corporate Events",
                description: "Efficient and polished setups for teams, clients, and community partners.",
                icon: "corporate",
            },
        ],
        packages: [
            {
                name: "Barkada",
                guestCount: "Up to 50 guests",
                stations: "2 street food stations",
                setup: "Styled setup included",
                staffing: "2 service staff",
            },
            {
                name: "Fiesta",
                guestCount: "Up to 120 guests",
                stations: "4 street food stations",
                setup: "Full setup and breakdown",
                staffing: "4 service staff",
            },
            {
                name: "Grand Salu-Salo",
                guestCount: "120+ guests",
                stations: "Custom station mix",
                setup: "Premium event styling",
                staffing: "Dedicated event team",
            },
        ],
        testimonials: [
            {
                quote: "Scooptopia made our wedding reception unforgettable. The setup looked elegant, and every guest kept coming back for seconds.",
                name: "Paolo and Trina",
                event: "Wedding Reception",
            },
            {
                quote: "The food brought our whole family back to Manila memories. Professional team, warm service, and flavors that hit home.",
                name: "The Dela Cruz Family",
                event: "Family Reunion",
            },
            {
                quote: "Our company event felt elevated without losing the fun street food vibe. Great flow, great taste, and great people.",
                name: "Marissa Lim",
                event: "Corporate Mixer",
            },
        ],
        gallery: ["Birthday Setup", "Wedding Service", "Corporate Catering", "Community Booth", "Family Gathering", "Dessert Station"],
        heroSlides: [
            {
                label: "Filipino Street Food Catering",
                title: "Filipino Street Food, Reimagined for Every Celebration",
                description: "From favorite kalsada eats to unforgettable occasions, Scooptopia brings authentic Filipino flavor to events that feel warm, vibrant, and elevated.",
                primaryImage: {
                    src: "/media/hero-plate.svg",
                    alt: "Scooptopia plated Filipino street food presentation",
                },
                secondaryImage: {
                    src: "/media/event-table.svg",
                    alt: "Elegant Filipino event table styling",
                },
                eyebrow: "Why families and planners choose us",
                points: [
                    "Professionally managed catering for private and corporate events",
                    "Authentic Filipino flavors served with polished presentation",
                    "Flexible packages for intimate gatherings to large celebrations",
                ],
            },
            {
                label: "Event-Ready Food Stations",
                title: "Interactive Catering Designed for Real Guest Energy",
                description: "Our station layouts are built to keep lines moving, tables lively, and every serving looking polished from first plate to last call.",
                primaryImage: {
                    src: "/media/station-collage.svg",
                    alt: "Scooptopia station collage for celebrations and events",
                },
                secondaryImage: {
                    src: "/media/hero-plate.svg",
                    alt: "Filipino street food hero presentation detail",
                },
                eyebrow: "Built for lively service flow",
                points: [
                    "Interactive food stations that keep guests engaged",
                    "Layouts designed for fast service and polished presentation",
                    "Menus that scale from family parties to corporate programs",
                ],
            },
            {
                label: "Premium Filipino Hospitality",
                title: "A Warm, Memorable Setup for Weddings, Birthdays, and Corporate Events",
                description: "Scooptopia pairs authentic Filipino street food with thoughtful presentation, reliable staffing, and a smoother event experience for hosts.",
                primaryImage: {
                    src: "/media/event-table.svg",
                    alt: "Scooptopia event styling and dessert presentation",
                },
                secondaryImage: {
                    src: "/media/station-collage.svg",
                    alt: "Filipino food station collage",
                },
                eyebrow: "Premium feel, warm hospitality",
                points: [
                    "Setup, staffing, and guest experience handled by one team",
                    "A warm Filipino street food concept elevated for modern events",
                    "Designed to feel memorable without losing cultural authenticity",
                ],
            },
        ],
        stationNames: ["Street Grill", "Fried Favorites", "Noodle Bar", "Dessert Corner"],
    },
    classic: {
        featuredFoods: [
            { name: "Isaw", desc: "Grilled chicken or pork intestines seasoned with a tangy vinegar dip." },
            { name: "Fish Balls", desc: "Crispy fish balls served with sweet, spicy, or vinegar sauce." },
            { name: "Squid Balls", desc: "Tender squid balls on bamboo skewers, a kalsada classic." },
            { name: "Kwek-Kwek", desc: "Deep-fried quail eggs coated in orange batter, served with sauce." },
            { name: "BBQ", desc: "Marinated pork skewers grilled over charcoal, smoky and sweet." },
            { name: "Lumpia", desc: "Crispy Filipino spring rolls filled with pork and vegetables." },
            { name: "Pancit", desc: "Stir-fried noodles with vegetables and protein, packed with flavor." },
            { name: "Halo-Halo", desc: "Classic Filipino shaved ice dessert with beans, fruit, and leche flan." },
            { name: "Sorbetes", desc: "Traditional Filipino street ice cream in purple yam, cheese, and coconut." },
        ],
        eventTypes: [
            { title: "Family Celebrations", description: "Birthdays, reunions, and milestone gatherings with kalsada favorites.", icon: "party" },
            { title: "Weddings", description: "A refined Filipino street food experience designed for joyful receptions.", icon: "wedding" },
            { title: "Corporate Events", description: "Efficient and polished setups for teams, clients, and community partners.", icon: "corporate" },
        ],
        packages: [
            { name: "Barkada", guestCount: "Up to 50 guests", stations: "2 street food stations", setup: "Styled setup included", staffing: "2 service staff", highlight: false },
            { name: "Fiesta", guestCount: "Up to 120 guests", stations: "4 street food stations", setup: "Full setup and breakdown", staffing: "4 service staff", highlight: true },
            { name: "Grand Salu-Salo", guestCount: "120+ guests", stations: "Custom station mix", setup: "Premium event styling", staffing: "Dedicated event team", highlight: false },
        ],
        testimonials: [
            { quote: "Scooptopia made our wedding reception unforgettable. The setup looked elegant, and every guest kept coming back for seconds.", name: "Paolo and Trina", event: "Wedding Reception", rating: 5 },
            { quote: "The food brought our whole family back to Manila memories. Professional team, warm service, and flavors that hit home.", name: "The Dela Cruz Family", event: "Family Reunion", rating: 5 },
            { quote: "Our company event felt elevated without losing the fun street food vibe. Great flow, great taste, and great people.", name: "Marissa Lim", event: "Corporate Mixer", rating: 5 },
        ],
        stations: [
            { name: "Street Grill", desc: "BBQ skewers, isaw, and grilled favorites over open flame." },
            { name: "Fried Favorites", desc: "Fish balls, kwek-kwek, and crispy lumpia served to order." },
            { name: "Noodle Bar", desc: "Pancit Canton and bihon tossed fresh with vegetables and protein." },
            { name: "Dessert Corner", desc: "Halo-halo, sorbetes, and Filipino sweets to close the meal." },
        ],
        gallery: [
            { label: "Birthday Setup", tall: true },
            { label: "Wedding Service", tall: false },
            { label: "Corporate Catering", tall: false },
            { label: "Community Booth", tall: true },
            { label: "Family Gathering", tall: false },
            { label: "Dessert Station", tall: false },
        ],
        heroSlides: [
            {
                title: "Bold Filipino Flavors for Every Celebration",
                description: "Authentic Filipino street food catering for weddings, birthdays, corporate mixers, and community gatherings.",
                badge: "Filipino Street Food Catering",
                image: {
                    src: "/media/hero-plate.svg",
                    alt: "Scooptopia plated Filipino street food presentation",
                },
                stats: ["Street food stations", "Warm, polished service"],
            },
            {
                title: "Service That Moves With the Event",
                description: "Designed for smooth guest flow, lively stations, and a banner experience that feels active without being busy.",
                badge: "Event Flow & Styling",
                image: {
                    src: "/media/station-collage.svg",
                    alt: "Scooptopia station collage for celebrations and events",
                },
                stats: ["Fast setup", "Friendly staffing"],
            },
            {
                title: "A Classic Banner for a Modern Filipino Brand",
                description: "A traditional web-style hero with a rotating banner and clear calls to action, tailored for Scooptopia.",
                badge: "Classic Banner",
                image: {
                    src: "/media/event-table.svg",
                    alt: "Elegant Filipino event table styling",
                },
                stats: ["Elegant presentation", "Simple, direct messaging"],
            },
        ],
    },
};

const contentPath = path.join(process.cwd(), "data", "site-content.json");
const supabaseTable = "site_content";
const supabaseRowId = "primary";

export const storageBucket = process.env.SUPABASE_STORAGE_BUCKET ?? "site-assets";

function getSupabaseConfig() {
    const url = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!url || !serviceRoleKey) {
        return null;
    }

    return { url, serviceRoleKey };
}

export function getSupabaseAdminClient() {
    const config = getSupabaseConfig();
    if (!config) {
        return null;
    }

    return createClient(config.url, config.serviceRoleKey, {
        auth: {
            persistSession: false,
            autoRefreshToken: false,
        },
    });
}

function normalizeSiteContent(input: unknown): SiteContent {
    if (!input || typeof input !== "object") {
        return defaultSiteContent;
    }

    const raw = input as Partial<SiteContent>;
    return {
        ...defaultSiteContent,
        ...raw,
        assets: { ...defaultSiteContent.assets, ...(raw.assets ?? {}) },
        home: { ...defaultSiteContent.home, ...(raw.home ?? {}) },
        classic: { ...defaultSiteContent.classic, ...(raw.classic ?? {}) },
    };
}

export async function getSiteContent(): Promise<SiteContent> {
    const supabase = getSupabaseAdminClient();

    if (supabase) {
        const { data, error } = await supabase
            .from(supabaseTable)
            .select("content")
            .eq("id", supabaseRowId)
            .maybeSingle();

        if (error) {
            throw new Error(`Supabase read failed: ${error.message}`);
        }

        if (!data?.content) {
            const seeded = await saveSiteContent(defaultSiteContent);
            return seeded;
        }

        return normalizeSiteContent(data.content);
    }

    try {
        const file = await readFile(contentPath, "utf8");
        return normalizeSiteContent(JSON.parse(file));
    } catch {
        await mkdir(path.dirname(contentPath), { recursive: true });
        await writeFile(contentPath, JSON.stringify(defaultSiteContent, null, 2), "utf8");
        return defaultSiteContent;
    }
}

export async function saveSiteContent(payload: unknown): Promise<SiteContent> {
    const normalized = normalizeSiteContent(payload);

    const supabase = getSupabaseAdminClient();
    if (supabase) {
        const { error } = await supabase
            .from(supabaseTable)
            .upsert(
                {
                    id: supabaseRowId,
                    content: normalized,
                },
                { onConflict: "id" }
            );

        if (error) {
            throw new Error(`Supabase write failed: ${error.message}`);
        }

        return normalized;
    }

    await mkdir(path.dirname(contentPath), { recursive: true });
    await writeFile(contentPath, JSON.stringify(normalized, null, 2), "utf8");
    return normalized;
}
