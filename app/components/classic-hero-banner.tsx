"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

type ClassicSlide = {
    title: string;
    description: string;
    badge: string;
    image: {
        src: string;
        alt: string;
    };
    stats: [string, string];
};

const slides: ClassicSlide[] = [
    {
        title: "Bold Filipino Flavors for Every Celebration",
        description:
            "Authentic Filipino street food catering for weddings, birthdays, corporate mixers, and community gatherings.",
        badge: "Filipino Street Food Catering",
        image: {
            src: "/media/hero-plate.svg",
            alt: "Scooptopia plated Filipino street food presentation",
        },
        stats: ["Street food stations", "Warm, polished service"],
    },
    {
        title: "Service That Moves With the Event",
        description:
            "Designed for smooth guest flow, lively stations, and a banner experience that feels active without being busy.",
        badge: "Event Flow & Styling",
        image: {
            src: "/media/station-collage.svg",
            alt: "Scooptopia station collage for celebrations and events",
        },
        stats: ["Fast setup", "Friendly staffing"],
    },
    {
        title: "A Classic Banner for a Modern Filipino Brand",
        description:
            "A traditional web-style hero with a rotating banner and clear calls to action, tailored for Scooptopia.",
        badge: "Classic Banner",
        image: {
            src: "/media/event-table.svg",
            alt: "Elegant Filipino event table styling",
        },
        stats: ["Elegant presentation", "Simple, direct messaging"],
    },
];

export function ClassicHeroBanner() {
    const [activeIndex, setActiveIndex] = useState(0);
    const activeSlide = slides[activeIndex];

    useEffect(() => {
        const timer = window.setInterval(() => {
            setActiveIndex((currentIndex) => (currentIndex === slides.length - 1 ? 0 : currentIndex + 1));
        }, 6000);

        return () => window.clearInterval(timer);
    }, []);

    return (
        <section className="relative overflow-hidden border-b border-white/10 bg-[#173d36] text-white">
            <div
                className="absolute inset-0"
                style={{
                    background:
                        "linear-gradient(90deg, rgba(6,18,16,0.96) 0%, rgba(23,61,54,0.94) 50%, rgba(23,61,54,0.82) 100%)",
                }}
            />
            <div
                className="absolute inset-0 opacity-20"
                style={{
                    backgroundImage:
                        "radial-gradient(circle at 20% 20%, rgba(201,161,92,0.55) 0%, transparent 28%), radial-gradient(circle at 80% 65%, rgba(248,242,233,0.16) 0%, transparent 30%)",
                }}
            />

            <div className="relative mx-auto grid max-w-6xl gap-10 px-6 py-16 md:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-24">
                <div className="max-w-2xl">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={`${activeSlide.badge}-${activeIndex}`}
                            initial={{ opacity: 0, y: 18 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -12 }}
                            transition={{ duration: 0.45, ease: "easeOut" }}
                        >
                            <p className="inline-flex items-center rounded-full border border-white/18 bg-white/8 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white/80">
                                {activeSlide.badge}
                            </p>
                            <h1 className="mt-5 text-4xl font-bold leading-tight text-white md:text-5xl lg:text-[4.3rem]">
                                {activeSlide.title}
                            </h1>
                            <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/78">
                                {activeSlide.description}
                            </p>
                        </motion.div>
                    </AnimatePresence>

                    <div className="mt-8 flex flex-wrap gap-4">
                        <a
                            href="#inquiry"
                            className="rounded bg-[#c9a15c] px-7 py-3 font-semibold text-[#173d36] transition hover:bg-[#d6b06a]"
                        >
                            Request a Quote
                        </a>
                        <a
                            href="#packages"
                            className="rounded border border-white/30 px-7 py-3 font-semibold text-white transition hover:bg-white/10"
                        >
                            View Packages
                        </a>
                    </div>

                    <div className="mt-8 grid gap-4 sm:grid-cols-2">
                        {activeSlide.stats.map((stat) => (
                            <div key={stat} className="border-t border-white/12 pt-4 text-sm text-white/72">
                                {stat}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="relative">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={`${activeSlide.image.src}-${activeIndex}`}
                            initial={{ opacity: 0, x: 30, scale: 0.98 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: -20, scale: 0.98 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            className="relative overflow-hidden rounded-[2rem] border border-white/12 bg-[#0f2621] shadow-[0_28px_80px_rgba(0,0,0,0.28)]"
                        >
                            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(248,242,233,0.08),transparent_35%,rgba(23,61,54,0.3))]" />
                            <Image
                                src={activeSlide.image.src}
                                alt={activeSlide.image.alt}
                                width={900}
                                height={780}
                                className="h-[26rem] w-full object-cover sm:h-[30rem]"
                            />
                            <div className="absolute inset-x-6 bottom-6 flex items-center justify-between rounded-full border border-white/12 bg-black/35 px-5 py-3 backdrop-blur-sm">
                                <span className="text-xs uppercase tracking-[0.24em] text-white/70">Classic banner</span>
                                <span className="text-xs text-[#f8f2e9]">Slide {activeIndex + 1} of {slides.length}</span>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    <div className="mt-4 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                            {slides.map((slide, index) => (
                                <button
                                    key={slide.badge}
                                    type="button"
                                    aria-label={`Go to slide ${index + 1}`}
                                    aria-pressed={index === activeIndex}
                                    onClick={() => setActiveIndex(index)}
                                    className={`h-2.5 rounded-full transition ${index === activeIndex ? "w-12 bg-[#f8f2e9]" : "w-2.5 bg-white/30 hover:bg-white/50"}`}
                                />
                            ))}
                        </div>

                        <div className="text-xs uppercase tracking-[0.24em] text-white/45">
                            Banner rotates automatically
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
