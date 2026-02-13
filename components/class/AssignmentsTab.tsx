import { Assignment, AssignmentCard } from "@/components/class/AssignmentCard";

interface AssignmentsTabProps {
    assignments: Assignment[];
    role: "teacher" | "student";
    onUpdate?: () => void;
}

export const AssignmentsTab = ({ assignments, role, onUpdate }: AssignmentsTabProps) => {
    return (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {assignments.map((assignment) => (
                <AssignmentCard key={assignment.id} assignment={assignment} role={role} onUpdate={onUpdate} />
            ))}
        </div>
    );
};
