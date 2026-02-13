import { Badge } from "@/components/ui/badge";
import { Users } from "lucide-react";

interface ClassHeaderProps {
    name: string;
    subject: string;
    teacher: string;
    studentCount: number;
    coverImage?: string;
}

export const ClassHeader = ({ name, subject, teacher, studentCount, coverImage }: ClassHeaderProps) => {
    return (
        <div className="relative overflow-hidden rounded-2xl bg-linear-to-r from-blue-600 to-indigo-600 p-8 text-white shadow-lg">
            {coverImage && (
                <div className="absolute inset-0 z-0">
                    <img src={coverImage} alt="Cover" className="h-full w-full object-cover opacity-20" />
                    <div className="absolute inset-0 bg-linear-to-r from-blue-900/80 to-indigo-900/80" />
                </div>
            )}
            <div className="relative z-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <h1 className="text-3xl font-bold tracking-tight">{name}</h1>
                        <Badge variant="secondary" className="bg-white/20 text-white hover:bg-white/30 border-none">
                            {subject}
                        </Badge>
                    </div>
                    <p className="text-blue-100">
                        Instructor: <span className="font-medium text-white">{teacher}</span>
                    </p>
                </div>

                <div className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
                    <Users className="h-4 w-4" />
                    <span>{studentCount} Students</span>
                </div>
            </div>

            {/* Decorative patterns */}
            <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
        </div>
    );
};
