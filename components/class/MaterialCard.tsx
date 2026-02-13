import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Download, Clock } from "lucide-react";

export interface Material {
    id: string;
    title: string;
    description: string;
    type: string;
    date: string;
    url?: string;
}

export const MaterialCard = ({ material }: { material: Material }) => {
    return (
        <Card className="group overflow-hidden rounded-2xl border-none shadow-sm transition-all hover:shadow-md">
            <CardHeader className="bg-slate-50/50 pb-4 dark:bg-slate-900/50">
                <div className="flex items-start justify-between">
                    <div className="rounded-xl bg-blue-100 p-2.5 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                        <FileText className="h-6 w-6" />
                    </div>
                    <Badge variant="outline" className="uppercase tracking-wider">
                        {material.type}
                    </Badge>
                </div>
            </CardHeader>
            <CardContent className="pt-6">
                <CardTitle className="line-clamp-1 mb-2 text-lg">{material.title}</CardTitle>
                <p className="line-clamp-2 text-sm text-muted-foreground">
                    {material.description}
                </p>
            </CardContent>
            <CardFooter className="flex items-center justify-between border-t bg-slate-50/30 p-4 dark:bg-slate-900/30">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{material.date}</span>
                </div>
                <Button size="sm" variant="ghost" className="h-8 gap-2 rounded-lg text-xs font-medium hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-900/20">
                    <Download className="h-3.5 w-3.5" />
                    Download
                </Button>
            </CardFooter>
        </Card>
    );
};
