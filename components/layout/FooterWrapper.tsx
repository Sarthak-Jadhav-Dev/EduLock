"use client";

import { usePathname } from "next/navigation";
import { MinimalFooter } from "@/components/ui/minimal-footer";

export function FooterWrapper() {
    const pathname = usePathname();

    // Don't render global footer on dashboard pages
    if (pathname?.startsWith("/dashboard")) {
        return null;
    }

    return <MinimalFooter />;
}
