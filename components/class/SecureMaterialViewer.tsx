"use client";

import React, { useState, useEffect, useRef } from "react";
import { X, ChevronLeft, ChevronRight, Loader2, AlertTriangle, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { viewMaterial } from "@/services/material.service";

// Define Python Backend URL (Hardcoded for now as per instructions, can move to env later)
const PYTHON_BACKEND_URL = "https://dhanashree1910-edulock-secure.hf.space";

interface SecureMaterialViewerProps {
    isOpen: boolean;
    onClose: () => void;
    materialId: string; // Added ID for fetching token
    materialType: "PDF" | "Video" | "Image" | "Document" | string;
    materialTitle: string;
    userEmail?: string;
    userName?: string;
}

export function SecureMaterialViewer({
    isOpen,
    onClose,
    materialId,
    materialType,
    materialTitle,
    userEmail = "user@edulock.com",
    userName = "Student",
}: SecureMaterialViewerProps) {
    const [token, setToken] = useState<string | null>(null);
    const [pages, setPages] = useState<string[]>([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isBlurred, setIsBlurred] = useState(false);
    const [scale, setScale] = useState(1.0);
    const contentRef = useRef<HTMLDivElement>(null);

    // --- Fetch Token & Content Info ---
    useEffect(() => {
        if (!isOpen || !materialId) return;

        const fetchSecureContent = async () => {
            setIsLoading(true);
            setError(null);
            try {
                // 1. Get Access Token from Node.js Backend
                // The backend endpoint viewMaterial will handle the decryption request to Python
                // and return us the response which should contain the token/info.
                const data = await viewMaterial(materialId);

                // 2. Handle Token Extraction from Python Response
                // Normalized response might be { token: ... } OR { types: "document", pages: "/..." }
                let derivedToken = data.token;

                if (!derivedToken) {
                    if (data.pages) {
                        // Extract from /document/{token}/pages
                        const match = data.pages.match(/\/document\/(.+)\/pages/);
                        if (match) derivedToken = match[1];
                    } else if (data.playlist) {
                        // Extract from /video/{token}/playlist
                        const match = data.playlist.match(/\/video\/(.+)\/playlist/);
                        if (match) derivedToken = match[1];
                    }
                }

                if (derivedToken) {
                    setToken(derivedToken);

                    // 3. Fetch Pages if PDF/Document
                    if (materialType.toLowerCase().includes("pdf") || data.type === "document") {
                        const pagesEndpoint = data.pages
                            ? `${PYTHON_BACKEND_URL}${data.pages}`
                            : `${PYTHON_BACKEND_URL}/document/${derivedToken}/pages`;

                        const pagesRes = await fetch(pagesEndpoint);
                        const pagesData = await pagesRes.json();
                        if (pagesData.pages && Array.isArray(pagesData.pages)) {
                            setPages(pagesData.pages);
                        } else {
                            throw new Error("Invalid pages format received");
                        }
                    }
                } else {
                    console.error("Invalid Secure Response:", data);
                    throw new Error("Failed to retrieve access token");
                }

            } catch (err: any) {
                console.error("Secure Viewer Error:", err);
                setError(err.message || "Failed to load secure content");
            } finally {
                setIsLoading(false);
            }
        };

        fetchSecureContent();
    }, [isOpen, materialId, materialType]);


    // --- Security Features (Blur, Right-Click, Shortcuts) ---
    useEffect(() => {
        if (!isOpen) return;

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

        const handleContextMenu = (e: MouseEvent) => e.preventDefault();
        document.addEventListener("contextmenu", handleContextMenu);

        const handleKeyDown = (e: KeyboardEvent) => {
            if (
                e.key === "PrintScreen" ||
                (e.ctrlKey && (e.key === "p" || e.key === "s" || e.key === "c")) ||
                (e.metaKey && (e.key === "p" || e.key === "s" || e.key === "c"))
            ) {
                e.preventDefault();
                setIsBlurred(true);
                setTimeout(() => setIsBlurred(false), 2000);
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
    }, [isOpen, materialTitle]);


    // --- Watermark Component ---
    const Watermark = () => (
        <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center overflow-hidden opacity-10 select-none">
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

    // --- Render Content ---
    const renderContent = () => {
        if (isLoading) {
            return (
                <div className="flex flex-col items-center justify-center gap-4 text-white">
                    <Loader2 className="h-12 w-12 animate-spin text-primary" />
                    <p>Securing content connection...</p>
                </div>
            );
        }

        if (error) {
            return (
                <div className="flex flex-col items-center justify-center gap-4 text-destructive">
                    <AlertTriangle className="h-12 w-12" />
                    <p>{error}</p>
                    <Button onClick={onClose} variant="outline">Close Viewer</Button>
                </div>
            );
        }

        if (!token) return null;

        const type = materialType.toLowerCase();

        // --- PDF View (Image Based) ---
        if (type.includes("pdf") || type.includes("document")) {
            const currentPagePath = pages[pageNumber - 1];
            // If path starts with /, append base. If not, assume full? User said "/document/..."
            const imageUrl = currentPagePath
                ? `${PYTHON_BACKEND_URL}${currentPagePath}`
                : "";

            return (
                <div className="flex flex-col items-center gap-8 py-24 px-4 w-full min-h-full">
                    {/* Render ALL Pages */}
                    {pages.map((pagePath, index) => {
                        const imageUrl = pagePath ? `${PYTHON_BACKEND_URL}${pagePath}` : "";
                        return (
                            <div key={index} className="relative shadow-2xl bg-white w-full max-w-4xl" style={{ transform: `scale(${scale})`, transition: 'transform 0.2s', transformOrigin: 'top center' }}>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={imageUrl}
                                    alt={`Page ${index + 1}`}
                                    className="w-full h-auto"
                                    onContextMenu={(e) => e.preventDefault()}
                                    draggable={false}
                                    loading="lazy"
                                />
                                <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                                    {index + 1}
                                </div>
                            </div>
                        );
                    })}

                    {/* Simple Zoom Controls (Floating) */}
                    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-center gap-2 rounded-full bg-black/80 p-2 text-white backdrop-blur-md shadow-xl border border-white/10">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setScale((s) => Math.min(s + 0.1, 2.0))}
                            className="text-white hover:bg-white/20 hover:text-white rounded-full h-10 w-10"
                        >
                            <span className="text-xl leading-none">+</span>
                        </Button>
                        <span className="text-xs font-mono">{Math.round(scale * 100)}%</span>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setScale((s) => Math.max(s - 0.1, 0.5))}
                            className="text-white hover:bg-white/20 hover:text-white rounded-full h-10 w-10"
                        >
                            <span className="text-xl leading-none">-</span>
                        </Button>
                    </div>
                </div>
            );
        }

        // --- Video View (HLS) ---
        if (type.includes("video") || type.includes("mp4") || type.includes("mkv") || type.includes("mov")) {
            const videoUrl = `${PYTHON_BACKEND_URL}/video/${token}/playlist.m3u8`;
            return (
                <div className="relative flex w-full h-full items-center justify-center bg-black">
                    {/* 
                       Using standard video tag. Modern browsers (Safari) support HLS natively.
                       For Chrome/Firefox, we would typically need hls.js. 
                       For this implementation, we rely on native support or browser plugins, 
                       or assume the user environment has HLS capability.
                     */}
                    <video
                        controlsList="nodownload"
                        width="100%"
                        height="auto"
                        controls
                        autoPlay
                        className="max-h-[85vh] w-full max-w-6xl shadow-2xl rounded-lg bg-zinc-900"
                        onContextMenu={(e) => e.preventDefault()}
                    >
                        <source src={videoUrl} type="application/vnd.apple.mpegurl" />
                        <source src={videoUrl} type="video/mp4" />
                        {/* Fallback for regular MP4 if provided? No, strictly streaming */}
                        <div className="p-8 text-white text-center">
                            <p className="text-lg font-semibold text-red-400">Video format not supported natively.</p>
                            <p className="text-sm text-white/60">Please use Safari or a browser with HLS support.</p>
                        </div>
                    </video>
                </div>
            );
        }

        return (
            <div className="flex flex-col items-center justify-center gap-4 py-20 text-center text-white">
                <Lock className="h-12 w-12 text-muted-foreground" />
                <h3 className="text-xl font-semibold">Secure Content</h3>
                <p className="text-white/60">
                    This content type is ready for secure viewing.
                </p>
            </div>
        );
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="max-w-[100vw] h-screen w-screen border-none bg-zinc-950 p-0 sm:rounded-none overflow-hidden">

                {/* Header */}
                <div className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between bg-black/60 px-6 py-4 backdrop-blur-md border-b border-white/10">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/20 rounded-lg">
                            <Lock className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                            <DialogTitle className="text-lg font-semibold text-white tracking-tight">{materialTitle}</DialogTitle>
                            <p className="text-xs text-white/50 font-medium">Encrypted & Secure • {materialType}</p>
                        </div>
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onClose}
                        className="text-white hover:bg-white/10 hover:text-white rounded-full h-10 w-10 transition-colors"
                    >
                        <X className="h-5 w-5" />
                    </Button>
                </div>

                {/* Main Content Area */}
                <div
                    ref={contentRef}
                    className={cn(
                        "flex h-full w-full items-center justify-center overflow-auto pt-20 pb-20 select-none bg-zinc-950/50",
                        isBlurred ? "blur-2xl grayscale opacity-50 transition-all duration-500" : "transition-all duration-300"
                    )}
                    onContextMenu={(e) => e.preventDefault()}
                >
                    {renderContent()}
                </div>

                {/* Security Overlays */}
                <Watermark />

                {/* Blur warning overlay */}
                {isBlurred && (
                    <div className="absolute inset-0 z-60 flex flex-col items-center justify-center bg-black/90 text-white backdrop-blur-md animate-in fade-in duration-300">
                        <div className="p-6 bg-red-500/10 rounded-full mb-6 ring-1 ring-red-500/50">
                            <AlertTriangle className="h-16 w-16 text-red-500 animate-pulse" />
                        </div>
                        <h2 className="text-3xl font-bold tracking-tight">Security Alert</h2>
                        <p className="mt-4 text-lg text-white/70 max-w-md text-center leading-relaxed">
                            Access is restricted when the window is not in focus. Application activity is being monitored.
                        </p>
                        <div className="mt-8 flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full text-xs font-mono text-white/40 border border-white/5">
                            <span>SESSION ID:</span>
                            <span className="text-white/60">{token ? token.substring(0, 16) + "..." : "INITIALIZING"}</span>
                        </div>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}
