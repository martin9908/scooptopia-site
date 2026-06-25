import type { ReactNode } from "react";

type PageShellProps = {
    header: ReactNode;
    children: ReactNode;
    footer: ReactNode;
    className?: string;
};

export function PageShell({ header, children, footer, className = "" }: PageShellProps) {
    return (
        <div className={className}>
            {header}
            {children}
            {footer}
        </div>
    );
}
