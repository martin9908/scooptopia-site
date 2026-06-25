import type { ReactNode } from "react";

type SectionHeadingProps = {
    title: string;
    subtitle?: string;
    eyebrow?: string;
    className?: string;
    action?: ReactNode;
};

export function SectionHeading({ title, subtitle, eyebrow, className = "", action }: SectionHeadingProps) {
    return (
        <div className={className}>
            {eyebrow ? <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-[#c9a15c]">{eyebrow}</p> : null}
            <div className="flex flex-wrap items-end justify-between gap-4">
                <h2 className="text-3xl text-brand-green md:text-4xl">{title}</h2>
                {action}
            </div>
            {subtitle ? <p className="mt-2 max-w-2xl text-ink/80">{subtitle}</p> : null}
        </div>
    );
}
