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
import { uploadMaterial } from "@/services/material.service";
import { Loader2 } from "lucide-react";

interface CreateMaterialDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    classId: string;
    onSuccess?: () => void;
}

export const CreateMaterialDialog = ({ open, onOpenChange, classId, onSuccess }: CreateMaterialDialogProps) => {
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);

        // Add classId to formData
        formData.append("classId", classId);

        // Ensure default type is set if not provided
        if (!formData.get("type")) {
            // Try to determine type from file
            const file = formData.get("file") as File;
            let type = "PDF";
            if (file) {
                if (file.type.includes("image")) type = "Image";
                else if (file.type.includes("pdf")) type = "PDF";
                else type = "Document";
            }
            formData.append("type", type);
        }

        try {
            await uploadMaterial(formData);
            onSuccess?.();
            onOpenChange(false);
        } catch (error) {
            console.error("Failed to upload material:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Add Material</DialogTitle>
                        <DialogDescription>
                            Upload documents for your students.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-6 py-6">
                        <div className="grid gap-2">
                            <Label htmlFor="title">Title</Label>
                            <Input id="title" name="title" placeholder="e.g. Lecture 1 Slides" required />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                name="description"
                                placeholder="Brief description of the material..."
                                className="h-24"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="file">File</Label>
                            <Input id="file" name="file" type="file" required />
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
                                    Uploading...
                                </>
                            ) : (
                                "Upload Material"
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};
