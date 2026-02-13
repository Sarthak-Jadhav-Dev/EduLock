import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";

export interface Announcement {
    id: string;
    title: string;
    content: string;
    author: string;
    authorAvatar?: string;
    date: Date;
}

export const AnnouncementCard = ({ announcement }: { announcement: Announcement }) => {
    return (
        <Card className="overflow-hidden rounded-2xl border-none shadow-sm transition-all hover:shadow-md">
            <CardHeader className="flex flex-row items-start gap-4 space-y-0 pb-2">
                <Avatar className="h-10 w-10 border">
                    <AvatarImage src={announcement.authorAvatar} />
                    <AvatarFallback>{announcement.author[0]}</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                    <div className="flex items-center gap-2">
                        <h3 className="font-semibold leading-none">{announcement.author}</h3>
                        <span className="text-xs text-muted-foreground">•</span>
                        <span className="text-xs text-muted-foreground">
                            {formatDistanceToNow(announcement.date, { addSuffix: true })}
                        </span>
                    </div>
                    <p className="text-sm font-medium leading-none text-muted-foreground">
                        posted an announcement
                    </p>
                </div>
            </CardHeader>
            <CardContent>
                <div className="ml-14 space-y-2">
                    <h4 className="font-semibold text-lg">{announcement.title}</h4>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                        {announcement.content}
                    </p>
                </div>
            </CardContent>
        </Card>
    );
};
