import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

interface EmptyStateProps {
    title?: string;
    description?: string;
    actionLabel?: string;
    onAction?: () => void;
}

export const EmptyState = ({
    title = "No classes found",
    description = "You haven't joined or created any classes yet.",
    actionLabel,
    onAction,
}: EmptyStateProps) => {
    return (
        <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-200 bg-slate-50/50 p-12 text-center dark:border-slate-800 dark:bg-slate-900/50">
            <div className="mb-4 rounded-full bg-slate-100 p-4 dark:bg-slate-800">
                <PlusCircle className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="mb-2 text-lg font-semibold">{title}</h3>
            <p className="mb-6 max-w-sm text-sm text-muted-foreground">{description}</p>
            {actionLabel && onAction && (
                <Button onClick={onAction} className="rounded-xl">
                    {actionLabel}
                </Button>
            )}
        </div>
    );
};
