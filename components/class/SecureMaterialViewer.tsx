"use client";

import React, { useState, useEffect, useRef } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { X, ChevronLeft, ChevronRight, Loader2, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';

// Set worker source for react-pdf
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface SecureMaterialViewerProps {
    isOpen: boolean;
    onClose: () => void;
    materialUrl: string;
    materialType: "PDF" | "Video" | "Image" | "Document" | string;
    materialTitle: string;
    userEmail?: string;
    userName?: string;
}

export function SecureMaterialViewer({
    isOpen,
    onClose,
    materialUrl,
    materialType,
    materialTitle,
    userEmail = "user@edulock.com",
    userName = "Student",
}: SecureMaterialViewerProps) {
    const [numPages, setNumPages] = useState<number | null>(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [isBlurred, setIsBlurred] = useState(false);
    const [scale, setScale] = useState(1.0);
    const contentRef = useRef<HTMLDivElement>(null);

    // --- Security Features ---

    // 1. Blur on focus loss (Tab switching / screenshot attempts via OS)
    useEffect(() => {
        const handleBlur = () => {
            setIsBlurred(true);
            document.title = "Security Alert - EduLock";
        };
        const handleFocus = () => {
            setIsBlurred(false);
            document.title = materialTitle || "EduLock Viewer";
        };

        window.addEventListener("blur", handleBlur);
        window.addEventListener("focus", handleFocus);

        // Prevent Right Click
        const handleContextMenu = (e: MouseEvent) => e.preventDefault();
        document.addEventListener("contextmenu", handleContextMenu);

        // Prevent Keyboard Shortcuts (PrintScreen, Ctrl+P, Ctrl+S)
        const handleKeyDown = (e: KeyboardEvent) => {
            if (
                e.key === "PrintScreen" ||
                (e.ctrlKey && (e.key === "p" || e.key === "s" || e.key === "c")) ||
                (e.metaKey && (e.key === "p" || e.key === "s" || e.key === "c"))
            ) {
                e.preventDefault();
                setIsBlurred(true);
                setTimeout(() => setIsBlurred(false), 2000); // Temporary blur
                alert("Screenshots and copying are disabled for security reasons.");
            }
        };
        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("blur", handleBlur);
            window.removeEventListener("focus", handleFocus);
            document.removeEventListener("contextmenu", handleContextMenu);
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [materialTitle]);

    function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
        setNumPages(numPages);
    }

    const Watermark = () => (
        <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center overflow-hidden opacity-10">
            <div className="absolute h-[200%] w-[200%] -rotate-45 space-y-24">
                {Array.from({ length: 20 }).map((_, i) => (
                    <div key={i} className="flex justify-around text-xl font-bold text-red-500 whitespace-nowrap">
                        {Array.from({ length: 10 }).map((_, j) => (
                            <span key={j} className="mx-12">
                                {userEmail} • {userName} • {new Date().toLocaleDateString()}
                            </span>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );

    // --- Render Content based on Type ---
    const renderContent = () => {
        const type = materialType.toLowerCase();

        if (type.includes("pdf")) {
            return (
                <div className="flex flex-col items-center">
                    <Document
                        file={materialUrl}
                        onLoadSuccess={onDocumentLoadSuccess}
                        loading={
                            <div className="flex flex-col items-center justify-center gap-2 p-12">
                                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                                <span className="text-sm text-muted-foreground">Loading Secure PDF...</span>
                            </div>
                        }
                        error={
                            <div className="flex flex-col items-center justify-center gap-2 p-12 text-destructive">
                                <AlertTriangle className="h-8 w-8" />
                                <span>Failed to load PDF. Please try again.</span>
                            </div>
                        }
                        className="max-w-full shadow-2xl"
                    >
                        <Page
                            pageNumber={pageNumber}
                            scale={scale}
                            renderTextLayer={false}
                            renderAnnotationLayer={false}
                            className="mb-4 shadow-lg"
                            width={Math.min(window.innerWidth * 0.8, 800)}
                        />
                    </Document>

                    {/* PDF Controls */}
                    {numPages && (
                        <div className="fixed bottom-8 left-1/2 z-50 flex -translate-x-1/2 items-center gap-4 rounded-full bg-black/80 px-6 py-3 text-white backdrop-blur-md">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setPageNumber((p) => Math.max(p - 1, 1))}
                                disabled={pageNumber <= 1}
                                className="text-white hover:bg-white/20"
                            >
                                <ChevronLeft className="h-5 w-5" />
                            </Button>
                            <span className="text-sm font-medium">
                                Page {pageNumber} of {numPages}
                            </span>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setPageNumber((p) => Math.min(p + 1, numPages))}
                                disabled={pageNumber >= numPages}
                                className="text-white hover:bg-white/20"
                            >
                                <ChevronRight className="h-5 w-5" />
                            </Button>
                            <div className="ml-4 flex gap-2 border-l border-white/20 pl-4">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setScale((s) => Math.max(s - 0.2, 0.5))}
                                    className="text-white hover:bg-white/20"
                                >
                                    -
                                </Button>
                                <span className="text-xs">{Math.round(scale * 100)}%</span>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setScale((s) => Math.min(s + 0.2, 2.0))}
                                    className="text-white hover:bg-white/20"
                                >
                                    +
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            );
        }

        if (type.includes("video") || type.includes("mp4")) {
            return (
                <div className="relative flex w-full max-w-4xl items-center justify-center bg-black">
                    <video
                        controlsList="nodownload" // Chrome attribute to hide download
                        width="100%"
                        height="auto"
                        controls
                        autoPlay
                        className="max-h-[80vh] w-full rounded-lg shadow-2xl"
                        onContextMenu={(e) => e.preventDefault()} // Extra protection
                    >
                        <source src={materialUrl} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                    {/* Transparent overlay to block direct interaction if needed (optional, blocks controls too so be careful) */}
                    {/* <div className="absolute inset-0 z-10 bg-transparent" /> */}
                </div>
            );
        }

        if (type.includes("image") || type.includes("jpg") || type.includes("png")) {
            return (
                <div className="relative flex max-h-[85vh] max-w-[90vw] items-center justify-center overflow-auto">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={materialUrl}
                        alt={materialTitle}
                        className="max-h-full max-w-full rounded-lg object-contain shadow-2xl"
                    />
                </div>
            );
        }

        return (
            <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
                <AlertTriangle className="h-12 w-12 text-yellow-500" />
                <h3 className="text-xl font-semibold">Unsupported Format</h3>
                <p className="text-muted-foreground">
                    This file type ({materialType}) cannot be viewed securely in the browser.<br />
                    Please contact your administrator.
                </p>
            </div>
        );
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="max-w-[100vw] h-screen w-screen border-none bg-black/95 p-0 sm:rounded-none">
                {/* Header */}
                <div className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between bg-black/50 px-6 py-4 backdrop-blur-md">
                    <div>
                        <DialogTitle className="text-lg font-semibold text-white">{materialTitle}</DialogTitle>
                        <p className="text-xs text-white/60">Secure Viewer • {materialType}</p>
                    </div>
                    <Button variant="ghost" size="icon" onClick={onClose} className="text-white hover:bg-white/20 rounded-full">
                        <X className="h-6 w-6" />
                    </Button>
                </div>

                {/* Main Content Area */}
                <div
                    ref={contentRef}
                    className={cn(
                        "flex h-full w-full items-center justify-center overflow-auto pt-20 pb-20 select-none",
                        isBlurred ? "blur-xl grayscale transition-all duration-300" : "transition-all duration-300"
                    )}
                    onContextMenu={(e) => e.preventDefault()}
                >
                    {renderContent()}
                </div>

                {/* Security Overlays */}
                <Watermark />

                {/* Blur warning overlay */}
                {isBlurred && (
                    <div className="absolute inset-0 z-60 flex flex-col items-center justify-center bg-black/80 text-white backdrop-blur-sm">
                        <AlertTriangle className="mb-4 h-16 w-16 text-red-500 animate-pulse" />
                        <h2 className="text-3xl font-bold">Security Alert</h2>
                        <p className="mt-2 text-lg text-white/80">
                            Returning to application... content is hidden when not in focus.
                        </p>
                        <p className="mt-8 text-sm text-white/40">ID: {userEmail}</p>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}
