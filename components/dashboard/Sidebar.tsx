import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import Link from "next/link";

interface SidebarItemProps {
    icon: LucideIcon;
    label: string;
    href: string;
    isActive?: boolean;
}

const SidebarItem = ({ icon: Icon, label, href, isActive }: SidebarItemProps) => {
    return (
        <Link
            href={href}
            className={cn(
                "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all hover:bg-slate-100 dark:hover:bg-slate-800",
                isActive
                    ? "bg-slate-100 text-primary dark:bg-slate-800"
                    : "text-muted-foreground"
            )}
        >
            <Icon className="h-5 w-5" />
            <span>{label}</span>
        </Link>
    );
};

export const Sidebar = ({ className }: { className?: string }) => {
    return (
        <aside className={cn("hidden h-screen w-64 flex-col border-r bg-background p-4 md:flex", className)}>
            <div className="mb-8 px-4 py-2">
                <h1 className="text-xl font-bold tracking-tight text-primary">EduLock</h1>
            </div>
            <nav className="flex flex-1 flex-col gap-2">
                <SidebarItem icon={LayoutDashboard} label="Dashboard" href="/dashboard" isActive />
                <SidebarItem icon={BookOpen} label="My Classes" href="/dashboard/classes" />
                <SidebarItem icon={Settings} label="Settings" href="/dashboard/settings" />
            </nav>
            <div className="border-t p-4">
                <div className="flex items-center gap-3 rounded-xl p-2 hover:bg-slate-100 dark:hover:bg-slate-800">
                    <div className="h-8 w-8 rounded-full bg-slate-200 dark:bg-slate-700" />
                    <div className="text-sm">
                        <p className="font-medium">User Name</p>
                        <p className="text-xs text-muted-foreground">user@example.com</p>
                    </div>
                </div>
            </div>
        </aside>
    );
};

import { BookOpen, LayoutDashboard, Settings } from "lucide-react";
