import { ReactNode } from "react";

interface DashboardLayoutProps {
    children: ReactNode;
}


export default function DashboardLayout({ children }: DashboardLayoutProps) {
    return (
        <div>
            <main className="flex-1 p-6 bg-gray-100">
                {children}
            </main>
        </div>
    );

}