"use client";

import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { ClassCard } from "@/components/dashboard/ClassCard";
import { EmptyState } from "@/components/dashboard/EmptyState";
import { CreateClassDialog } from "@/components/dashboard/CreateClassDialog";
import { JoinClassDialog } from "@/components/dashboard/JoinClassDialog";
import AlertCardDemo from "@/components/ui/card-8-demo";
import { Button } from "@/components/ui/button";
import { Plus, Loader2 } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { getMyClasses } from "@/services/class.service";
import { getMe } from "@/services/user.service";

export default function DashboardPage() {
    const [user, setUser] = useState<any>(null);
    const [classes, setClasses] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [createDialogOpen, setCreateDialogOpen] = useState(false);
    const [joinDialogOpen, setJoinDialogOpen] = useState(false);

    const fetchData = useCallback(async () => {
        try {
            const [userData, classesData] = await Promise.all([
                getMe(),
                getMyClasses(),
            ]);
            setUser(userData);
            setClasses(classesData || []);
        } catch (error) {
            console.error("Failed to fetch dashboard data:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const refreshClasses = async () => {
        try {
            const data = await getMyClasses();
            setClasses(data || []);
        } catch (error) {
            console.error("Failed to refresh classes:", error);
        }
    };

    const isTeacher = user?.role === "teacher";

    // Helper to assign a color based on class ID or index
    const getClassColor = (index: number) => {
        const colors = ["bg-blue-500", "bg-emerald-500", "bg-purple-500", "bg-amber-500", "bg-rose-500"];
        return colors[index % colors.length];
    };

    if (loading) {
        return (
            <DashboardLayout>
                <div className="flex h-full items-center justify-center pt-20">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <div className="space-y-8">
                {/* Header Section */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                        <p className="text-muted-foreground">Welcome back, {user?.fullName}</p>
                    </div>

                    <Button
                        onClick={() => isTeacher ? setCreateDialogOpen(true) : setJoinDialogOpen(true)}
                        size="lg"
                        className="rounded-xl shadow-sm"
                    >
                        <Plus className="mr-2 h-5 w-5" />
                        {isTeacher ? "Create Class" : "Join Class"}
                    </Button>
                </div>

                {/* Alert Section */}
                <section>
                    <AlertCardDemo />
                </section>

                {/* My Classes Section */}
                <section className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-semibold tracking-tight">My Classes</h2>
                    </div>

                    {classes.length > 0 ? (
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {classes.map((cls, index) => (
                                <ClassCard
                                    key={cls.id}
                                    id={cls.id}
                                    name={cls.name}
                                    subject={cls.subject}
                                    teacher={cls.teacher?.fullName || cls.teacher || "Unknown Teacher"}
                                    studentCount={cls._count?.students || cls.studentCount || 0}
                                    color={cls.color || getClassColor(index)}
                                />
                            ))}
                        </div>
                    ) : (
                        <EmptyState
                            title="No classes found"
                            description={isTeacher
                                ? "Create your first class to get started teaching."
                                : "Join a class to see your assignments and materials."}
                            actionLabel={isTeacher ? "Create Class" : "Join Class"}
                            onAction={() => isTeacher ? setCreateDialogOpen(true) : setJoinDialogOpen(true)}
                        />
                    )}
                </section>
            </div>

            <CreateClassDialog
                open={createDialogOpen}
                onOpenChange={setCreateDialogOpen}
                onSuccess={refreshClasses}
            />
            <JoinClassDialog
                open={joinDialogOpen}
                onOpenChange={setJoinDialogOpen}
                onSuccess={refreshClasses}
            />
        </DashboardLayout>
    );
}
