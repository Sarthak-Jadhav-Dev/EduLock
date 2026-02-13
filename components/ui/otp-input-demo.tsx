import { OTPVerification } from "@/components/ui/otp-input";

// Hint: the code is 1234

export default function OtpInputDemo() {
    return (
        <main className="w-full bg-gray-100 dark:bg-muted/20 flex items-center justify-center min-h-screen font-sans p-4">
            <OTPVerification />
        </main>
    )
}
