"use client";

import { motion } from "framer-motion";

type SectionRevealProps = {
    children: React.ReactNode;
};

export function SectionReveal({ children }: SectionRevealProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
        >
            {children}
        </motion.div>
    );
}
