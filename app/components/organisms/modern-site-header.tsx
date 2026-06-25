import Link from "next/link";
import { Mail, MapPin, Menu, Search } from "lucide-react";
import { BrandMark } from "@/app/components/atoms/brand-mark";
import { SocialLinks } from "@/app/components/molecules/social-links";

const navItems = [
    ["Home", "#top"],
    ["About Us", "#about"],
    ["Menu", "#menu"],
    ["Packages", "#packages"],
    ["Gallery", "#gallery"],
    ["Contact", "#inquiry"],
] as const;

export function ModernSiteHeader() {
    return (
        <header className="section-shell pt-4 md:pt-6">
            <div className="flex items-center justify-between gap-4 rounded-[1.75rem] border border-brand-green/10 border-b-0 bg-white/80 px-5 py-2 text-[11px] text-ink/65 backdrop-blur md:px-6">
                <SocialLinks style="modern" />
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
                    <BrandMark />
                </Link>

                <div className="hidden items-center gap-6 lg:flex xl:gap-7">
                    {navItems.map(([label, href]) => (
                        <Link key={label} href={href} className="text-sm font-medium text-ink/90 transition hover:text-brand-green">
                            {label}
                        </Link>
                    ))}
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
    );
}
