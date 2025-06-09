"use client";
import { useRouter } from "next/navigation";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "./ui/sidebar";
import { AppSidebar } from "./app-sidebar";
import { Separator } from "./ui/separator";
import Navbar from "./nav-bar-component";

export const BasicSidebarLayout = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const handleConnectCloud = () => {
        router.push("/connect");
    };
    const handleDashboard = () => {
        router.push("/dashboard");
    };
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                    <div className="flex items-center gap-2 px-4 w-full">
                        <SidebarTrigger className="-ml-1" />
                        <Separator orientation="vertical" className="mr-2 h-4" />
                        <Navbar handleConnectCloud={handleConnectCloud} handleDashboard={handleDashboard} />
                    </div>
                </header>
                {children}
            </SidebarInset>
        </SidebarProvider>
    )
}
