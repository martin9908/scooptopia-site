import { Mail, MapPin, Phone } from "lucide-react";
import { BrandMark } from "@/app/components/atoms/brand-mark";
import { SocialLinks } from "@/app/components/molecules/social-links";

export function SimpleSiteFooter() {
    return (
        <footer className="section-shell mt-16 border-t border-brand-green/20 pt-6 text-sm text-ink/70">
            <p>Scooptopia Catering and Events</p>
            <p className="mt-1">Authentic Filipino street food elevated for memorable events.</p>
        </footer>
    );
}

export function ClassicSiteFooter() {
    return (
        <footer className="bg-gray-900 text-gray-400">
            <div className="mx-auto max-w-6xl px-6 py-14">
                <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="sm:col-span-2 lg:col-span-1">
                        <div className="flex items-center gap-3">
                            <BrandMark variant="classic" caption="Scooptopia Catering and Events" />
                        </div>
                        <p className="mt-3 text-xs leading-relaxed">Authentic Filipino street food elevated for memorable events across the United States.</p>
                    </div>
                    <div>
                        <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-white">Quick Links</h4>
                        <ul className="space-y-2 text-xs">
                            {["About Us", "Menu", "Packages", "Gallery", "Contact"].map((label) => (
                                <li key={label}><a href={`#${label === "About Us" ? "about" : label.toLowerCase()}`} className="transition hover:text-white">{label}</a></li>
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
                        <div className="mt-5">
                            <SocialLinks style="classic" />
                        </div>
                    </div>
                </div>
                <div className="mt-10 border-t border-gray-800 pt-6 text-center text-xs text-gray-600">&copy; {new Date().getFullYear()} Scooptopia Catering and Events. All rights reserved.</div>
            </div>
        </footer>
    );
}
