import { ReactNode } from "react";

interface ClassLayoutProps {
    children: ReactNode;
}

export const ClassLayout = ({ children }: ClassLayoutProps) => {
    return (
        <div className="mx-auto max-w-6xl space-y-8 pb-12">
            {children}
        </div>
    );
};
