import Image from "next/image";
import {
    ArrowRight,
    Mail,
    MapPin,
    Phone,
    PartyPopper,
    HandPlatter,
    Store,
    CheckCircle2,
    Star,
} from "lucide-react";
import { ClassicHeroBanner } from "@/app/components/classic-hero-banner";
import { InquiryForm } from "@/app/components/inquiry-form";
import { SectionHeading } from "@/app/components/atoms/section-heading";
import { ClassicSiteHeader } from "@/app/components/organisms/classic-site-header";
import { ClassicSiteFooter } from "@/app/components/organisms/site-footers";
import { PageShell } from "@/app/components/templates/page-shell";
import { getSiteContent } from "@/app/lib/site-content-store";

// Content is admin-editable via Supabase, so render on each request instead of
// serving a build-time prerender (otherwise edits never appear until a rebuild).
export const dynamic = "force-dynamic";

const eventIconMap = {
    party: PartyPopper,
    wedding: HandPlatter,
    corporate: Store,
};

export default async function ClassicPage() {
    const content = await getSiteContent();

    return (
        <PageShell className="min-h-screen bg-white text-gray-800" header={<ClassicSiteHeader />} footer={<ClassicSiteFooter />}>

            <ClassicHeroBanner slides={content.classic.heroSlides} />

            <section id="about" className="border-b border-gray-100 bg-gray-50">
                <div className="mx-auto max-w-6xl px-6 py-20">
                    <div className="grid gap-12 md:grid-cols-2 md:items-center">
                        <div>
                            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-[#c9a15c]">About Us</p>
                            <h2 className="text-3xl font-bold text-[#173d36] md:text-4xl">About Scooptopia</h2>
                            <p className="mt-4 leading-relaxed text-gray-600">Scooptopia is a Filipino street food catering and events company serving celebrations across the United States. Our mission is simple: bring bold flavors, warm hospitality, and memorable food station experiences to every event.</p>
                            <p className="mt-4 leading-relaxed text-gray-600">Every menu is inspired by Filipino heritage and executed with professional care so hosts can focus on celebrating with their guests.</p>
                            <a href="#inquiry" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#173d36] transition-all hover:gap-3">Get in touch <ArrowRight size={15} /></a>
                        </div>
                        <div className="space-y-3">
                            <h3 className="text-lg font-semibold text-[#173d36]">What We Value</h3>
                            {[
                                "Authenticity in flavor and cultural storytelling",
                                "Welcoming service that feels family-oriented and polished",
                                "Reliable event execution from setup to last serving",
                                "Community-centered celebrations that bring people together",
                            ].map((value) => (
                                <div key={value} className="flex items-start gap-3">
                                    <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-[#c9a15c]" />
                                    <span className="text-sm text-gray-600">{value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section id="menu" className="border-b border-gray-100">
                <div className="mx-auto max-w-6xl px-6 py-20">
                    <div className="mb-10 border-b border-gray-200 pb-6">
                        <SectionHeading
                            title="Featured Foods"
                            subtitle="Classic Filipino street food favorites, curated for events and built for sharing."
                            eyebrow="What We Serve"
                        />
                    </div>
                    <div className="grid gap-px border border-gray-200 bg-gray-200 sm:grid-cols-2 lg:grid-cols-3">
                        {content.classic.featuredFoods.map((food) => (
                            <div key={food.name} className="bg-white px-6 py-5 transition hover:bg-gray-50">
                                <p className="font-semibold text-[#173d36]">{food.name}</p>
                                <p className="mt-1 text-sm text-gray-500">{food.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="border-b border-gray-100 bg-gray-50">
                <div className="mx-auto max-w-6xl px-6 py-20">
                    <div className="mb-10">
                        <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-[#c9a15c]">We Cater For</p>
                        <h2 className="text-3xl font-bold text-[#173d36] md:text-4xl">Event Types</h2>
                    </div>
                    <div className="grid gap-8 md:grid-cols-3">
                        {content.classic.eventTypes.map((type) => {
                            const Icon = eventIconMap[type.icon] ?? PartyPopper;
                            return (
                                <div key={type.title} className="border-t-2 border-[#c9a15c] bg-white px-6 py-6 shadow-sm">
                                    <div className="mb-4 inline-flex rounded bg-[#173d36]/8 p-2.5 text-[#173d36]"><Icon size={20} /></div>
                                    <h3 className="text-lg font-semibold text-[#173d36]">{type.title}</h3>
                                    <p className="mt-2 text-sm leading-relaxed text-gray-500">{type.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section id="packages" className="border-b border-gray-100">
                <div className="mx-auto max-w-6xl px-6 py-20">
                    <div className="mb-10">
                        <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-[#c9a15c]">Pricing</p>
                        <div className="flex flex-wrap items-end justify-between gap-4">
                            <h2 className="text-3xl font-bold text-[#173d36] md:text-4xl">Catering Packages</h2>
                            <p className="max-w-md text-sm text-gray-500">Tailored options with clear inclusions for guest count, food stations, setup, and staffing.</p>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse border border-gray-200 text-sm">
                            <thead>
                                <tr className="bg-[#173d36] text-white">
                                    <th className="px-6 py-4 text-left font-semibold">Included</th>
                                    {content.classic.packages.map((pkg) => (
                                        <th key={pkg.name} className="px-6 py-4 text-center font-semibold">
                                            {pkg.name}
                                            {pkg.highlight && <span className="ml-2 rounded bg-[#c9a15c] px-2 py-0.5 text-[10px] font-bold uppercase text-[#173d36]">Popular</span>}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    { label: "Guest Count", key: "guestCount" as const },
                                    { label: "Food Stations", key: "stations" as const },
                                    { label: "Setup", key: "setup" as const },
                                    { label: "Staffing", key: "staffing" as const },
                                ].map((row, i) => (
                                    <tr key={row.label} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                                        <td className="border border-gray-200 px-6 py-3.5 font-medium text-gray-700">{row.label}</td>
                                        {content.classic.packages.map((pkg) => (
                                            <td key={pkg.name} className={`border border-gray-200 px-6 py-3.5 text-center text-gray-600 ${pkg.highlight ? "bg-[#173d36]/[0.03] font-medium" : ""}`}>
                                                {pkg[row.key]}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                                <tr className="border-t-2 border-gray-200 bg-white">
                                    <td className="px-6 py-4" />
                                    {content.classic.packages.map((pkg) => (
                                        <td key={pkg.name} className="px-6 py-4 text-center">
                                            <a
                                                href="#inquiry"
                                                className={`inline-block rounded px-5 py-2 text-sm font-semibold transition ${pkg.highlight ? "bg-[#173d36] text-white hover:bg-[#26564d]" : "border border-[#173d36] text-[#173d36] hover:bg-gray-50"}`}
                                            >
                                                Request Quote
                                            </a>
                                        </td>
                                    ))}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            <section id="stations" className="border-b border-gray-100 bg-gray-50">
                <div className="mx-auto max-w-6xl px-6 py-20">
                    <div className="mb-10">
                        <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-[#c9a15c]">Our Stations</p>
                        <h2 className="text-3xl font-bold text-[#173d36] md:text-4xl">Food Stations</h2>
                    </div>
                    <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
                        <div className="overflow-hidden rounded-sm border border-gray-200 bg-white">
                            <Image src={content.assets.stationCollageImage} alt="Filipino food station collage" width={980} height={560} className="h-full w-full object-cover" />
                        </div>
                        <div className="divide-y divide-gray-200">
                            {content.classic.stations.map((station) => (
                                <div key={station.name} className="py-5 first:pt-0 last:pb-0">
                                    <h3 className="font-semibold text-[#173d36]">{station.name}</h3>
                                    <p className="mt-1 text-sm text-gray-500">{station.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section id="gallery" className="border-b border-gray-100">
                <div className="mx-auto max-w-6xl px-6 py-20">
                    <div className="mb-10">
                        <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-[#c9a15c]">Our Work</p>
                        <h2 className="text-3xl font-bold text-[#173d36] md:text-4xl">Gallery</h2>
                        <p className="mt-2 text-sm text-gray-500">Moments from birthdays, weddings, corporate events, and community gatherings.</p>
                    </div>
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
                        {content.classic.gallery.map((item, index) => (
                            <div key={item.label} className={`overflow-hidden rounded-sm border border-gray-200 ${index === 0 || index === 3 ? "col-span-2 row-span-2 sm:col-span-1" : ""}`}>
                                <div
                                    aria-label={item.label}
                                    role="img"
                                    className="h-36 w-full sm:h-48"
                                    style={{
                                        background: `linear-gradient(140deg, rgba(23,61,54,${0.7 + index * 0.04}), rgba(201,161,92,${0.5 + index * 0.04}))`,
                                    }}
                                />
                                <p className="bg-white px-3 py-2 text-xs font-medium text-gray-600">{item.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="border-b border-gray-100 bg-[#173d36] text-white">
                <div className="mx-auto max-w-6xl px-6 py-20">
                    <div className="mb-10">
                        <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-[#c9a15c]">Reviews</p>
                        <h2 className="text-3xl font-bold text-white md:text-4xl">What Our Clients Say</h2>
                    </div>
                    <div className="grid gap-6 md:grid-cols-3">
                        {content.classic.testimonials.map((item) => (
                            <div key={item.name} className="border border-white/12 bg-white/6 p-6">
                                <div className="mb-3 flex gap-0.5">
                                    {Array.from({ length: item.rating }).map((_, i) => (
                                        <Star key={i} size={13} className="fill-[#c9a15c] text-[#c9a15c]" />
                                    ))}
                                </div>
                                <p className="text-sm leading-relaxed text-white/80">&ldquo;{item.quote}&rdquo;</p>
                                <div className="mt-4 border-t border-white/10 pt-4">
                                    <p className="text-sm font-semibold text-white">{item.name}</p>
                                    <p className="text-xs uppercase tracking-widest text-white/50">{item.event}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section id="inquiry" className="border-b border-gray-100">
                <div className="mx-auto max-w-6xl px-6 py-20">
                    <div className="grid gap-16 lg:grid-cols-[1fr_1.4fr]">
                        <div>
                            <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-[#c9a15c]">Get in Touch</p>
                            <h2 className="text-3xl font-bold text-[#173d36] md:text-4xl">Request a Quote</h2>
                            <p className="mt-4 leading-relaxed text-gray-600">Tell us about your event and we will send package options tailored to your guest count, event type, and service style.</p>
                            <div className="mt-8 space-y-4 text-sm text-gray-600">
                                <div className="flex items-start gap-3"><Mail size={15} className="mt-0.5 shrink-0 text-[#173d36]" /><span>hello@scooptopia.com</span></div>
                                <div className="flex items-start gap-3"><Phone size={15} className="mt-0.5 shrink-0 text-[#173d36]" /><span>(555) 123-4567</span></div>
                                <div className="flex items-start gap-3"><MapPin size={15} className="mt-0.5 shrink-0 text-[#173d36]" /><span>Based in the United States — serving events nationwide</span></div>
                            </div>
                        </div>
                        <div><InquiryForm /></div>
                    </div>
                </div>
            </section>

        </PageShell>
    );
}
