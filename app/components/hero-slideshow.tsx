"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

type HeroSlide = {
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

type HeroSlideshowProps = {
    slides: HeroSlide[];
};

export function HeroSlideshow({ slides }: HeroSlideshowProps) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [direction, setDirection] = useState(1);
    const activeSlide = slides[activeIndex];
    const hasLongTitle = activeSlide.title.length > 58;

    const showPrevious = () => {
        setDirection(-1);
        setActiveIndex((currentIndex) =>
            currentIndex === 0 ? slides.length - 1 : currentIndex - 1
        );
    };

    const showNext = () => {
        setDirection(1);
        setActiveIndex((currentIndex) =>
            currentIndex === slides.length - 1 ? 0 : currentIndex + 1
        );
    };

    useEffect(() => {
        const intervalId = window.setInterval(() => {
            setDirection(1);
            setActiveIndex((currentIndex) =>
                currentIndex === slides.length - 1 ? 0 : currentIndex + 1
            );
        }, 6500);

        return () => window.clearInterval(intervalId);
    }, [slides.length]);

    return (
        <section className="section-shell elevated-card relative overflow-hidden bg-brand-green text-white">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(248,242,233,0.12),_transparent_24%),radial-gradient(circle_at_85%_18%,_rgba(201,161,92,0.24),_transparent_24%),linear-gradient(130deg,rgba(12,25,22,0.84),rgba(20,52,46,0.92))]" />

            <AnimatePresence mode="wait">
                <motion.div
                    key={activeSlide.primaryImage.src}
                    initial={{ opacity: 0, x: direction > 0 ? 28 : -28, scale: 1.02 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, x: direction > 0 ? -18 : 18, scale: 0.985 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="absolute inset-0"
                >
                    <Image
                        src={activeSlide.primaryImage.src}
                        alt={activeSlide.primaryImage.alt}
                        fill
                        priority
                        className="object-cover opacity-30 mix-blend-screen"
                        sizes="100vw"
                    />
                </motion.div>
            </AnimatePresence>

            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(12,25,22,0.9)_0%,rgba(12,25,22,0.78)_36%,rgba(12,25,22,0.44)_62%,rgba(12,25,22,0.18)_100%)]" />

            <div className="relative h-[40rem] px-8 py-10 md:px-10 md:py-12 lg:h-[42rem] lg:px-18 lg:py-14">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={`${activeSlide.label}-${activeIndex}`}
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.45, ease: "easeOut" }}
                        className="flex h-full max-w-3xl pr-10 md:pr-14 lg:max-w-[52rem] lg:pr-24 flex-col justify-center space-y-6"
                    >
                        <p className="inline-flex items-center rounded-full border border-white/18 bg-white/8 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#f8f2e9] backdrop-blur-sm">
                            {activeSlide.label}
                        </p>
                        <h1
                            className={`text-balance text-4xl leading-[0.96] text-[#f8f2e9] md:text-5xl ${hasLongTitle
                                    ? "max-w-3xl lg:text-[4rem] xl:text-[4.35rem]"
                                    : "max-w-4xl lg:text-[4.9rem]"
                                }`}
                        >
                            {activeSlide.title}
                        </h1>
                        <p className="max-w-2xl text-lg leading-relaxed text-white/84 md:text-[1.15rem]">
                            {activeSlide.description}
                        </p>
                        <div className="flex flex-wrap gap-3 pt-1">
                            <a
                                href="#inquiry"
                                className="rounded-full bg-[#f8f2e9] px-6 py-3 text-sm font-semibold shadow-[0_16px_35px_rgba(0,0,0,0.18)] transition hover:bg-white"
                                style={{ color: "#173d36" }}
                            >
                                Request a Quote
                            </a>
                            <a
                                href="#packages"
                                className="rounded-full border border-white/26 bg-white/8 px-6 py-3 text-sm font-semibold text-[#f8f2e9] backdrop-blur-sm transition hover:bg-white/14"
                            >
                                View Packages
                            </a>
                        </div>

                        <div className="flex flex-wrap gap-6 pt-6 text-[#f8f2e9]">
                            {slides.map((slide, index) => (
                                <button
                                    key={`${slide.eyebrow}-${index}`}
                                    type="button"
                                    aria-label={`Go to slide ${index + 1}`}
                                    aria-pressed={index === activeIndex}
                                    onClick={() => {
                                        setDirection(index > activeIndex ? 1 : -1);
                                        setActiveIndex(index);
                                    }}
                                    className="group flex items-start gap-3 text-left"
                                >
                                    <span
                                        className={`text-sm font-semibold transition ${index === activeIndex ? "text-brand-gold" : "text-white/44"
                                            }`}
                                    >
                                        {String(index + 1).padStart(2, "0")}
                                    </span>
                                    <span className="space-y-2">
                                        <span
                                            className={`block text-sm uppercase tracking-[0.2em] transition ${index === activeIndex ? "text-white" : "text-white/54 group-hover:text-white/78"
                                                }`}
                                        >
                                            {slide.eyebrow}
                                        </span>
                                        <span
                                            className={`block h-px w-16 transition ${index === activeIndex ? "bg-brand-gold" : "bg-white/20 group-hover:bg-white/36"
                                                }`}
                                        />
                                    </span>
                                </button>
                            ))}
                        </div>
                    </motion.div>
                </AnimatePresence>

                <button
                    type="button"
                    aria-label="Previous slide"
                    onClick={showPrevious}
                    className="absolute left-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/12 bg-[#111111]/78 text-white shadow-[0_12px_30px_rgba(0,0,0,0.25)] backdrop-blur-sm transition hover:bg-brand-green md:left-5"
                >
                    ←
                </button>
                <button
                    type="button"
                    aria-label="Next slide"
                    onClick={showNext}
                    className="absolute right-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/12 bg-[#111111]/78 text-white shadow-[0_12px_30px_rgba(0,0,0,0.25)] backdrop-blur-sm transition hover:bg-brand-green md:right-5"
                >
                    →
                </button>
            </div>
        </section>
    );
}
