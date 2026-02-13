import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MoreVertical, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface ClassCardProps {
    id: string;
    name: string;
    subject: string;
    teacher: string;
    studentCount: number;
    color?: string;
}

const colors = [
    "bg-blue-500",
    "bg-emerald-500",
    "bg-amber-500",
    "bg-purple-500",
    "bg-rose-500",
    "bg-indigo-500",
];

export const ClassCard = ({ id, name, subject, teacher, studentCount, color }: ClassCardProps) => {
    const accentColor = color || colors[Math.floor(Math.random() * colors.length)];

    return (
        <Link href={`/dashboard/class/${id}`}>
            <Card className="group relative overflow-hidden rounded-2xl border-none shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
                <div className={cn("h-24 w-full", accentColor)} />
                <div className="absolute right-4 top-4">
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-white hover:bg-white/20">
                        <MoreVertical className="h-4 w-4" />
                    </Button>
                </div>

                <CardHeader className="pt-4 pb-2">
                    <div className="space-y-1">
                        <h3 className="line-clamp-1 text-xl font-semibold leading-none group-hover:text-primary group-hover:underline decoration-2 underline-offset-4">
                            {name}
                        </h3>
                        <p className="line-clamp-1 text-sm text-muted-foreground">{subject}</p>
                    </div>
                </CardHeader>

                <CardContent className="pb-4">
                    <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="font-medium text-foreground">{teacher}</span>
                    </div>
                </CardContent>

                <CardFooter className="border-t bg-slate-50/50 p-4 dark:bg-slate-900/50">
                    <div className="flex items-center gap-4 text-xs font-medium text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                            <Users className="h-3.5 w-3.5" />
                            <span>{studentCount} Students</span>
                        </div>
                    </div>
                </CardFooter>
            </Card>
        </Link>
    );
};
