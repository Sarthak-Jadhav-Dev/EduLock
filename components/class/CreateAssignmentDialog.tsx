import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DatePicker } from "@/components/ui/date-picker";
import { useState } from "react";
import { createAssignment } from "@/services/assignment.service";
import { Loader2 } from "lucide-react";

interface CreateAssignmentDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    classId: string;
    onSuccess?: () => void;
}

export const CreateAssignmentDialog = ({ open, onOpenChange, classId, onSuccess }: CreateAssignmentDialogProps) => {
    const [loading, setLoading] = useState(false);
    const [dueDate, setDueDate] = useState<Date>();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const data = {
            classId,
            title: formData.get("title") as string,
            description: formData.get("description") as string,
            deadline: dueDate ? dueDate.toISOString() : "",
            points: Number(formData.get("points")),
        };

        try {
            await createAssignment(data);
            onSuccess?.();
            onOpenChange(false);
        } catch (error) {
            console.error("Failed to create assignment:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Create Assignment</DialogTitle>
                        <DialogDescription>
                            Set up a new assignment for your students to complete.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-6 py-6">
                        <div className="grid gap-2">
                            <Label htmlFor="title">Title</Label>
                            <Input id="title" name="title" placeholder="e.g. Chapter 5 Problems" required />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                name="description"
                                placeholder="Instructions for the assignment..."
                                className="h-24"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label>Due Date</Label>
                                <DatePicker date={dueDate} setDate={setDueDate} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="points">Points</Label>
                                <Input id="points" name="points" type="number" placeholder="100" min="0" required />
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={loading}>
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Creating...
                                </>
                            ) : (
                                "Create Assignment"
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};
