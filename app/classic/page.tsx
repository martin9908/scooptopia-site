import Link from "next/link";
import Image from "next/image";
import {
    ArrowRight,
    Mail,
    MapPin,
    Phone,
    Utensils,
    PartyPopper,
    HandPlatter,
    Store,
    CheckCircle2,
    Star,
} from "lucide-react";
import { ClassicHeroBanner } from "@/app/components/classic-hero-banner";
import { InquiryForm } from "@/app/components/inquiry-form";

const featuredFoods = [
    { name: "Isaw", desc: "Grilled chicken or pork intestines seasoned with a tangy vinegar dip." },
    { name: "Fish Balls", desc: "Crispy fish balls served with sweet, spicy, or vinegar sauce." },
    { name: "Squid Balls", desc: "Tender squid balls on bamboo skewers, a kalsada classic." },
    { name: "Kwek-Kwek", desc: "Deep-fried quail eggs coated in orange batter, served with sauce." },
    { name: "BBQ", desc: "Marinated pork skewers grilled over charcoal, smoky and sweet." },
    { name: "Lumpia", desc: "Crispy Filipino spring rolls filled with pork and vegetables." },
    { name: "Pancit", desc: "Stir-fried noodles with vegetables and protein, packed with flavor." },
    { name: "Halo-Halo", desc: "Classic Filipino shaved ice dessert with beans, fruit, and leche flan." },
    { name: "Sorbetes", desc: "Traditional Filipino street ice cream in purple yam, cheese, and coconut." },
];

const eventTypes = [
    { title: "Family Celebrations", description: "Birthdays, reunions, and milestone gatherings with kalsada favorites.", icon: PartyPopper },
    { title: "Weddings", description: "A refined Filipino street food experience designed for joyful receptions.", icon: HandPlatter },
    { title: "Corporate Events", description: "Efficient and polished setups for teams, clients, and community partners.", icon: Store },
];

const packages = [
    { name: "Barkada", guestCount: "Up to 50 guests", stations: "2 street food stations", setup: "Styled setup included", staffing: "2 service staff", highlight: false },
    { name: "Fiesta", guestCount: "Up to 120 guests", stations: "4 street food stations", setup: "Full setup and breakdown", staffing: "4 service staff", highlight: true },
    { name: "Grand Salu-Salo", guestCount: "120+ guests", stations: "Custom station mix", setup: "Premium event styling", staffing: "Dedicated event team", highlight: false },
];

const testimonials = [
    { quote: "Scooptopia made our wedding reception unforgettable. The setup looked elegant, and every guest kept coming back for seconds.", name: "Paolo and Trina", event: "Wedding Reception", rating: 5 },
    { quote: "The food brought our whole family back to Manila memories. Professional team, warm service, and flavors that hit home.", name: "The Dela Cruz Family", event: "Family Reunion", rating: 5 },
    { quote: "Our company event felt elevated without losing the fun street food vibe. Great flow, great taste, and great people.", name: "Marissa Lim", event: "Corporate Mixer", rating: 5 },
];

const stations = [
    { name: "Street Grill", desc: "BBQ skewers, isaw, and grilled favorites over open flame." },
    { name: "Fried Favorites", desc: "Fish balls, kwek-kwek, and crispy lumpia served to order." },
    { name: "Noodle Bar", desc: "Pancit Canton and bihon tossed fresh with vegetables and protein." },
    { name: "Dessert Corner", desc: "Halo-halo, sorbetes, and Filipino sweets to close the meal." },
];

export default function ClassicPage() {
    return (
        <div className="min-h-screen bg-white text-gray-800">
            <div className="border-b border-gray-200 bg-[#173d36] text-white">
                <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-2 text-xs">
                    <div className="flex items-center gap-6">
                        <span className="flex items-center gap-1.5"><MapPin size={11} />Based in the United States</span>
                        <span className="flex items-center gap-1.5"><Mail size={11} />hello@scooptopia.com</span>
                        <span className="flex items-center gap-1.5"><Phone size={11} />(555) 123-4567</span>
                    </div>
                    <div className="hidden items-center gap-4 sm:flex">
                        <a href="#" aria-label="Facebook" className="transition hover:text-[#c9a15c]"><svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current" aria-hidden="true"><path d="M13.5 8.5V6.8c0-.8.5-1 1-1h1.4V3.1h-2.2c-2.5 0-3.7 1.6-3.7 3.9v1.5H8v2.8h2v9.6h3.5v-9.6h2.3l.4-2.8h-2.7Z" /></svg></a>
                        <a href="#" aria-label="Instagram" className="transition hover:text-[#c9a15c]"><svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current" aria-hidden="true"><path d="M12 7.2A4.8 4.8 0 1 0 16.8 12 4.81 4.81 0 0 0 12 7.2Zm0 7.9A3.1 3.1 0 1 1 15.1 12 3.1 3.1 0 0 1 12 15.1Z" /><path d="M17.7 3.7H6.3a2.6 2.6 0 0 0-2.6 2.6v11.4a2.6 2.6 0 0 0 2.6 2.6h11.4a2.6 2.6 0 0 0 2.6-2.6V6.3a2.6 2.6 0 0 0-2.6-2.6Zm.9 14a.9.9 0 0 1-.9.9H6.3a.9.9 0 0 1-.9-.9V6.3a.9.9 0 0 1 .9-.9h11.4a.9.9 0 0 1 .9.9Z" /><circle cx="17.1" cy="6.9" r="1.1" /></svg></a>
                    </div>
                </div>
            </div>

            <header className="sticky top-0 z-50 border-b border-gray-200 bg-white shadow-sm">
                <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4">
                    <Link href="/classic" className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#173d36] text-white"><Utensils size={16} /></div>
                        <div>
                            <span className="block text-sm font-bold uppercase tracking-widest text-[#173d36]">Scooptopia</span>
                            <span className="block text-[10px] text-gray-500">Filipino Street Food Catering</span>
                        </div>
                    </Link>

                    <nav className="hidden items-center gap-7 lg:flex">
                        {[
                            ["Home", "#top"],
                            ["About", "#about"],
                            ["Menu", "#menu"],
                            ["Packages", "#packages"],
                            ["Gallery", "#gallery"],
                            ["Contact", "#inquiry"],
                        ].map(([label, href]) => (
                            <a key={label} href={href} className="text-sm font-medium text-gray-700 transition hover:text-[#173d36]">{label}</a>
                        ))}
                    </nav>

                    <a href="#inquiry" className="rounded bg-[#173d36] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#26564d]">Request a Quote</a>
                </div>
            </header>

            <ClassicHeroBanner />

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
                        <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-[#c9a15c]">What We Serve</p>
                        <div className="flex flex-wrap items-end justify-between gap-4">
                            <h2 className="text-3xl font-bold text-[#173d36] md:text-4xl">Featured Foods</h2>
                            <p className="max-w-md text-sm text-gray-500">Classic Filipino street food favorites, curated for events and built for sharing.</p>
                        </div>
                    </div>
                    <div className="grid gap-px border border-gray-200 bg-gray-200 sm:grid-cols-2 lg:grid-cols-3">
                        {featuredFoods.map((food) => (
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
                        {eventTypes.map((type) => {
                            const Icon = type.icon;
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
                                    {packages.map((pkg) => (
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
                                        {packages.map((pkg) => (
                                            <td key={pkg.name} className={`border border-gray-200 px-6 py-3.5 text-center text-gray-600 ${pkg.highlight ? "bg-[#173d36]/[0.03] font-medium" : ""}`}>
                                                {pkg[row.key]}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                                <tr className="border-t-2 border-gray-200 bg-white">
                                    <td className="px-6 py-4" />
                                    {packages.map((pkg) => (
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
                            <Image src="/media/station-collage.svg" alt="Filipino food station collage" width={980} height={560} className="h-full w-full object-cover" />
                        </div>
                        <div className="divide-y divide-gray-200">
                            {stations.map((station) => (
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
                        {[
                            { label: "Birthday Setup", tall: true },
                            { label: "Wedding Service", tall: false },
                            { label: "Corporate Catering", tall: false },
                            { label: "Community Booth", tall: true },
                            { label: "Family Gathering", tall: false },
                            { label: "Dessert Station", tall: false },
                        ].map((item, index) => (
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
                        {testimonials.map((item) => (
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

            <footer className="bg-gray-900 text-gray-400">
                <div className="mx-auto max-w-6xl px-6 py-14">
                    <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
                        <div className="sm:col-span-2 lg:col-span-1">
                            <div className="flex items-center gap-3">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#173d36] text-white"><Utensils size={14} /></div>
                                <span className="text-sm font-bold uppercase tracking-widest text-white">Scooptopia</span>
                            </div>
                            <p className="mt-3 text-xs leading-relaxed">Authentic Filipino street food elevated for memorable events across the United States.</p>
                        </div>
                        <div>
                            <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-white">Quick Links</h4>
                            <ul className="space-y-2 text-xs">
                                {[["About Us", "#about"], ["Menu", "#menu"], ["Packages", "#packages"], ["Gallery", "#gallery"], ["Contact", "#inquiry"]].map(([label, href]) => (
                                    <li key={label}><a href={href} className="transition hover:text-white">{label}</a></li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-white">Services</h4>
                            <ul className="space-y-2 text-xs">
                                {["Street Food Stations", "Event Styling", "Corporate Catering", "Wedding Catering", "Private Parties"].map((item) => <li key={item}>{item}</li>)}
                            </ul>
                        </div>
                        <div>
                            <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-white">Contact</h4>
                            <ul className="space-y-3 text-xs">
                                <li className="flex items-start gap-2"><Mail size={12} className="mt-0.5 shrink-0 text-[#c9a15c]" />hello@scooptopia.com</li>
                                <li className="flex items-start gap-2"><Phone size={12} className="mt-0.5 shrink-0 text-[#c9a15c]" />(555) 123-4567</li>
                                <li className="flex items-start gap-2"><MapPin size={12} className="mt-0.5 shrink-0 text-[#c9a15c]" />Based in the United States</li>
                            </ul>
                            <div className="mt-5 flex gap-3">
                                <a href="#" aria-label="Facebook" className="transition hover:text-white"><svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true"><path d="M13.5 8.5V6.8c0-.8.5-1 1-1h1.4V3.1h-2.2c-2.5 0-3.7 1.6-3.7 3.9v1.5H8v2.8h2v9.6h3.5v-9.6h2.3l.4-2.8h-2.7Z" /></svg></a>
                                <a href="#" aria-label="Instagram" className="transition hover:text-white"><svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true"><path d="M12 7.2A4.8 4.8 0 1 0 16.8 12 4.81 4.81 0 0 0 12 7.2Zm0 7.9A3.1 3.1 0 1 1 15.1 12 3.1 3.1 0 0 1 12 15.1Z" /><path d="M17.7 3.7H6.3a2.6 2.6 0 0 0-2.6 2.6v11.4a2.6 2.6 0 0 0 2.6 2.6h11.4a2.6 2.6 0 0 0 2.6-2.6V6.3a2.6 2.6 0 0 0-2.6-2.6Zm.9 14a.9.9 0 0 1-.9.9H6.3a.9.9 0 0 1-.9-.9V6.3a.9.9 0 0 1 .9-.9h11.4a.9.9 0 0 1 .9.9Z" /><circle cx="17.1" cy="6.9" r="1.1" /></svg></a>
                            </div>
                        </div>
                    </div>
                    <div className="mt-10 border-t border-gray-800 pt-6 text-center text-xs text-gray-600">&copy; {new Date().getFullYear()} Scooptopia Catering and Events. All rights reserved.</div>
                </div>
            </footer>
        </div>
    );
}
