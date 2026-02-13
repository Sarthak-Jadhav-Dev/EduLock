import { Announcement, AnnouncementCard } from "@/components/class/AnnouncementCard";

interface AnnouncementsTabProps {
    announcements: Announcement[];
}

export const AnnouncementsTab = ({ announcements }: AnnouncementsTabProps) => {
    return (
        <div className="max-w-3xl space-y-6">
            {announcements.map((announcement) => (
                <AnnouncementCard key={announcement.id} announcement={announcement} />
            ))}
        </div>
    );
};
