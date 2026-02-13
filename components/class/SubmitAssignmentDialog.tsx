"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Loader2, UploadCloud } from "lucide-react";
import { useState, useRef } from "react";
import { submitAssignment } from "@/services/assignment.service";
import { cn } from "@/lib/utils";

interface SubmitAssignmentDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    assignmentId: string;
    onSuccess?: () => void;
}

export const SubmitAssignmentDialog = ({ open, onOpenChange, assignmentId, onSuccess }: SubmitAssignmentDialogProps) => {
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!file) return;

        setLoading(true);
        const formData = new FormData();
        formData.append("assignmentId", assignmentId);
        formData.append("file", file);

        try {
            await submitAssignment(formData);
            onSuccess?.();
            onOpenChange(false);
            setFile(null);
        } catch (error) {
            console.error("Failed to submit assignment:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Submit Assignment</DialogTitle>
                    <DialogDescription>
                        Upload your work for this assignment.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="file" className="mb-2">Assignment File</Label>
                        <div
                            onClick={() => fileInputRef.current?.click()}
                            className={cn(
                                "flex min-h-[150px] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 transition-colors hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900/50 dark:hover:bg-slate-900",
                                file && "border-blue-500 bg-blue-50 dark:border-blue-500/50 dark:bg-blue-900/20"
                            )}
                        >
                            <input
                                ref={fileInputRef}
                                id="file"
                                type="file"
                                className="hidden"
                                onChange={handleFileChange}
                                required
                            />
                            {file ? (
                                <div className="text-center">
                                    <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 mx-auto text-blue-600">
                                        <UploadCloud className="h-5 w-5" />
                                    </div>
                                    <p className="font-medium text-sm text-blue-600">{file.name}</p>
                                    <p className="text-xs text-muted-foreground mt-1">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                                </div>
                            ) : (
                                <div className="text-center">
                                    <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 mx-auto text-slate-500 dark:bg-slate-800">
                                        <UploadCloud className="h-5 w-5" />
                                    </div>
                                    <p className="font-medium text-sm">Click to upload file</p>
                                    <p className="text-xs text-muted-foreground mt-1">PDF, DOCX, ZIP up to 10MB</p>
                                </div>
                            )}
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
                        <Button type="submit" disabled={loading || !file}>
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Submit
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};
