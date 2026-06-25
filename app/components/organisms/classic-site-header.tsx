import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { BrandMark } from "@/app/components/atoms/brand-mark";
import { SocialLinks } from "@/app/components/molecules/social-links";

const navItems = [
    ["Home", "#top"],
    ["About", "#about"],
    ["Menu", "#menu"],
    ["Packages", "#packages"],
    ["Gallery", "#gallery"],
    ["Contact", "#inquiry"],
] as const;

export function ClassicSiteHeader() {
    return (
        <>
            <div className="border-b border-gray-200 bg-[#173d36] text-white">
                <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-2 text-xs">
                    <div className="flex items-center gap-6">
                        <span className="flex items-center gap-1.5"><MapPin size={11} />Based in the United States</span>
                        <span className="flex items-center gap-1.5"><Mail size={11} />hello@scooptopia.com</span>
                        <span className="flex items-center gap-1.5"><Phone size={11} />(555) 123-4567</span>
                    </div>
                    <div className="hidden items-center gap-4 sm:flex">
                        <SocialLinks style="classic" />
                    </div>
                </div>
            </div>

            <header className="sticky top-0 z-50 border-b border-gray-200 bg-white shadow-sm">
                <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4">
                    <Link href="/classic" className="flex items-center gap-3">
                        <BrandMark variant="classic" />
                    </Link>

                    <nav className="hidden items-center gap-7 lg:flex">
                        {navItems.map(([label, href]) => (
                            <a key={label} href={href} className="text-sm font-medium text-gray-700 transition hover:text-[#173d36]">{label}</a>
                        ))}
                    </nav>

                    <a href="#inquiry" className="rounded bg-[#173d36] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#26564d]">Request a Quote</a>
                </div>
            </header>
        </>
    );
}
