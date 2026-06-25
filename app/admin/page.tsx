"use client";

import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { useRouter } from "next/navigation";
import type { SiteContent } from "@/app/lib/site-content-store";

type SaveStatus = "idle" | "loading" | "saving" | "saved" | "error";
type SectionTab = "assets" | "home" | "classic";
type PreviewTab = "home" | "classic";
type EventIcon = "party" | "wedding" | "corporate";

const inputBase =
    "w-full rounded-lg border border-[#173d36]/20 bg-white px-3 py-2 text-sm text-[#173d36] outline-none focus:border-[#c9a15c]";

const inputClass = `mt-1 ${inputBase}`;

const labelClass = "text-xs font-semibold uppercase tracking-[0.14em] text-[#173d36]/70";

const addButtonClass = "rounded border border-[#173d36]/25 px-3 py-1.5 text-xs font-semibold text-[#173d36] transition hover:bg-[#173d36]/5";

const removeButtonClass = "rounded border border-red-300 px-2 py-1 text-xs font-semibold text-red-700 transition hover:bg-red-50";

const iconOptions: EventIcon[] = ["party", "wedding", "corporate"];

function cloneContent(value: SiteContent): SiteContent {
    return JSON.parse(JSON.stringify(value)) as SiteContent;
}

/* ---------- small reusable field primitives ---------- */

function Field({
    label,
    value,
    onChange,
    placeholder,
    className,
}: {
    label: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
}) {
    return (
        <label className={className}>
            <span className={labelClass}>{label}</span>
            <input
                className={inputClass}
                value={value}
                placeholder={placeholder}
                onChange={(event) => onChange(event.target.value)}
            />
        </label>
    );
}

function ImageField({
    label,
    value,
    onChange,
    className,
}: {
    label: string;
    value: string;
    onChange: (value: string) => void;
    className?: string;
}) {
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState("");

    const handleFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        event.target.value = ""; // allow re-selecting the same file
        if (!file) {
            return;
        }

        setUploading(true);
        setError("");
        try {
            const formData = new FormData();
            formData.append("file", file);
            const response = await fetch("/api/admin/upload", { method: "POST", body: formData });
            const data = (await response.json().catch(() => ({}))) as { url?: string; error?: string };
            if (!response.ok || !data.url) {
                throw new Error(data.error || "Upload failed.");
            }
            onChange(data.url);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Upload failed.");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className={className}>
            <span className={labelClass}>{label}</span>
            <div className="mt-1 flex items-stretch gap-2">
                {value ? (
                    <div
                        aria-hidden
                        className="h-10 w-10 shrink-0 rounded-md border border-[#173d36]/15 bg-[#fbfaf8] bg-cover bg-center"
                        style={{ backgroundImage: `url("${value}")` }}
                    />
                ) : null}
                <input
                    className={inputBase}
                    value={value}
                    placeholder="/media/...svg or uploaded URL"
                    onChange={(event) => onChange(event.target.value)}
                />
                <label className="flex shrink-0 cursor-pointer items-center rounded border border-[#173d36]/25 px-3 text-xs font-semibold text-[#173d36] transition hover:bg-[#173d36]/5">
                    {uploading ? "Uploading…" : "Upload"}
                    <input type="file" accept="image/*" className="hidden" disabled={uploading} onChange={handleFile} />
                </label>
            </div>
            {error ? <p className="mt-1 text-xs text-red-700">{error}</p> : null}
        </div>
    );
}

function Area({
    label,
    value,
    onChange,
    className,
}: {
    label: string;
    value: string;
    onChange: (value: string) => void;
    className?: string;
}) {
    return (
        <label className={className}>
            <span className={labelClass}>{label}</span>
            <textarea
                className={`${inputClass} min-h-20`}
                value={value}
                onChange={(event) => onChange(event.target.value)}
            />
        </label>
    );
}

function NumberField({
    label,
    value,
    onChange,
    min,
    max,
    className,
}: {
    label: string;
    value: number;
    onChange: (value: number) => void;
    min?: number;
    max?: number;
    className?: string;
}) {
    return (
        <label className={className}>
            <span className={labelClass}>{label}</span>
            <input
                type="number"
                min={min}
                max={max}
                className={inputClass}
                value={value}
                onChange={(event) => onChange(Number(event.target.value))}
            />
        </label>
    );
}

function SelectField({
    label,
    value,
    options,
    onChange,
    className,
}: {
    label: string;
    value: string;
    options: readonly string[];
    onChange: (value: string) => void;
    className?: string;
}) {
    return (
        <label className={className}>
            <span className={labelClass}>{label}</span>
            <select className={inputClass} value={value} onChange={(event) => onChange(event.target.value)}>
                {options.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </label>
    );
}

function CheckboxField({
    label,
    checked,
    onChange,
}: {
    label: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
}) {
    return (
        <label className="inline-flex items-center gap-2 text-sm font-medium text-[#173d36]">
            <input
                type="checkbox"
                checked={checked}
                onChange={(event) => onChange(event.target.checked)}
                className="h-4 w-4 rounded border-[#173d36]/30 accent-[#173d36]"
            />
            {label}
        </label>
    );
}

/* ---------- generic list editors ---------- */

function ListEditor<T>({
    title,
    items,
    onChange,
    makeNew,
    renderItem,
    itemLabel,
}: {
    title: string;
    items: T[];
    onChange: (next: T[]) => void;
    makeNew: () => T;
    renderItem: (item: T, update: (next: T) => void, index: number) => ReactNode;
    itemLabel: (index: number) => string;
}) {
    return (
        <div className="rounded-xl border border-[#173d36]/12 bg-[#fbfaf8] p-4">
            <div className="flex items-center justify-between gap-3">
                <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-[#173d36]">{title}</h3>
                <button type="button" className={addButtonClass} onClick={() => onChange([...items, makeNew()])}>
                    Add
                </button>
            </div>
            <div className="mt-4 space-y-4">
                {items.length === 0 ? (
                    <p className="text-sm text-[#173d36]/60">No items yet. Use “Add” to create one.</p>
                ) : null}
                {items.map((item, index) => (
                    <div key={index} className="rounded-lg border border-[#173d36]/15 bg-white p-4">
                        <div className="mb-3 flex items-center justify-between gap-3">
                            <h4 className="text-sm font-semibold text-[#173d36]">{itemLabel(index)}</h4>
                            <button
                                type="button"
                                className={removeButtonClass}
                                onClick={() => onChange(items.filter((_, i) => i !== index))}
                            >
                                Remove
                            </button>
                        </div>
                        {renderItem(
                            item,
                            (next) => onChange(items.map((existing, i) => (i === index ? next : existing))),
                            index
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

function StringListEditor({
    title,
    items,
    onChange,
    newValue = "New item",
    columns = 2,
}: {
    title: string;
    items: string[];
    onChange: (next: string[]) => void;
    newValue?: string;
    columns?: 1 | 2;
}) {
    return (
        <div className="rounded-xl border border-[#173d36]/12 bg-[#fbfaf8] p-4">
            <div className="flex items-center justify-between gap-3">
                <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-[#173d36]">{title}</h3>
                <button type="button" className={addButtonClass} onClick={() => onChange([...items, newValue])}>
                    Add
                </button>
            </div>
            <div className={`mt-3 grid gap-3 ${columns === 2 ? "md:grid-cols-2" : ""}`}>
                {items.map((value, index) => (
                    <div key={index} className="flex gap-2">
                        <input
                            className={inputClass}
                            value={value}
                            onChange={(event) => onChange(items.map((item, i) => (i === index ? event.target.value : item)))}
                        />
                        <button
                            type="button"
                            className={removeButtonClass}
                            onClick={() => onChange(items.filter((_, i) => i !== index))}
                        >
                            Remove
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

/* ---------- preview ---------- */

const PREVIEW_GREEN = "#173d36";
const PREVIEW_GOLD = "#c9a15c";
const PREVIEW_CREAM = "#f8f2e9";

function PreviewHeading({ children }: { children: ReactNode }) {
    return (
        <h4 className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: PREVIEW_GOLD }}>
            {children}
        </h4>
    );
}

function HomePreview({ content }: { content: SiteContent }) {
    const hero = content.home.heroSlides[0];
    return (
        <div className="space-y-5 text-[#2c2c2c]">
            {hero ? (
                <div className="rounded-xl p-4" style={{ backgroundColor: PREVIEW_GREEN, color: PREVIEW_CREAM }}>
                    <p className="text-[11px] uppercase tracking-[0.18em]" style={{ color: PREVIEW_GOLD }}>
                        {hero.label}
                    </p>
                    <p className="mt-2 text-lg font-semibold leading-snug">{hero.title}</p>
                    <p className="mt-2 text-xs leading-relaxed opacity-85">{hero.description}</p>
                    <ul className="mt-3 space-y-1 text-xs opacity-90">
                        {hero.points.map((point, i) => (
                            <li key={i}>• {point}</li>
                        ))}
                    </ul>
                </div>
            ) : null}

            <section>
                <PreviewHeading>Featured Foods</PreviewHeading>
                <div className="mt-2 flex flex-wrap gap-2">
                    {content.home.featuredFoods.map((food, i) => (
                        <span
                            key={i}
                            className="rounded-full px-3 py-1 text-xs font-medium"
                            style={{ backgroundColor: `${PREVIEW_GOLD}33`, color: PREVIEW_GREEN }}
                        >
                            {food}
                        </span>
                    ))}
                </div>
            </section>

            <section>
                <PreviewHeading>Event Types</PreviewHeading>
                <div className="mt-2 grid gap-2 sm:grid-cols-3">
                    {content.home.eventTypes.map((type, i) => (
                        <div key={i} className="rounded-lg border border-[#173d36]/10 bg-white p-3">
                            <p className="text-sm font-semibold" style={{ color: PREVIEW_GREEN }}>
                                {type.title}
                            </p>
                            <p className="mt-1 text-[11px] leading-snug text-[#2c2c2c]/70">{type.description}</p>
                            <p className="mt-1 text-[10px] uppercase tracking-wide text-[#2c2c2c]/40">{type.icon}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section>
                <PreviewHeading>Packages</PreviewHeading>
                <div className="mt-2 grid gap-2 sm:grid-cols-3">
                    {content.home.packages.map((pkg, i) => (
                        <div key={i} className="rounded-lg border border-[#173d36]/10 bg-white p-3">
                            <p className="text-sm font-semibold" style={{ color: PREVIEW_GREEN }}>
                                {pkg.name}
                            </p>
                            <p className="mt-1 text-[11px] text-[#2c2c2c]/70">{pkg.guestCount}</p>
                            <p className="text-[11px] text-[#2c2c2c]/70">{pkg.stations}</p>
                            <p className="text-[11px] text-[#2c2c2c]/70">{pkg.setup}</p>
                            <p className="text-[11px] text-[#2c2c2c]/70">{pkg.staffing}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section>
                <PreviewHeading>Food Stations</PreviewHeading>
                <div className="mt-2 flex flex-wrap gap-2">
                    {content.home.stationNames.map((station, i) => (
                        <span key={i} className="rounded-md border border-[#173d36]/15 bg-white px-2 py-1 text-xs" style={{ color: PREVIEW_GREEN }}>
                            {station}
                        </span>
                    ))}
                </div>
                <p className="mt-1 text-[10px] text-[#2c2c2c]/40">Collage: {content.assets.stationCollageImage}</p>
            </section>

            <section>
                <PreviewHeading>Gallery</PreviewHeading>
                <div className="mt-2 grid grid-cols-3 gap-2">
                    {content.home.gallery.map((label, i) => (
                        <div
                            key={i}
                            className="flex h-12 items-end rounded-md p-1.5 text-[10px] font-medium text-white"
                            style={{ background: `linear-gradient(140deg, ${PREVIEW_GREEN}, ${PREVIEW_GOLD})` }}
                        >
                            {label}
                        </div>
                    ))}
                </div>
            </section>

            <section>
                <PreviewHeading>Testimonials</PreviewHeading>
                <div className="mt-2 space-y-2">
                    {content.home.testimonials.map((item, i) => (
                        <div key={i} className="rounded-lg border border-[#173d36]/10 bg-white p-3">
                            <p className="text-[11px] italic leading-snug text-[#2c2c2c]/80">“{item.quote}”</p>
                            <p className="mt-1 text-xs font-semibold" style={{ color: PREVIEW_GREEN }}>
                                {item.name} — <span className="font-normal opacity-70">{item.event}</span>
                            </p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

function ClassicPreview({ content }: { content: SiteContent }) {
    const hero = content.classic.heroSlides[0];
    return (
        <div className="space-y-5 text-[#2c2c2c]">
            {hero ? (
                <div className="rounded-xl p-4" style={{ backgroundColor: PREVIEW_GREEN, color: PREVIEW_CREAM }}>
                    <span
                        className="inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide"
                        style={{ backgroundColor: PREVIEW_GOLD, color: PREVIEW_GREEN }}
                    >
                        {hero.badge}
                    </span>
                    <p className="mt-2 text-lg font-semibold leading-snug">{hero.title}</p>
                    <p className="mt-2 text-xs leading-relaxed opacity-85">{hero.description}</p>
                    <div className="mt-3 flex gap-2 text-[11px] opacity-90">
                        {hero.stats.map((stat, i) => (
                            <span key={i} className="rounded bg-white/10 px-2 py-1">
                                {stat}
                            </span>
                        ))}
                    </div>
                </div>
            ) : null}

            <section>
                <PreviewHeading>Featured Foods</PreviewHeading>
                <div className="mt-2 grid gap-2 sm:grid-cols-2">
                    {content.classic.featuredFoods.map((food, i) => (
                        <div key={i} className="rounded-lg border border-[#173d36]/10 bg-white p-3">
                            <p className="text-sm font-semibold" style={{ color: PREVIEW_GREEN }}>
                                {food.name}
                            </p>
                            <p className="mt-1 text-[11px] leading-snug text-[#2c2c2c]/70">{food.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section>
                <PreviewHeading>Event Types</PreviewHeading>
                <div className="mt-2 grid gap-2 sm:grid-cols-3">
                    {content.classic.eventTypes.map((type, i) => (
                        <div key={i} className="rounded-lg border border-[#173d36]/10 bg-white p-3">
                            <p className="text-sm font-semibold" style={{ color: PREVIEW_GREEN }}>
                                {type.title}
                            </p>
                            <p className="mt-1 text-[11px] leading-snug text-[#2c2c2c]/70">{type.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section>
                <PreviewHeading>Packages</PreviewHeading>
                <div className="mt-2 grid gap-2 sm:grid-cols-3">
                    {content.classic.packages.map((pkg, i) => (
                        <div
                            key={i}
                            className="rounded-lg border bg-white p-3"
                            style={{ borderColor: pkg.highlight ? PREVIEW_GOLD : "rgba(23,61,54,0.1)" }}
                        >
                            <p className="text-sm font-semibold" style={{ color: PREVIEW_GREEN }}>
                                {pkg.name}
                                {pkg.highlight ? <span className="ml-1 text-[10px]" style={{ color: PREVIEW_GOLD }}>★ Popular</span> : null}
                            </p>
                            <p className="mt-1 text-[11px] text-[#2c2c2c]/70">{pkg.guestCount}</p>
                            <p className="text-[11px] text-[#2c2c2c]/70">{pkg.stations}</p>
                            <p className="text-[11px] text-[#2c2c2c]/70">{pkg.setup}</p>
                            <p className="text-[11px] text-[#2c2c2c]/70">{pkg.staffing}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section>
                <PreviewHeading>Food Stations</PreviewHeading>
                <div className="mt-2 grid gap-2 sm:grid-cols-2">
                    {content.classic.stations.map((station, i) => (
                        <div key={i} className="rounded-lg border border-[#173d36]/10 bg-white p-3">
                            <p className="text-sm font-semibold" style={{ color: PREVIEW_GREEN }}>
                                {station.name}
                            </p>
                            <p className="mt-1 text-[11px] leading-snug text-[#2c2c2c]/70">{station.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section>
                <PreviewHeading>Gallery</PreviewHeading>
                <div className="mt-2 grid grid-cols-3 gap-2">
                    {content.classic.gallery.map((item, i) => (
                        <div
                            key={i}
                            className="flex items-end rounded-md p-1.5 text-[10px] font-medium text-white"
                            style={{
                                height: item.tall ? "72px" : "48px",
                                background: `linear-gradient(140deg, ${PREVIEW_GREEN}, ${PREVIEW_GOLD})`,
                            }}
                        >
                            {item.label}
                        </div>
                    ))}
                </div>
            </section>

            <section>
                <PreviewHeading>Testimonials</PreviewHeading>
                <div className="mt-2 space-y-2">
                    {content.classic.testimonials.map((item, i) => (
                        <div key={i} className="rounded-lg border border-[#173d36]/10 bg-white p-3">
                            <p className="text-[11px]" style={{ color: PREVIEW_GOLD }}>
                                {"★".repeat(Math.max(0, Math.min(5, item.rating)))}
                            </p>
                            <p className="mt-1 text-[11px] italic leading-snug text-[#2c2c2c]/80">“{item.quote}”</p>
                            <p className="mt-1 text-xs font-semibold" style={{ color: PREVIEW_GREEN }}>
                                {item.name} — <span className="font-normal opacity-70">{item.event}</span>
                            </p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

/* ---------- page ---------- */

export default function AdminPage() {
    const router = useRouter();
    const [content, setContent] = useState<SiteContent | null>(null);
    const [status, setStatus] = useState<SaveStatus>("loading");
    const [errorMessage, setErrorMessage] = useState("");
    const [activeTab, setActiveTab] = useState<SectionTab>("home");
    const [previewTab, setPreviewTab] = useState<PreviewTab>("home");
    const [showPreview, setShowPreview] = useState(true);

    const handleLogout = async () => {
        await fetch("/api/admin/logout", { method: "POST" });
        router.push("/admin/login");
        router.refresh();
    };

    useEffect(() => {
        const load = async () => {
            try {
                const response = await fetch("/api/admin/content", { cache: "no-store" });
                if (!response.ok) {
                    throw new Error("Could not load content.");
                }
                const data = (await response.json()) as SiteContent;
                setContent(cloneContent(data));
                setStatus("idle");
            } catch (error) {
                setStatus("error");
                setErrorMessage(error instanceof Error ? error.message : "Failed to load content.");
            }
        };

        void load();
    }, []);

    const stats = useMemo(
        () => ({
            homeSlides: content?.home.heroSlides.length ?? 0,
            classicSlides: content?.classic.heroSlides.length ?? 0,
            homeFoods: content?.home.featuredFoods.length ?? 0,
            classicFoods: content?.classic.featuredFoods.length ?? 0,
        }),
        [content]
    );

    const updateHome = <K extends keyof SiteContent["home"]>(key: K, value: SiteContent["home"][K]) => {
        setContent((current) => (current ? { ...current, home: { ...current.home, [key]: value } } : current));
    };

    const updateClassic = <K extends keyof SiteContent["classic"]>(key: K, value: SiteContent["classic"][K]) => {
        setContent((current) => (current ? { ...current, classic: { ...current.classic, [key]: value } } : current));
    };

    const handleSave = async () => {
        if (!content) {
            return;
        }

        setStatus("saving");
        setErrorMessage("");

        try {
            const response = await fetch("/api/admin/content", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(content),
            });

            if (!response.ok) {
                throw new Error("Save failed.");
            }

            const saved = (await response.json()) as SiteContent;
            setContent(cloneContent(saved));
            setStatus("saved");

            window.setTimeout(() => setStatus("idle"), 1400);
        } catch (error) {
            setStatus("error");
            setErrorMessage(error instanceof Error ? error.message : "Failed to save content.");
        }
    };

    const tabs: Array<{ key: SectionTab; label: string }> = [
        { key: "home", label: "Home Page" },
        { key: "classic", label: "Classic Page" },
        { key: "assets", label: "Assets" },
    ];

    return (
        <main className="min-h-screen bg-[#f6f4ef] px-4 py-8 text-[#173d36] md:px-8">
            <div className="mx-auto max-w-7xl space-y-6">
                <header className="flex flex-wrap items-start justify-between gap-4 rounded-2xl border border-[#173d36]/15 bg-white p-6 shadow-sm">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#c9a15c]">Scooptopia Control Panel</p>
                        <h1 className="mt-3 text-3xl font-semibold">Content Management System</h1>
                        <p className="mt-2 max-w-3xl text-sm text-[#173d36]/75">
                            A full form-based CMS for every section of the home and classic pages — hero slides, foods,
                            event types, packages, stations, galleries, and testimonials. Edit on the left, preview on the right.
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={handleLogout}
                        className="rounded border border-[#173d36]/25 px-3 py-2 text-xs font-semibold text-[#173d36] transition hover:bg-[#173d36]/5"
                    >
                        Sign Out
                    </button>
                </header>

                <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {[
                        { label: "Home Slides", value: stats.homeSlides },
                        { label: "Classic Slides", value: stats.classicSlides },
                        { label: "Home Foods", value: stats.homeFoods },
                        { label: "Classic Foods", value: stats.classicFoods },
                    ].map((stat) => (
                        <div key={stat.label} className="rounded-xl border border-[#173d36]/12 bg-white p-4">
                            <p className="text-xs uppercase tracking-widest text-[#173d36]/60">{stat.label}</p>
                            <p className="mt-2 text-2xl font-semibold">{stat.value}</p>
                        </div>
                    ))}
                </section>

                <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#173d36]/15 bg-white p-4 shadow-sm">
                    <div className="flex flex-wrap gap-2">
                        {tabs.map((tab) => (
                            <button
                                key={tab.key}
                                type="button"
                                onClick={() => setActiveTab(tab.key)}
                                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                                    activeTab === tab.key
                                        ? "bg-[#173d36] text-white"
                                        : "border border-[#173d36]/20 text-[#173d36] hover:bg-[#173d36]/5"
                                }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={() => setShowPreview((value) => !value)}
                            className="rounded border border-[#173d36]/25 px-3 py-2 text-xs font-semibold text-[#173d36] transition hover:bg-[#173d36]/5"
                        >
                            {showPreview ? "Hide Preview" : "Show Preview"}
                        </button>
                        <button
                            type="button"
                            onClick={handleSave}
                            disabled={!content || status === "saving" || status === "loading"}
                            className="rounded bg-[#173d36] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#26564d] disabled:cursor-not-allowed disabled:opacity-70"
                        >
                            {status === "saving" ? "Saving..." : "Save Changes"}
                        </button>
                    </div>
                </div>

                {status === "saved" || status === "error" ? (
                    <div className="text-sm">
                        {status === "saved" ? <span className="text-emerald-700">Saved successfully.</span> : null}
                        {status === "error" ? <span className="text-red-700">{errorMessage || "Something went wrong."}</span> : null}
                    </div>
                ) : null}

                {!content ? (
                    <div className="rounded-2xl border border-[#173d36]/12 bg-white p-6 text-sm text-[#173d36]/80 shadow-sm">
                        Loading content...
                    </div>
                ) : (
                    <div className={`grid gap-6 ${showPreview ? "xl:grid-cols-[minmax(0,1fr)_minmax(0,460px)]" : ""}`}>
                        <section className="space-y-6 rounded-2xl border border-[#173d36]/15 bg-white p-5 shadow-sm">
                            {activeTab === "assets" ? (
                                <div className="rounded-xl border border-[#173d36]/12 bg-[#fbfaf8] p-4">
                                    <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-[#173d36]">Assets</h3>
                                    <div className="mt-3 grid gap-4 md:grid-cols-2">
                                        <ImageField
                                            label="Station Collage Image"
                                            value={content.assets.stationCollageImage}
                                            onChange={(value) =>
                                                setContent((current) =>
                                                    current
                                                        ? { ...current, assets: { ...current.assets, stationCollageImage: value } }
                                                        : current
                                                )
                                            }
                                        />
                                    </div>
                                </div>
                            ) : null}

                            {activeTab === "home" ? (
                                <>
                                    <ListEditor
                                        title="Home Hero Slides"
                                        items={content.home.heroSlides}
                                        itemLabel={(i) => `Home Slide ${i + 1}`}
                                        onChange={(next) => updateHome("heroSlides", next)}
                                        makeNew={() => ({
                                            label: "New Label",
                                            title: "New Title",
                                            description: "New Description",
                                            primaryImage: { src: "/media/hero-plate.svg", alt: "Primary image" },
                                            secondaryImage: { src: "/media/event-table.svg", alt: "Secondary image" },
                                            eyebrow: "New Eyebrow",
                                            points: ["Point 1", "Point 2", "Point 3"],
                                        })}
                                        renderItem={(slide, update) => (
                                            <div className="grid gap-3 md:grid-cols-2">
                                                <Field label="Label" value={slide.label} onChange={(v) => update({ ...slide, label: v })} />
                                                <Field label="Eyebrow" value={slide.eyebrow} onChange={(v) => update({ ...slide, eyebrow: v })} />
                                                <Field className="md:col-span-2" label="Title" value={slide.title} onChange={(v) => update({ ...slide, title: v })} />
                                                <Area className="md:col-span-2" label="Description" value={slide.description} onChange={(v) => update({ ...slide, description: v })} />
                                                <ImageField label="Primary Image" value={slide.primaryImage.src} onChange={(v) => update({ ...slide, primaryImage: { ...slide.primaryImage, src: v } })} />
                                                <Field label="Primary Image Alt" value={slide.primaryImage.alt} onChange={(v) => update({ ...slide, primaryImage: { ...slide.primaryImage, alt: v } })} />
                                                <ImageField label="Secondary Image" value={slide.secondaryImage.src} onChange={(v) => update({ ...slide, secondaryImage: { ...slide.secondaryImage, src: v } })} />
                                                <Field label="Secondary Image Alt" value={slide.secondaryImage.alt} onChange={(v) => update({ ...slide, secondaryImage: { ...slide.secondaryImage, alt: v } })} />
                                                <div className="md:col-span-2">
                                                    <StringListEditor
                                                        title="Points"
                                                        items={slide.points}
                                                        columns={1}
                                                        newValue="New point"
                                                        onChange={(points) => update({ ...slide, points })}
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    />

                                    <StringListEditor
                                        title="Home Featured Foods"
                                        items={content.home.featuredFoods}
                                        newValue="New Food"
                                        onChange={(next) => updateHome("featuredFoods", next)}
                                    />

                                    <ListEditor
                                        title="Home Event Types"
                                        items={content.home.eventTypes}
                                        itemLabel={(i) => `Event Type ${i + 1}`}
                                        onChange={(next) => updateHome("eventTypes", next)}
                                        makeNew={() => ({ title: "New Event Type", description: "Description", icon: "party" as EventIcon })}
                                        renderItem={(item, update) => (
                                            <div className="grid gap-3 md:grid-cols-2">
                                                <Field label="Title" value={item.title} onChange={(v) => update({ ...item, title: v })} />
                                                <SelectField label="Icon" value={item.icon} options={iconOptions} onChange={(v) => update({ ...item, icon: v as EventIcon })} />
                                                <Area className="md:col-span-2" label="Description" value={item.description} onChange={(v) => update({ ...item, description: v })} />
                                            </div>
                                        )}
                                    />

                                    <ListEditor
                                        title="Home Packages"
                                        items={content.home.packages}
                                        itemLabel={(i) => `Package ${i + 1}`}
                                        onChange={(next) => updateHome("packages", next)}
                                        makeNew={() => ({ name: "New Package", guestCount: "Up to 50 guests", stations: "2 stations", setup: "Setup included", staffing: "2 staff" })}
                                        renderItem={(item, update) => (
                                            <div className="grid gap-3 md:grid-cols-2">
                                                <Field label="Name" value={item.name} onChange={(v) => update({ ...item, name: v })} />
                                                <Field label="Guest Count" value={item.guestCount} onChange={(v) => update({ ...item, guestCount: v })} />
                                                <Field label="Stations" value={item.stations} onChange={(v) => update({ ...item, stations: v })} />
                                                <Field label="Setup" value={item.setup} onChange={(v) => update({ ...item, setup: v })} />
                                                <Field label="Staffing" value={item.staffing} onChange={(v) => update({ ...item, staffing: v })} />
                                            </div>
                                        )}
                                    />

                                    <StringListEditor
                                        title="Home Station Names"
                                        items={content.home.stationNames}
                                        newValue="New Station"
                                        onChange={(next) => updateHome("stationNames", next)}
                                    />

                                    <StringListEditor
                                        title="Home Gallery Labels"
                                        items={content.home.gallery}
                                        newValue="New Gallery Item"
                                        onChange={(next) => updateHome("gallery", next)}
                                    />

                                    <ListEditor
                                        title="Home Testimonials"
                                        items={content.home.testimonials}
                                        itemLabel={(i) => `Testimonial ${i + 1}`}
                                        onChange={(next) => updateHome("testimonials", next)}
                                        makeNew={() => ({ quote: "New testimonial quote", name: "Guest Name", event: "Event Type" })}
                                        renderItem={(item, update) => (
                                            <div className="grid gap-3 md:grid-cols-2">
                                                <Area className="md:col-span-2" label="Quote" value={item.quote} onChange={(v) => update({ ...item, quote: v })} />
                                                <Field label="Name" value={item.name} onChange={(v) => update({ ...item, name: v })} />
                                                <Field label="Event" value={item.event} onChange={(v) => update({ ...item, event: v })} />
                                            </div>
                                        )}
                                    />
                                </>
                            ) : null}

                            {activeTab === "classic" ? (
                                <>
                                    <ListEditor
                                        title="Classic Hero Slides"
                                        items={content.classic.heroSlides}
                                        itemLabel={(i) => `Classic Slide ${i + 1}`}
                                        onChange={(next) => updateClassic("heroSlides", next)}
                                        makeNew={() => ({
                                            title: "New Classic Slide",
                                            description: "Classic slide description",
                                            badge: "Classic Badge",
                                            image: { src: "/media/event-table.svg", alt: "Classic slide image" },
                                            stats: ["Stat 1", "Stat 2"] as [string, string],
                                        })}
                                        renderItem={(slide, update) => (
                                            <div className="grid gap-3 md:grid-cols-2">
                                                <Field label="Badge" value={slide.badge} onChange={(v) => update({ ...slide, badge: v })} />
                                                <ImageField label="Image" value={slide.image.src} onChange={(v) => update({ ...slide, image: { ...slide.image, src: v } })} />
                                                <Field className="md:col-span-2" label="Image Alt" value={slide.image.alt} onChange={(v) => update({ ...slide, image: { ...slide.image, alt: v } })} />
                                                <Field className="md:col-span-2" label="Title" value={slide.title} onChange={(v) => update({ ...slide, title: v })} />
                                                <Area className="md:col-span-2" label="Description" value={slide.description} onChange={(v) => update({ ...slide, description: v })} />
                                                <Field label="Stat 1" value={slide.stats[0]} onChange={(v) => update({ ...slide, stats: [v, slide.stats[1]] })} />
                                                <Field label="Stat 2" value={slide.stats[1]} onChange={(v) => update({ ...slide, stats: [slide.stats[0], v] })} />
                                            </div>
                                        )}
                                    />

                                    <ListEditor
                                        title="Classic Featured Foods"
                                        items={content.classic.featuredFoods}
                                        itemLabel={(i) => `Food ${i + 1}`}
                                        onChange={(next) => updateClassic("featuredFoods", next)}
                                        makeNew={() => ({ name: "New Food", desc: "Description" })}
                                        renderItem={(item, update) => (
                                            <div className="grid gap-3 md:grid-cols-2">
                                                <Field label="Name" value={item.name} onChange={(v) => update({ ...item, name: v })} />
                                                <Field label="Description" value={item.desc} onChange={(v) => update({ ...item, desc: v })} />
                                            </div>
                                        )}
                                    />

                                    <ListEditor
                                        title="Classic Event Types"
                                        items={content.classic.eventTypes}
                                        itemLabel={(i) => `Event Type ${i + 1}`}
                                        onChange={(next) => updateClassic("eventTypes", next)}
                                        makeNew={() => ({ title: "New Event Type", description: "Description", icon: "party" as EventIcon })}
                                        renderItem={(item, update) => (
                                            <div className="grid gap-3 md:grid-cols-2">
                                                <Field label="Title" value={item.title} onChange={(v) => update({ ...item, title: v })} />
                                                <SelectField label="Icon" value={item.icon} options={iconOptions} onChange={(v) => update({ ...item, icon: v as EventIcon })} />
                                                <Area className="md:col-span-2" label="Description" value={item.description} onChange={(v) => update({ ...item, description: v })} />
                                            </div>
                                        )}
                                    />

                                    <ListEditor
                                        title="Classic Packages"
                                        items={content.classic.packages}
                                        itemLabel={(i) => `Package ${i + 1}`}
                                        onChange={(next) => updateClassic("packages", next)}
                                        makeNew={() => ({ name: "New Package", guestCount: "Up to 50 guests", stations: "2 stations", setup: "Setup included", staffing: "2 staff", highlight: false })}
                                        renderItem={(item, update) => (
                                            <div className="grid gap-3 md:grid-cols-2">
                                                <Field label="Name" value={item.name} onChange={(v) => update({ ...item, name: v })} />
                                                <Field label="Guest Count" value={item.guestCount} onChange={(v) => update({ ...item, guestCount: v })} />
                                                <Field label="Stations" value={item.stations} onChange={(v) => update({ ...item, stations: v })} />
                                                <Field label="Setup" value={item.setup} onChange={(v) => update({ ...item, setup: v })} />
                                                <Field label="Staffing" value={item.staffing} onChange={(v) => update({ ...item, staffing: v })} />
                                                <div className="flex items-end pb-1">
                                                    <CheckboxField label="Highlight as popular" checked={item.highlight} onChange={(checked) => update({ ...item, highlight: checked })} />
                                                </div>
                                            </div>
                                        )}
                                    />

                                    <ListEditor
                                        title="Classic Food Stations"
                                        items={content.classic.stations}
                                        itemLabel={(i) => `Station ${i + 1}`}
                                        onChange={(next) => updateClassic("stations", next)}
                                        makeNew={() => ({ name: "New Station", desc: "Description" })}
                                        renderItem={(item, update) => (
                                            <div className="grid gap-3 md:grid-cols-2">
                                                <Field label="Name" value={item.name} onChange={(v) => update({ ...item, name: v })} />
                                                <Field label="Description" value={item.desc} onChange={(v) => update({ ...item, desc: v })} />
                                            </div>
                                        )}
                                    />

                                    <ListEditor
                                        title="Classic Gallery"
                                        items={content.classic.gallery}
                                        itemLabel={(i) => `Gallery Item ${i + 1}`}
                                        onChange={(next) => updateClassic("gallery", next)}
                                        makeNew={() => ({ label: "New Gallery Item", tall: false })}
                                        renderItem={(item, update) => (
                                            <div className="grid gap-3 md:grid-cols-2">
                                                <Field label="Label" value={item.label} onChange={(v) => update({ ...item, label: v })} />
                                                <div className="flex items-end pb-1">
                                                    <CheckboxField label="Tall tile" checked={item.tall} onChange={(checked) => update({ ...item, tall: checked })} />
                                                </div>
                                            </div>
                                        )}
                                    />

                                    <ListEditor
                                        title="Classic Testimonials"
                                        items={content.classic.testimonials}
                                        itemLabel={(i) => `Testimonial ${i + 1}`}
                                        onChange={(next) => updateClassic("testimonials", next)}
                                        makeNew={() => ({ quote: "New testimonial quote", name: "Guest Name", event: "Event Type", rating: 5 })}
                                        renderItem={(item, update) => (
                                            <div className="grid gap-3 md:grid-cols-2">
                                                <Area className="md:col-span-2" label="Quote" value={item.quote} onChange={(v) => update({ ...item, quote: v })} />
                                                <Field label="Name" value={item.name} onChange={(v) => update({ ...item, name: v })} />
                                                <Field label="Event" value={item.event} onChange={(v) => update({ ...item, event: v })} />
                                                <NumberField label="Rating (0-5)" min={0} max={5} value={item.rating} onChange={(v) => update({ ...item, rating: v })} />
                                            </div>
                                        )}
                                    />
                                </>
                            ) : null}
                        </section>

                        {showPreview ? (
                            <aside className="xl:sticky xl:top-6 xl:max-h-[calc(100vh-3rem)] xl:self-start xl:overflow-y-auto">
                                <div className="rounded-2xl border border-[#173d36]/15 bg-white p-5 shadow-sm">
                                    <div className="mb-4 flex items-center justify-between gap-3">
                                        <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-[#173d36]">Live Preview</h2>
                                        <div className="flex gap-1 rounded-full border border-[#173d36]/15 p-0.5">
                                            {(["home", "classic"] as PreviewTab[]).map((tab) => (
                                                <button
                                                    key={tab}
                                                    type="button"
                                                    onClick={() => setPreviewTab(tab)}
                                                    className={`rounded-full px-3 py-1 text-xs font-semibold capitalize transition ${
                                                        previewTab === tab ? "bg-[#173d36] text-white" : "text-[#173d36]"
                                                    }`}
                                                >
                                                    {tab}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    {previewTab === "home" ? <HomePreview content={content} /> : <ClassicPreview content={content} />}
                                </div>
                            </aside>
                        ) : null}
                    </div>
                )}
            </div>
        </main>
    );
}
