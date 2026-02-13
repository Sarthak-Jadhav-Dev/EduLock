import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { BarChart3, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { votePoll } from "@/services/poll.service";

export interface Poll {
    id: string;
    question: string;
    options: { id: string; text: string; votes: number }[];
    totalVotes: number;
    userVoted?: string; // id of option user voted for
}

interface PollCardProps {
    poll: Poll;
    role: "teacher" | "student";
    onUpdate?: () => void;
}

export const PollCard = ({ poll, role, onUpdate }: PollCardProps) => {
    const [selectedOption, setSelectedOption] = useState<string | undefined>(poll.userVoted);
    const [hasVoted, setHasVoted] = useState(!!poll.userVoted);
    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleVoteClick = (optionId: string) => {
        if (!hasVoted && role === "student") {
            setSelectedOption(optionId);
            setConfirmDialogOpen(true);
        }
    };

    const confirmVote = async () => {
        if (selectedOption) {
            setLoading(true);
            try {
                await votePoll({ pollId: poll.id, optionId: selectedOption });
                setHasVoted(true);
                onUpdate?.();
            } catch (error) {
                console.error("Failed to vote:", error);
            } finally {
                setLoading(false);
                setConfirmDialogOpen(false);
            }
        }
    };

    return (
        <>
            <Card className="overflow-hidden rounded-2xl border-none shadow-sm hover:shadow-md transition-all">
                <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-4">
                    <div className="rounded-xl bg-purple-100 p-2.5 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
                        <BarChart3 className="h-6 w-6" />
                    </div>
                    <div>
                        <CardTitle className="text-lg">{poll.question}</CardTitle>
                        <p className="text-sm text-muted-foreground">{poll.totalVotes} votes</p>
                    </div>
                </CardHeader>
                <CardContent>
                    {(role === "teacher" || hasVoted) ? (
                        <div className="space-y-4">
                            {poll.options.map((option) => {
                                const percentage = poll.totalVotes > 0
                                    ? Math.round((option.votes / poll.totalVotes) * 100)
                                    : 0;
                                const isSelected = option.id === selectedOption;

                                return (
                                    <div key={option.id} className="space-y-1.5">
                                        <div className="flex justify-between text-sm">
                                            <span className={cn("font-medium", isSelected && "text-primary")}>
                                                {option.text} {isSelected && "(You)"}
                                            </span>
                                            <span className="text-muted-foreground">{percentage}%</span>
                                        </div>
                                        <Progress value={percentage} className="h-2" />
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {poll.options.map((option) => (
                                <div
                                    key={option.id}
                                    onClick={() => handleVoteClick(option.id)}
                                    className="group flex cursor-pointer items-center space-x-3 rounded-xl border p-3 transition-all hover:bg-slate-50 hover:border-primary/50 dark:hover:bg-slate-900"
                                >
                                    <div className={cn(
                                        "flex h-5 w-5 items-center justify-center rounded-full border transition-colors",
                                        "group-hover:border-primary"
                                    )}>
                                        {/* Bullet point circle visual */}
                                        <div className="h-2.5 w-2.5 rounded-full bg-transparent group-hover:bg-primary/20" />
                                    </div>
                                    <Label className="flex-1 cursor-pointer font-normal group-hover:text-primary">
                                        {option.text}
                                    </Label>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Confirmation Dialog */}
            <AlertDialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
                <AlertDialogContent className="rounded-2xl">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Confirm Vote</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to vote for this option? You cannot change your vote later.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={(e) => { e.preventDefault(); confirmVote(); }} disabled={loading}>
                            {loading ? "Voting..." : "Confirm"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
};
