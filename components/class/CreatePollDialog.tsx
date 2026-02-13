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
import { Plus, X, Loader2 } from "lucide-react";
import { useState } from "react";
import { createPoll } from "@/services/poll.service";

interface CreatePollDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    classId: string;
    onSuccess?: () => void;
}

export const CreatePollDialog = ({ open, onOpenChange, classId, onSuccess }: CreatePollDialogProps) => {
    const [loading, setLoading] = useState(false);
    const [options, setOptions] = useState(["", ""]);

    const addOption = () => {
        setOptions([...options, ""]);
    };

    const removeOption = (index: number) => {
        if (options.length > 2) {
            const newOptions = [...options];
            newOptions.splice(index, 1);
            setOptions(newOptions);
        }
    };

    const handleOptionChange = (index: number, value: string) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const question = formData.get("question") as string;

        // Filter out empty options
        const validOptions = options.filter(opt => opt.trim() !== "");

        try {
            await createPoll({ classId, question, options: validOptions });
            onSuccess?.();
            onOpenChange(false);
        } catch (error) {
            console.error("Failed to create poll:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Create Poll</DialogTitle>
                        <DialogDescription>
                            Ask your students a question and provide options for them to vote on.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-6 py-6">
                        <div className="grid gap-2">
                            <Label htmlFor="question">Question</Label>
                            <Input id="question" name="question" placeholder="e.g. When should we have the review session?" required />
                        </div>

                        <div className="space-y-3">
                            <Label>Options</Label>
                            {options.map((option, index) => (
                                <div key={index} className="flex gap-2">
                                    <Input
                                        value={option}
                                        onChange={(e) => handleOptionChange(index, e.target.value)}
                                        placeholder={`Option ${index + 1}`}
                                        required
                                    />
                                    {options.length > 2 && (
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => removeOption(index)}
                                            className="text-muted-foreground hover:text-destructive"
                                        >
                                            <X className="h-4 w-4" />
                                        </Button>
                                    )}
                                </div>
                            ))}
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={addOption}
                                className="w-full border-dashed"
                            >
                                <Plus className="mr-2 h-3.5 w-3.5" />
                                Add Option
                            </Button>
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
                                "Create Poll"
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};
