import Image from "next/image";
import Link from "next/link";
import {
    ArrowRight,
    PartyPopper,
    HandPlatter,
    Store,
} from "lucide-react";
import { HeroSlideshow } from "@/app/components/hero-slideshow";
import { SectionReveal } from "@/app/components/section-reveal";
import { InquiryForm } from "@/app/components/inquiry-form";
import { SectionHeading } from "@/app/components/atoms/section-heading";
import { ModernSiteHeader } from "@/app/components/organisms/modern-site-header";
import { SimpleSiteFooter } from "@/app/components/organisms/site-footers";
import { PageShell } from "@/app/components/templates/page-shell";
import { getSiteContent } from "@/app/lib/site-content-store";

const eventIconMap = {
    party: PartyPopper,
    wedding: HandPlatter,
    corporate: Store,
};

export default async function Home() {
    const content = await getSiteContent();

    return (
        <PageShell
            className="pb-20"
            header={<ModernSiteHeader />}
            footer={<SimpleSiteFooter />}
        >
            <main id="top" className="mt-7 space-y-20 md:space-y-24">
                <SectionReveal>
                    <HeroSlideshow slides={content.home.heroSlides} />
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
                        <SectionHeading
                            title="Featured Foods"
                            subtitle="Classic Filipino street food favorites, curated for events and built for sharing."
                        />
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {content.home.featuredFoods.map((food) => (
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
                            {content.home.eventTypes.map((type) => {
                                const Icon = eventIconMap[type.icon] ?? PartyPopper;
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
                            {content.home.packages.map((pkg) => (
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
                                    src={content.assets.stationCollageImage}
                                    alt="Filipino food station collage"
                                    width={980}
                                    height={620}
                                    className="h-full w-full object-cover"
                                />
                            </div>
                            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                                {content.home.stationNames.map((station) => (
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
                            {content.home.gallery.map((imageLabel, index) => (
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
                            {content.home.testimonials.map((item) => (
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

        </PageShell>
    );
}
