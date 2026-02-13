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
import { createAnnouncement } from "@/services/announcement.service";
import { Loader2 } from "lucide-react";

interface CreateAnnouncementDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    classId: string;
    onSuccess?: () => void;
}

export const CreateAnnouncementDialog = ({ open, onOpenChange, classId, onSuccess }: CreateAnnouncementDialogProps) => {
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const title = formData.get("title") as string;
        const content = formData.get("content") as string;
        const message = `${title}\n\n${content}`;

        try {
            await createAnnouncement({ classId, message });
            onSuccess?.();
            onOpenChange(false);
        } catch (error) {
            console.error("Failed to create announcement:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>New Announcement</DialogTitle>
                        <DialogDescription>
                            Share important updates or news with your class.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-6 py-6">
                        <div className="grid gap-2">
                            <Label htmlFor="title">Title</Label>
                            <Input id="title" name="title" placeholder="Correction for assignment" required />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="content">Content</Label>
                            <Textarea
                                id="content"
                                name="content"
                                placeholder="Write your announcement here..."
                                className="h-32"
                                required
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
                                    Posting...
                                </>
                            ) : (
                                "Post Announcement"
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};
