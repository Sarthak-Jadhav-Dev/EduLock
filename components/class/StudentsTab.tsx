import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Mail } from "lucide-react";

export interface Student {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    joinedDate: string;
    status: "Active" | "Inactive";
}

export const StudentsTab = ({ students }: { students: Student[] }) => {
    return (
        <div className="rounded-2xl border bg-card shadow-sm">
            <Table>
                <TableHeader>
                    <TableRow className="hover:bg-transparent">
                        <TableHead className="w-[300px]">Student</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Joined Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {students.map((student) => (
                        <TableRow key={student.id} className="group cursor-pointer hover:bg-slate-50/50 dark:hover:bg-slate-900/50">
                            <TableCell className="font-medium">
                                <div className="flex items-center gap-3">
                                    <Avatar className="h-9 w-9 border">
                                        <AvatarImage src={student.avatar} />
                                        <AvatarFallback>{student.name[0]}</AvatarFallback>
                                    </Avatar>
                                    <span>{student.name}</span>
                                </div>
                            </TableCell>
                            <TableCell className="text-muted-foreground">{student.email}</TableCell>
                            <TableCell>{student.joinedDate}</TableCell>
                            <TableCell>
                                <Badge variant={student.status === "Active" ? "default" : "secondary"} className="rounded-md font-normal">
                                    {student.status}
                                </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                                <div className="flex items-center justify-end gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                        <Mail className="h-4 w-4 text-muted-foreground" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                        <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};
