import { Utensils } from "lucide-react";

type BrandMarkProps = {
    caption?: string;
    variant?: "modern" | "classic";
};

export function BrandMark({ caption, variant = "modern" }: BrandMarkProps) {
    if (variant === "classic") {
        return (
            <>
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#173d36] text-white">
                    <Utensils size={16} />
                </div>
                <div>
                    <span className="block text-sm font-bold uppercase tracking-widest text-[#173d36]">Scooptopia</span>
                    <span className="block text-[10px] text-gray-500">{caption ?? "Filipino Street Food Catering"}</span>
                </div>
            </>
        );
    }

    return (
        <>
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-green text-[#f8f2e9]">
                <Utensils size={17} />
            </div>
            <div className="min-w-0">
                <p className="truncate text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-green-soft">Scooptopia</p>
                <p className="truncate text-sm text-ink/68">{caption ?? "Bold Flavors. Good Vibes. Made to Share."}</p>
            </div>
        </>
    );
}
