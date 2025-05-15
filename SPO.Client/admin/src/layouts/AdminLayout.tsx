import { AppSidebar } from '@/components/app-sidebar';
import { ModeToggle } from '@/components/mode-toggle';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { SidebarData } from '@/faker/SidebarData';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const location = useLocation();
    const path = location.pathname;
    const getBreadcrumb = () => {
        const breadcrumbItems: { title: string; url?: string }[] = [
            { title: "Dashboard", url: "/admin" },
        ];

        for (const main of SidebarData.navMain) {
            if (main.url === path) {
                breadcrumbItems.push({ title: main.title });
                break;
            }

            const child = main.items.find((item) => item.url === path);
            if (child) {
                breadcrumbItems.push({ title: main.title, url: main.url });
                breadcrumbItems.push({ title: child.title });
                break;
            }
        }

        return breadcrumbItems;
    };

    const breadcrumb = getBreadcrumb();
    return (
        <>
            <SidebarProvider>
                <AppSidebar />
                <SidebarInset>
                    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 border-b">
                        <div className="flex justify-between w-full px-4">
                            <div className="flex items-center gap-2">
                                <SidebarTrigger className="-ml-1" />
                                <Separator orientation="vertical" className="mr-2 h-4" />
                                <Breadcrumb>
                                    <BreadcrumbList>
                                        {breadcrumb.map((item, index) => (
                                            <React.Fragment key={index}>
                                                <BreadcrumbItem>
                                                    {item.url ? (
                                                        <BreadcrumbLink asChild>
                                                            <Link to={item.url}>{item.title}</Link>
                                                        </BreadcrumbLink>
                                                    ) : (
                                                        <BreadcrumbPage>{item.title}</BreadcrumbPage>
                                                    )}
                                                </BreadcrumbItem>
                                                {index < breadcrumb.length - 1 && (
                                                    <BreadcrumbSeparator />
                                                )}
                                            </React.Fragment>
                                        ))}
                                    </BreadcrumbList>
                                </Breadcrumb>
                            </div>
                            <ModeToggle />
                        </div>
                    </header>
                    <div className='p-4'>{children}</div>
                </SidebarInset>
            </SidebarProvider>
        </>
    );
};

export default AdminLayout;