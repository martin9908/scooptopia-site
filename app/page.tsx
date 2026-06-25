import Image from "next/image";
import Link from "next/link";
import {
    ArrowRight,
    Mail,
    Menu,
    MapPin,
    Search,
    Utensils,
    PartyPopper,
    HandPlatter,
    Store,
} from "lucide-react";
import { HeroSlideshow } from "@/app/components/hero-slideshow";
import { SectionReveal } from "@/app/components/section-reveal";
import { InquiryForm } from "@/app/components/inquiry-form";

const featuredFoods = [
    "Isaw",
    "Fish Balls",
    "Squid Balls",
    "Kwek-Kwek",
    "BBQ",
    "Lumpia",
    "Pancit",
    "Halo-Halo",
    "Sorbetes",
];

const eventTypes = [
    {
        title: "Family Celebrations",
        description: "Birthdays, reunions, and milestone gatherings with kalsada favorites.",
        icon: PartyPopper,
    },
    {
        title: "Weddings",
        description: "A refined Filipino street food experience designed for joyful receptions.",
        icon: HandPlatter,
    },
    {
        title: "Corporate Events",
        description: "Efficient and polished setups for teams, clients, and community partners.",
        icon: Store,
    },
];

const packages = [
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
];

const testimonials = [
    {
        quote:
            "Scooptopia made our wedding reception unforgettable. The setup looked elegant, and every guest kept coming back for seconds.",
        name: "Paolo and Trina",
        event: "Wedding Reception",
    },
    {
        quote:
            "The food brought our whole family back to Manila memories. Professional team, warm service, and flavors that hit home.",
        name: "The Dela Cruz Family",
        event: "Family Reunion",
    },
    {
        quote:
            "Our company event felt elevated without losing the fun street food vibe. Great flow, great taste, and great people.",
        name: "Marissa Lim",
        event: "Corporate Mixer",
    },
];

const heroSlides = [
    {
        label: "Filipino Street Food Catering",
        title: "Filipino Street Food, Reimagined for Every Celebration",
        description:
            "From favorite kalsada eats to unforgettable occasions, Scooptopia brings authentic Filipino flavor to events that feel warm, vibrant, and elevated.",
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
        description:
            "Our station layouts are built to keep lines moving, tables lively, and every serving looking polished from first plate to last call.",
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
        description:
            "Scooptopia pairs authentic Filipino street food with thoughtful presentation, reliable staffing, and a smoother event experience for hosts.",
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
];

export default function Home() {
    return (
        <div className="pb-20">
            <header className="section-shell pt-4 md:pt-6">
                <div className="flex items-center justify-between gap-4 rounded-[1.75rem] border border-brand-green/10 border-b-0 bg-white/80 px-5 py-2 text-[11px] text-ink/65 backdrop-blur md:px-6">
                    <div className="flex items-center gap-2.5">
                        <a
                            aria-label="Facebook"
                            href="#"
                            className="flex h-4.5 w-4.5 items-center justify-center rounded-full bg-brand-green text-[9px] font-semibold text-white transition hover:bg-brand-green-soft"
                        >
                            <svg
                                aria-hidden="true"
                                viewBox="0 0 24 24"
                                className="h-3.5 w-3.5 fill-current"
                            >
                                <path d="M13.5 8.5V6.8c0-.8.5-1 1-1h1.4V3.1h-2.2c-2.5 0-3.7 1.6-3.7 3.9v1.5H8v2.8h2v9.6h3.5v-9.6h2.3l.4-2.8h-2.7Z" />
                            </svg>
                        </a>
                        <a
                            aria-label="Instagram"
                            href="#"
                            className="flex h-4.5 w-4.5 items-center justify-center rounded-full bg-brand-green text-[8px] font-semibold text-white transition hover:bg-brand-green-soft"
                        >
                            <svg
                                aria-hidden="true"
                                viewBox="0 0 24 24"
                                className="h-3.5 w-3.5 fill-current"
                            >
                                <path d="M12 7.2A4.8 4.8 0 1 0 16.8 12 4.81 4.81 0 0 0 12 7.2Zm0 7.9A3.1 3.1 0 1 1 15.1 12 3.1 3.1 0 0 1 12 15.1Z" />
                                <path d="M17.7 3.7H6.3a2.6 2.6 0 0 0-2.6 2.6v11.4a2.6 2.6 0 0 0 2.6 2.6h11.4a2.6 2.6 0 0 0 2.6-2.6V6.3a2.6 2.6 0 0 0-2.6-2.6Zm.9 14a.9.9 0 0 1-.9.9H6.3a.9.9 0 0 1-.9-.9V6.3a.9.9 0 0 1 .9-.9h11.4a.9.9 0 0 1 .9.9Z" />
                                <circle cx="17.1" cy="6.9" r="1.1" />
                            </svg>
                        </a>
                    </div>
                    <div className="hidden items-center gap-5 md:flex">
                        <div className="flex items-center gap-1.5">
                            <MapPin size={12} className="text-brand-green" />
                            <span>Based in the United States</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Mail size={12} className="text-brand-green" />
                            <span>hello@scooptopia.com</span>
                        </div>
                    </div>
                </div>

                <nav className="elevated-card mt-1.5 flex items-center justify-between gap-5 px-5 py-3.5 md:px-6">
                    <Link href="#top" className="flex min-w-0 items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-green text-[#f8f2e9]">
                            <Utensils size={17} />
                        </div>
                        <div className="min-w-0">
                            <p className="truncate text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-green-soft">
                                Scooptopia
                            </p>
                            <p className="truncate text-sm text-ink/68">Bold Flavors. Good Vibes. Made to Share.</p>
                        </div>
                    </Link>

                    <div className="hidden items-center gap-6 lg:flex xl:gap-7">
                        <Link href="#top" className="text-sm font-medium text-ink/90 transition hover:text-brand-green">
                            Home
                        </Link>
                        <Link href="#about" className="text-sm font-medium text-ink/90 transition hover:text-brand-green">
                            About Us
                        </Link>
                        <Link href="#menu" className="text-sm font-medium text-ink/90 transition hover:text-brand-green">
                            Menu
                        </Link>
                        <Link href="#packages" className="text-sm font-medium text-ink/90 transition hover:text-brand-green">
                            Packages
                        </Link>
                        <Link href="#gallery" className="text-sm font-medium text-ink/90 transition hover:text-brand-green">
                            Gallery
                        </Link>
                        <Link href="#inquiry" className="text-sm font-medium text-ink/90 transition hover:text-brand-green">
                            Contact
                        </Link>
                    </div>

                    <div className="flex shrink-0 items-center gap-2">
                        <button
                            type="button"
                            aria-label="Search"
                            className="hidden h-10 w-10 items-center justify-center rounded-full border border-brand-green/10 text-ink transition hover:border-brand-green/30 hover:text-brand-green md:flex"
                        >
                            <Search size={17} />
                        </button>
                        <Link
                            href="#inquiry"
                            className="rounded-full bg-brand-green px-5 py-2.5 text-sm font-semibold !text-[#f8f2e9] transition hover:bg-brand-green-soft"
                            style={{ color: "#f8f2e9" }}
                        >
                            Request a Quote
                        </Link>
                        <button
                            type="button"
                            aria-label="Menu"
                            className="flex h-10 w-10 items-center justify-center rounded-full border border-brand-green/10 text-ink transition hover:border-brand-green/30 hover:text-brand-green lg:hidden"
                        >
                            <Menu size={18} />
                        </button>
                    </div>
                </nav>
            </header>

            <main id="top" className="mt-7 space-y-20 md:space-y-24">
                <SectionReveal>
                    <HeroSlideshow slides={heroSlides} />
                </SectionReveal>

                <SectionReveal>
                    <section className="section-shell -mt-10">
                        <div className="grid gap-0 overflow-hidden rounded-[2rem] bg-[#111111] text-white shadow-[0_20px_60px_rgba(0,0,0,0.2)] md:grid-cols-3">
                            {[
                                {
                                    number: "01.",
                                    title: "Street Food Stations",
                                    description: "Interactive service with favorites like BBQ, kwek-kwek, and lumpia.",
                                },
                                {
                                    number: "02.",
                                    title: "Event Styling",
                                    description: "A premium setup that feels polished, warm, and celebration-ready.",
                                },
                                {
                                    number: "03.",
                                    title: "On-Site Staffing",
                                    description: "Friendly service that keeps the food moving and guests engaged.",
                                },
                            ].map((item) => (
                                <article
                                    key={item.title}
                                    className="relative min-h-44 border-b border-white/10 px-6 py-7 md:border-b-0 md:border-r md:px-8"
                                >
                                    <p className="text-xs font-medium tracking-[0.22em] text-white/55">{item.number}</p>
                                    <h2 className="mt-4 text-lg uppercase tracking-[0.06em] text-white">{item.title}</h2>
                                    <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/72">{item.description}</p>
                                </article>
                            ))}
                        </div>
                    </section>
                </SectionReveal>

                <SectionReveal>
                    <section className="section-shell space-y-4" id="menu">
                        <h2 className="text-3xl text-brand-green md:text-4xl">Featured Foods</h2>
                        <p className="max-w-2xl text-ink/80">
                            Classic Filipino street food favorites, curated for events and built for sharing.
                        </p>
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {featuredFoods.map((food) => (
                                <article key={food} className="elevated-card p-5">
                                    <p className="text-lg font-semibold text-brand-green">{food}</p>
                                    <p className="mt-2 text-sm text-ink/75">
                                        Prepared fresh and plated for smooth service in both casual and formal settings.
                                    </p>
                                </article>
                            ))}
                        </div>
                    </section>
                </SectionReveal>

                <SectionReveal>
                    <section className="section-shell grid gap-6 md:grid-cols-2 md:items-stretch" id="about">
                        <article className="elevated-card p-6 md:p-8">
                            <h2 className="text-3xl text-brand-green md:text-4xl">About Scooptopia</h2>
                            <p className="mt-4 leading-relaxed text-ink/80">
                                Scooptopia is a Filipino street food catering and events company serving celebrations
                                across the United States. Our mission is simple: bring bold flavors, warm hospitality,
                                and memorable food station experiences to every event.
                            </p>
                            <p className="mt-4 leading-relaxed text-ink/80">
                                Every menu is inspired by Filipino heritage and executed with professional care so hosts
                                can focus on celebrating with their guests.
                            </p>
                        </article>
                        <article
                            className="rounded-[1.5rem] border border-brand-gold/25 p-6 md:p-8"
                            style={{ backgroundColor: "var(--brand-green)", color: "var(--cream)" }}
                        >
                            <h3 className="text-2xl text-[#f8f2e9]">What we value</h3>
                            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-[#f8f2e9]/90">
                                <li>Authenticity in flavor and cultural storytelling</li>
                                <li>Welcoming service that feels family-oriented and polished</li>
                                <li>Reliable event execution from setup to last serving</li>
                                <li>Community-centered celebrations that bring people together</li>
                            </ul>
                        </article>
                    </section>
                </SectionReveal>

                <SectionReveal>
                    <section className="section-shell" id="events">
                        <h2 className="text-3xl text-brand-green md:text-4xl">Event Types</h2>
                        <div className="mt-5 grid gap-4 md:grid-cols-3">
                            {eventTypes.map((type) => {
                                const Icon = type.icon;
                                return (
                                    <article key={type.title} className="elevated-card p-6">
                                        <div className="inline-flex rounded-full bg-brand-gold/20 p-3 text-brand-green">
                                            <Icon size={20} />
                                        </div>
                                        <h3 className="mt-4 text-xl text-brand-green">{type.title}</h3>
                                        <p className="mt-2 text-sm leading-relaxed text-ink/80">{type.description}</p>
                                    </article>
                                );
                            })}
                        </div>
                    </section>
                </SectionReveal>

                <SectionReveal>
                    <section className="section-shell" id="packages">
                        <div className="flex flex-wrap items-end justify-between gap-4">
                            <div>
                                <h2 className="text-3xl text-brand-green md:text-4xl">Catering Packages</h2>
                                <p className="mt-2 max-w-2xl text-ink/80">
                                    Tailored options with clear inclusions for guest count, food stations, setup, and staffing.
                                </p>
                            </div>
                            <Link href="#inquiry" className="text-sm font-semibold text-brand-green">
                                Build my package <ArrowRight className="inline" size={16} />
                            </Link>
                        </div>

                        <div className="mt-5 grid gap-4 md:grid-cols-3">
                            {packages.map((pkg) => (
                                <article key={pkg.name} className="elevated-card p-6">
                                    <h3 className="text-2xl text-brand-green">{pkg.name}</h3>
                                    <ul className="mt-4 space-y-2 text-sm text-ink/80">
                                        <li>{pkg.guestCount}</li>
                                        <li>{pkg.stations}</li>
                                        <li>{pkg.setup}</li>
                                        <li>{pkg.staffing}</li>
                                    </ul>
                                    <Link
                                        href="#inquiry"
                                        className="mt-5 inline-block rounded-full bg-brand-green px-4 py-2 text-sm font-semibold !text-[#f8f2e9]"
                                        style={{ color: "#f8f2e9" }}
                                    >
                                        Request Quote
                                    </Link>
                                </article>
                            ))}
                        </div>
                    </section>
                </SectionReveal>

                <SectionReveal>
                    <section className="section-shell" id="stations">
                        <h2 className="text-3xl text-brand-green md:text-4xl">Food Stations</h2>
                        <div className="mt-5 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
                            <div className="elevated-card overflow-hidden">
                                <Image
                                    src="/media/station-collage.svg"
                                    alt="Filipino food station collage"
                                    width={980}
                                    height={620}
                                    className="h-full w-full object-cover"
                                />
                            </div>
                            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                                {[
                                    "Street Grill",
                                    "Fried Favorites",
                                    "Noodle Bar",
                                    "Dessert Corner",
                                ].map((station) => (
                                    <article key={station} className="elevated-card p-5">
                                        <h3 className="text-lg text-brand-green">{station}</h3>
                                        <p className="mt-2 text-sm text-ink/80">
                                            Designed for quick service, clean flow, and high guest engagement.
                                        </p>
                                    </article>
                                ))}
                            </div>
                        </div>
                    </section>
                </SectionReveal>

                <SectionReveal>
                    <section className="section-shell" id="gallery">
                        <h2 className="text-3xl text-brand-green md:text-4xl">Gallery</h2>
                        <p className="mt-2 text-ink/80">
                            Moments from birthdays, weddings, corporate events, and community gatherings.
                        </p>
                        <div className="mt-5 columns-1 gap-4 sm:columns-2 lg:columns-3">
                            {[
                                "Birthday Setup",
                                "Wedding Service",
                                "Corporate Catering",
                                "Community Booth",
                                "Family Gathering",
                                "Dessert Station",
                            ].map((imageLabel, index) => (
                                <div key={imageLabel} className="elevated-card mb-4 break-inside-avoid overflow-hidden p-5">
                                    <div
                                        aria-label={imageLabel}
                                        role="img"
                                        className="w-full rounded-xl"
                                        style={{
                                            height: index % 2 === 0 ? "180px" : "240px",
                                            background:
                                                "linear-gradient(140deg, rgba(23,61,54,0.92), rgba(201,161,92,0.74))",
                                        }}
                                    />
                                    <p className="mt-3 text-sm font-medium text-brand-green">{imageLabel}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </SectionReveal>

                <SectionReveal>
                    <section className="section-shell" id="testimonials">
                        <h2 className="text-3xl text-brand-green md:text-4xl">Testimonials</h2>
                        <div className="mt-5 grid gap-4 md:grid-cols-3">
                            {testimonials.map((item) => (
                                <article key={item.name} className="elevated-card p-6">
                                    <p className="text-sm leading-relaxed text-ink/80">&ldquo;{item.quote}&rdquo;</p>
                                    <p className="mt-4 text-sm font-semibold text-brand-green">{item.name}</p>
                                    <p className="text-xs uppercase tracking-[0.12em] text-brand-green-soft">{item.event}</p>
                                </article>
                            ))}
                        </div>
                    </section>
                </SectionReveal>

                <SectionReveal>
                    <section id="inquiry" className="section-shell scroll-mt-6">
                        <div className="mb-4 space-y-2">
                            <h2 className="text-3xl text-brand-green md:text-4xl">Inquiry Form</h2>
                            <p className="max-w-2xl text-ink/80">
                                Tell us about your event and we will send package options tailored to your guest count,
                                event type, and service style.
                            </p>
                        </div>
                        <InquiryForm />
                    </section>
                </SectionReveal>
            </main>

            <footer className="section-shell mt-16 border-t border-brand-green/20 pt-6 text-sm text-ink/70">
                <p>Scooptopia Catering and Events</p>
                <p className="mt-1">Authentic Filipino street food elevated for memorable events.</p>
            </footer>
        </div>
    );
}
