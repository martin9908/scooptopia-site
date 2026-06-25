import { SocialIconLink } from "@/app/components/atoms/social-icon-link";

type SocialLinksProps = {
    style: "modern" | "classic";
};

export function SocialLinks({ style }: SocialLinksProps) {
    if (style === "classic") {
        return (
            <div className="flex items-center gap-4">
                <SocialIconLink platform="facebook" className="transition hover:text-[#c9a15c]" />
                <SocialIconLink platform="instagram" className="transition hover:text-[#c9a15c]" />
            </div>
        );
    }

    return (
        <div className="flex items-center gap-2.5">
            <SocialIconLink
                platform="facebook"
                className="flex h-4.5 w-4.5 items-center justify-center rounded-full bg-brand-green text-white transition hover:bg-brand-green-soft"
            />
            <SocialIconLink
                platform="instagram"
                className="flex h-4.5 w-4.5 items-center justify-center rounded-full bg-brand-green text-white transition hover:bg-brand-green-soft"
            />
        </div>
    );
}
