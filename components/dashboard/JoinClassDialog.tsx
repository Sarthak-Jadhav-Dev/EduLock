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
import { useState } from "react";
import { joinClass } from "@/services/class.service";
import { Loader2 } from "lucide-react";

interface JoinClassDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSuccess?: () => void;
}

export const JoinClassDialog = ({ open, onOpenChange, onSuccess }: JoinClassDialogProps) => {
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const joinCode = formData.get("code") as string;

        try {
            await joinClass({ joinCode });
            onSuccess?.();
            onOpenChange(false);
        } catch (error) {
            console.error("Failed to join class:", error);
            // Handle error
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Join Class</DialogTitle>
                        <DialogDescription>
                            Enter the class code provided by your teacher to join.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-6 py-6">
                        <div className="grid gap-2">
                            <Label htmlFor="code">Class Code</Label>
                            <Input
                                id="code"
                                name="code"
                                placeholder="e.g. abc-123-xyz"
                                required
                                className="text-center text-lg uppercase tracking-widest placeholder:normal-case placeholder:tracking-normal"
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
                                    Joining...
                                </>
                            ) : (
                                "Join Class"
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};
