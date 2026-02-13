"use client";

import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { ClassLayout } from "@/components/class/ClassLayout";
import { ClassHeader } from "@/components/class/ClassHeader";
import { ClassTabs } from "@/components/class/ClassTabs";
import { CreateMaterialDialog } from "@/components/class/CreateMaterialDialog";
import { CreateAnnouncementDialog } from "@/components/class/CreateAnnouncementDialog";
import { CreateAssignmentDialog } from "@/components/class/CreateAssignmentDialog";
import { CreatePollDialog } from "@/components/class/CreatePollDialog";
import { ChevronRight, Loader2 } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getClassStudents, getMyClasses } from "@/services/class.service";
import { getMaterials } from "@/services/material.service";
import { getAnnouncements } from "@/services/announcement.service";
import { getAssignments } from "@/services/assignment.service";
import { getPolls } from "@/services/poll.service";
import { getMe } from "@/services/user.service";

export default function ClassDetailsPage() {
    const params = useParams();
    const classId = params.id as string;

    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<any>(null);
    const [classData, setClassData] = useState<any>(null); // We might need an API to get single class details
    const [materials, setMaterials] = useState([]);
    const [announcements, setAnnouncements] = useState([]);
    const [assignments, setAssignments] = useState([]);
    const [polls, setPolls] = useState([]);
    const [students, setStudents] = useState([]);

    const [activeTab, setActiveTab] = useState("materials");

    // Dialog states
    const [materialDialogOpen, setMaterialDialogOpen] = useState(false);
    const [announcementDialogOpen, setAnnouncementDialogOpen] = useState(false);
    const [assignmentDialogOpen, setAssignmentDialogOpen] = useState(false);
    const [pollDialogOpen, setPollDialogOpen] = useState(false);

    const fetchData = useCallback(async () => {
        if (!classId) return;
        try {
            const [userData, studentsData, materialsData, announcementsData, assignmentsData, pollsData, myClasses] = await Promise.all([
                getMe(),
                getClassStudents(classId),
                getMaterials(classId),
                getAnnouncements(classId),
                getAssignments(classId),
                getPolls(classId),
                getMyClasses()
            ]);

            setUser(userData);

            // Find class details
            const currentClass = myClasses?.find((c: any) => c.id === Number(classId) || c.id === classId);
            if (currentClass) {
                setClassData({
                    name: currentClass.name,
                    subject: currentClass.subject,
                    teacher: currentClass.teacher?.fullName || currentClass.teacher || "Unknown Teacher",
                    description: currentClass.description
                });
            } else {
                console.warn("Class not found in myClasses");
                // Fallback or could be a 404
                setClassData({ name: "Unknown Class", subject: "Unknown", teacher: "Unknown" });
            }

            // Map Students
            const mappedStudents = (studentsData || []).map((s: any) => ({
                id: s.id,
                name: s.fullName || "Unknown",
                email: s.email,
                joinedDate: new Date(s.joinedAt || Date.now()).toLocaleDateString(),
                status: "Active", // Default to Active
                avatar: s.avatarUrl
            }));
            setStudents(mappedStudents);

            // Map Materials
            const mappedMaterials = (materialsData || []).map((m: any) => ({
                id: m.id,
                title: m.title,
                description: m.description,
                type: m.type || "Document",
                date: new Date(m.createdAt).toLocaleDateString(),
                url: m.fileUrl
            }));
            setMaterials(mappedMaterials);

            // Map Announcements
            const mappedAnnouncements = (announcementsData || []).map((a: any) => ({
                id: a.id,
                title: "Announcement", // API might not separate title
                content: a.message,
                author: a.author?.fullName || "Teacher",
                authorAvatar: a.author?.avatarUrl,
                date: new Date(a.createdAt)
            }));
            setAnnouncements(mappedAnnouncements);

            // Map Assignments
            const mappedAssignments = (assignmentsData || []).map((a: any) => ({
                id: a.id,
                title: a.title,
                description: a.description,
                dueDate: new Date(a.deadline).toLocaleDateString(),
                points: a.points || 100,
                status: new Date(a.deadline) < new Date() ? "Closed" : "Open" // Simple logic
            }));
            setAssignments(mappedAssignments);

            // Map Polls
            const mappedPolls = (pollsData || []).map((p: any) => {
                const totalVotes = p.options.reduce((sum: number, opt: any) => sum + (opt.votes || 0), 0);
                return {
                    id: p.id,
                    question: p.question,
                    options: p.options.map((o: any) => ({
                        id: o.id || o._id, // Handle potential MongoDB _id
                        text: o.text,
                        votes: o.votes || 0
                    })),
                    totalVotes,
                    userVoted: p.userVoted // API needs to return this
                };
            });
            setPolls(mappedPolls);

        } catch (error) {
            console.error("Failed to fetch class details:", error);
        } finally {
            setLoading(false);
        }
    }, [classId]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const isTeacher = user?.role === "teacher";

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
            <ClassLayout>
                {/* Breadcrumbs */}
                <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
                    <Link href="/dashboard" className="hover:text-foreground">Dashboard</Link>
                    <ChevronRight className="h-4 w-4" />
                    <span className="text-foreground font-medium">{classData?.name || "Class Details"}</span>
                </div>

                <ClassHeader
                    name={classData?.name || "Loading..."}
                    subject={classData?.subject || "Loading..."}
                    teacher={classData?.teacher || "Teacher"} // API needs to return this
                    studentCount={students.length}
                    coverImage="https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200&auto=format&fit=crop&q=80"
                />

                <div className="mt-8">
                    <ClassTabs
                        role={isTeacher ? "teacher" : "student"}
                        activeTab={activeTab}
                        onTabChange={setActiveTab}
                        materials={materials}
                        announcements={announcements}
                        assignments={assignments}
                        polls={polls}
                        students={students}
                        onAddMaterial={() => setMaterialDialogOpen(true)}
                        onAddAnnouncement={() => setAnnouncementDialogOpen(true)}
                        onAddAssignment={() => setAssignmentDialogOpen(true)}
                        onAddPoll={() => setPollDialogOpen(true)}
                        onUpdate={fetchData}
                    />
                </div>

                {/* Dialogs */}
                <CreateMaterialDialog
                    open={materialDialogOpen}
                    onOpenChange={setMaterialDialogOpen}
                    classId={classId}
                    onSuccess={fetchData}
                />
                <CreateAnnouncementDialog
                    open={announcementDialogOpen}
                    onOpenChange={setAnnouncementDialogOpen}
                    classId={classId}
                    onSuccess={fetchData}
                />
                <CreateAssignmentDialog
                    open={assignmentDialogOpen}
                    onOpenChange={setAssignmentDialogOpen}
                    classId={classId}
                    onSuccess={fetchData}
                />
                <CreatePollDialog
                    open={pollDialogOpen}
                    onOpenChange={setPollDialogOpen}
                    classId={classId}
                    onSuccess={fetchData}
                />
            </ClassLayout>
        </DashboardLayout>
    );
}
