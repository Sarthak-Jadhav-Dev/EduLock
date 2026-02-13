import * as React from "react";
import { Bell } from "lucide-react";
import { AlertCard } from "@/components/ui/card-8";
import { Button } from "@/components/ui/button";

export default function AlertCardDemo() {
    const [isCardVisible, setIsCardVisible] = React.useState(true);

    const handleUnderstood = () => {
        console.log("User understood the alert.");
        setIsCardVisible(false);
    };

    const handleDismiss = () => {
        console.log("User dismissed the alert.");
        setIsCardVisible(false);
    };

    // A button to reset the demo and show the card again
    const handleReset = () => {
        setIsCardVisible(true);
    };

    return (
        <div className="flex bg-slate-100 dark:bg-slate-950 p-8 rounded-xl w-full flex-col items-center justify-center gap-4">
            {!isCardVisible && (
                <Button onClick={handleReset}>Show Alert Card</Button>
            )}

            <AlertCard
                isVisible={isCardVisible}
                title="Welcome to EduLock"
                description="Your content is protected with end-to-end encryption. Upload materials, manage classes, and distribute securely."
                buttonText="Got it!"
                onButtonClick={handleUnderstood}
                onDismiss={handleDismiss}
                icon={<Bell className="h-6 w-6 text-destructive-foreground" />}
            />
        </div>
    );
}
