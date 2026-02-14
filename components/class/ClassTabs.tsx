"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MaterialsTab } from "@/components/class/MaterialsTab";
import { AnnouncementsTab } from "@/components/class/AnnouncementsTab";
import { AssignmentsTab } from "@/components/class/AssignmentsTab";
import { PollsTab } from "@/components/class/PollsTab";
import { StudentsTab } from "@/components/class/StudentsTab";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

// Types
import { Material } from "@/components/class/MaterialCard";
import { Announcement } from "@/components/class/AnnouncementCard";
import { Assignment } from "@/components/class/AssignmentCard";
import { Poll } from "@/components/class/PollCard";
import { Student } from "@/components/class/StudentsTab";

interface ClassTabsProps {
    role: "teacher" | "student";
    activeTab: string;
    onTabChange: (value: string) => void;
    materials: Material[];
    announcements: Announcement[];
    assignments: Assignment[];
    polls: Poll[];
    students: Student[];
    onAddMaterial: () => void;
    onAddAnnouncement: () => void;
    onAddAssignment: () => void;
    onAddPoll: () => void;
    onUpdate?: () => void;
    userEmail?: string;
    userName?: string;
}

export const ClassTabs = ({
    role,
    activeTab,
    onTabChange,
    materials,
    announcements,
    assignments,
    polls,
    students,
    onAddMaterial,
    onAddAnnouncement,
    onAddAssignment,
    onAddPoll,
    onUpdate,
    userEmail,
    userName,
}: ClassTabsProps) => {
    return (
        <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <TabsList className="h-auto w-full justify-start gap-2 overflow-x-auto bg-transparent p-0 sm:w-auto">
                    {["materials", "announcements", "assignments", "polls"].map((tab) => (
                        <TabsTrigger
                            key={tab}
                            value={tab}
                            className="rounded-full border bg-white px-4 py-2 capitalize ring-offset-background hover:bg-slate-50 data-[state=active]:bg-slate-900 data-[state=active]:text-white dark:bg-slate-950 dark:data-[state=active]:bg-white dark:data-[state=active]:text-slate-950"
                        >
                            {tab}
                        </TabsTrigger>
                    ))}
                    {role === "teacher" && (
                        <TabsTrigger
                            value="students"
                            className="rounded-full border bg-white px-4 py-2 capitalize ring-offset-background hover:bg-slate-50 data-[state=active]:bg-slate-900 data-[state=active]:text-white dark:bg-slate-950 dark:data-[state=active]:bg-white dark:data-[state=active]:text-slate-950"
                        >
                            Students
                        </TabsTrigger>
                    )}
                </TabsList>

                {/* Contextual Action Buttons */}
                {role === "teacher" && (
                    <div className="hidden sm:block">
                        {activeTab === "materials" && (
                            <Button onClick={onAddMaterial} className="rounded-xl shadow-sm">
                                <Plus className="mr-2 h-4 w-4" /> Add Material
                            </Button>
                        )}
                        {activeTab === "announcements" && (
                            <Button onClick={onAddAnnouncement} className="rounded-xl shadow-sm">
                                <Plus className="mr-2 h-4 w-4" /> New Announcement
                            </Button>
                        )}
                        {activeTab === "assignments" && (
                            <Button onClick={onAddAssignment} className="rounded-xl shadow-sm">
                                <Plus className="mr-2 h-4 w-4" /> Create Assignment
                            </Button>
                        )}
                        {activeTab === "polls" && (
                            <Button onClick={onAddPoll} className="rounded-xl shadow-sm">
                                <Plus className="mr-2 h-4 w-4" /> Create Poll
                            </Button>
                        )}
                    </div>
                )}
            </div>

            <div className="mt-8">
                <TabsContent value="materials">
                    <MaterialsTab materials={materials} userEmail={userEmail} userName={userName} />
                </TabsContent>

                <TabsContent value="announcements">
                    <AnnouncementsTab announcements={announcements} />
                </TabsContent>

                <TabsContent value="assignments">
                    <AssignmentsTab assignments={assignments} role={role} onUpdate={onUpdate} />
                </TabsContent>

                <TabsContent value="polls">
                    <PollsTab polls={polls} role={role} onUpdate={onUpdate} />
                </TabsContent>

                <TabsContent value="students">
                    <StudentsTab students={students} />
                </TabsContent>
            </div>
        </Tabs>
    );
};
