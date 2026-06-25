import type { AnchorHTMLAttributes } from "react";

type SocialPlatform = "facebook" | "instagram";

type SocialIconLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
    platform: SocialPlatform;
};

const socialPaths = {
    facebook: (
        <path d="M13.5 8.5V6.8c0-.8.5-1 1-1h1.4V3.1h-2.2c-2.5 0-3.7 1.6-3.7 3.9v1.5H8v2.8h2v9.6h3.5v-9.6h2.3l.4-2.8h-2.7Z" />
    ),
    instagram: (
        <>
            <path d="M12 7.2A4.8 4.8 0 1 0 16.8 12 4.81 4.81 0 0 0 12 7.2Zm0 7.9A3.1 3.1 0 1 1 15.1 12 3.1 3.1 0 0 1 12 15.1Z" />
            <path d="M17.7 3.7H6.3a2.6 2.6 0 0 0-2.6 2.6v11.4a2.6 2.6 0 0 0 2.6 2.6h11.4a2.6 2.6 0 0 0 2.6-2.6V6.3a2.6 2.6 0 0 0-2.6-2.6Zm.9 14a.9.9 0 0 1-.9.9H6.3a.9.9 0 0 1-.9-.9V6.3a.9.9 0 0 1 .9-.9h11.4a.9.9 0 0 1 .9.9Z" />
            <circle cx="17.1" cy="6.9" r="1.1" />
        </>
    ),
};

export function SocialIconLink({ platform, className, ...anchorProps }: SocialIconLinkProps) {
    const label = platform === "facebook" ? "Facebook" : "Instagram";

    return (
        <a aria-label={label} href="#" {...anchorProps} className={className}>
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                {socialPaths[platform]}
            </svg>
        </a>
    );
}
