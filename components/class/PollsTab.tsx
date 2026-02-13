import { Poll, PollCard } from "@/components/class/PollCard";

interface PollsTabProps {
    polls: Poll[];
    role: "teacher" | "student";
    onUpdate?: () => void;
}

export const PollsTab = ({ polls, role, onUpdate }: PollsTabProps) => {
    return (
        <div className="max-w-2xl space-y-6">
            {polls.map((poll) => (
                <PollCard key={poll.id} poll={poll} role={role} onUpdate={onUpdate} />
            ))}
        </div>
    );
};
