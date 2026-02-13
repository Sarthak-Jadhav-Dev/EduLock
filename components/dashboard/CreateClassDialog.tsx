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
import { useState } from "react";
import { createClass } from "@/services/class.service";
import { Loader2 } from "lucide-react";

interface CreateClassDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSuccess?: () => void;
}

export const CreateClassDialog = ({ open, onOpenChange, onSuccess }: CreateClassDialogProps) => {
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get("name") as string,
            subject: formData.get("subject") as string,
            description: formData.get("description") as string, // Optional, checking if backend supports it
        };

        try {
            await createClass(data);
            onSuccess?.();
            onOpenChange(false);
        } catch (error) {
            console.error("Failed to create class:", error);
            // Add toast notification here if available
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Create Class</DialogTitle>
                        <DialogDescription>
                            Create a new class to start managing your students and assignments.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-6 py-6">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Class Name</Label>
                            <Input id="name" name="name" placeholder="e.g. Advanced Mathematics" required />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="subject">Subject</Label>
                            <Input id="subject" name="subject" placeholder="e.g. Mathematics" required />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                name="description"
                                placeholder="Brief description of the class..."
                                className="h-24"
                            />
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
                                "Create Class"
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};
