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
                title="Don't miss your flight"
                description="Hi Jonathan, You have a flight today at 02:15 PM. Better to go early to avoid road traffic."
                buttonText="Okay, I Understand"
                onButtonClick={handleUnderstood}
                onDismiss={handleDismiss} // Provide dismiss handler to show the X button
                icon={<Bell className="h-6 w-6 text-destructive-foreground" />}
            />
        </div>
    );
}
