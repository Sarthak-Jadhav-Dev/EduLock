import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ClipboardList, Calendar, CheckCircle2, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { SubmitAssignmentDialog } from "./SubmitAssignmentDialog";

export interface Assignment {
    id: string;
    title: string;
    description: string;
    dueDate: string;
    points: number;
    status: "Open" | "Closed" | "Submitted";
}

interface AssignmentCardProps {
    assignment: Assignment;
    role: "teacher" | "student";
    onUpdate?: () => void;
}

export const AssignmentCard = ({ assignment, role, onUpdate }: AssignmentCardProps) => {
    const isClosed = assignment.status === "Closed";
    const isSubmitted = assignment.status === "Submitted";
    const [submitDialogOpen, setSubmitDialogOpen] = useState(false);

    return (
        <>
            <Card className="group flex flex-col justify-between overflow-hidden rounded-2xl border-none shadow-sm transition-all hover:shadow-md">
                <div>
                    <CardHeader className="pb-2">
                        <div className="mb-2 flex items-center justify-between">
                            <div className={cn(
                                "rounded-xl p-2.5",
                                isClosed ? "bg-slate-100 text-slate-500" : "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400"
                            )}>
                                <ClipboardList className="h-6 w-6" />
                            </div>
                            <Badge variant={isClosed ? "secondary" : isSubmitted ? "default" : "outline"} className={cn(
                                isSubmitted && "bg-emerald-600 hover:bg-emerald-700"
                            )}>
                                {assignment.status}
                            </Badge>
                        </div>
                        <CardTitle className="line-clamp-1">{assignment.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="mb-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1.5">
                                <Calendar className="h-4 w-4" />
                                <span>Due {assignment.dueDate}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <CheckCircle2 className="h-4 w-4" />
                                <span>{assignment.points} Points</span>
                            </div>
                        </div>
                        <p className="line-clamp-2 text-sm text-muted-foreground">
                            {assignment.description}
                        </p>
                    </CardContent>
                </div>

                <CardFooter className="border-t bg-slate-50/30 p-4 dark:bg-slate-900/30">
                    {role === "teacher" ? (
                        <Button variant="ghost" size="sm" className="w-full text-xs hover:bg-slate-100 dark:hover:bg-slate-800">
                            View Submissions
                        </Button>
                    ) : (
                        <Button
                            size="sm"
                            className={cn("w-full transition-all", isSubmitted ? "bg-emerald-600 hover:bg-emerald-700" : "")}
                            disabled={isClosed || isSubmitted}
                            onClick={() => !isSubmitted && setSubmitDialogOpen(true)}
                        >
                            {isSubmitted ? "View Submission" : "Submit Assignment"}
                        </Button>
                    )}
                </CardFooter>
            </Card>

            <SubmitAssignmentDialog
                open={submitDialogOpen}
                onOpenChange={setSubmitDialogOpen}
                assignmentId={assignment.id}
                onSuccess={onUpdate}
            />
        </>
    );
};
