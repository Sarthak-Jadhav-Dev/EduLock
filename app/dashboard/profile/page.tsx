"use client";

import { ProfileCard } from "@/components/ui/profile-card";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import EditProfileDialog from "@/components/ui/edit-profile-dialog";
import { useEffect, useState } from "react";
import { getMe } from "@/services/user.service";
import { Loader2 } from "lucide-react";

export default function ProfilePage() {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const fetchUser = async () => {
        try {
            const userData = await getMe();
            setUser(userData);
        } catch (error) {
            console.error("Failed to fetch user:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    if (loading) {
        return (
            <DashboardLayout>
                <div className="flex min-h-[80vh] w-full items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <div className="flex min-h-[80vh] w-full flex-col items-center justify-center space-y-8 p-6">
                <div className="flex w-full max-w-sm items-center justify-between">
                    <div className="text-left">
                        <h1 className="text-3xl font-bold tracking-tight">Your Profile</h1>
                        <p className="text-muted-foreground">Manage your account stats.</p>
                    </div>
                    <EditProfileDialog user={user} onSuccess={fetchUser} />
                </div>
                <ProfileCard user={user} />
            </div>
        </DashboardLayout>
    );
}
