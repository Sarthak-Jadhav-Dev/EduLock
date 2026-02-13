import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Bell, Menu, Search } from "lucide-react";

export const Topbar = ({ className }: { className?: string }) => {
    return (
        <header className={cn("flex h-16 items-center border-b bg-background px-6", className)}>
            <Button variant="ghost" size="icon" className="mr-4 md:hidden">
                <Menu className="h-5 w-5" />
            </Button>
            <div className="flex flex-1 items-center gap-4">
                <div className="relative w-full max-w-sm hidden sm:block">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <input
                        type="search"
                        placeholder="Search classes..."
                        className="h-9 w-full rounded-2xl border bg-slate-50 pl-9 pr-4 text-sm outline-none focus:ring-2 focus:ring-primary/20 dark:bg-slate-900"
                    />
                </div>
            </div>
            <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="rounded-full">
                    <Bell className="h-5 w-5 text-muted-foreground" />
                </Button>
                <div className="h-8 w-8 rounded-full bg-primary/10 md:hidden" />
            </div>
        </header>
    );
};
