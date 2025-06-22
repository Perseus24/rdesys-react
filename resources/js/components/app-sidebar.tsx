"use client"

import * as React from "react"
import {
    CircleDot,
    FolderKanban,
    LayoutDashboard,
    Projector,
    Settings,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar"
import { useEffect, useState } from "react"
import { UserData } from "@/types"


let data = {
    user: {
        name: "shadcn",
        email: "m@example.com",
        avatar: "/avatars/shadcn.jpg",
    },
    navItems : [
        {
            title: "Dashboard",
            url: "/dashboard",
            icon: LayoutDashboard,
            isActive: true,
        },
        {
            title: "Projects",
            url: "#",
            icon: FolderKanban,
            items: [
                {
                    title: "Create new",
                    url: "/projects/create-new-project"
                },
                {
                    title: "List",
                    url: "/projects"
                },
                
            ]
        },
        {
            title: "Issues",
            url: "/issues",
            icon: CircleDot
        },
        {
            title: "Settings",
            url: "/settings",
            icon: Settings
        }
    ]
}

interface Props extends React.ComponentProps<typeof Sidebar> {
    data: any[];
}

export function AppSidebar({ data, ...props }: Props) {
    return (
        <Sidebar collapsible="icon" {...props} className="bg-blue-900" >
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem >
                        <SidebarMenuButton size='lg' className="hover:bg-white/10" asChild>
                            <div>
                                <div className="text-black aspect-square size-8 flex justify-center items-center bg-cyan-500 rounded-lg" >
                                    <img src="/images/bu_logo.svg" width={16} height={16} alt="BU Logo"  className='size-4' />
                                </div>
                                <div className="flex flex-col gap-0.5 leading-none text-black">
                                    <span className="font-semibold text-[13px]">Bicol University Research and Development Management Division</span>
                                    <span className="text-xs">beta</span>
                                </div>
                            </div>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent className=" overflow-x-hidden">
                <NavMain items={data} />
            </SidebarContent>
            <SidebarFooter >
                <NavUser  />
            </SidebarFooter>
        </Sidebar>
    )
}
