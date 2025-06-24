import { Button } from "@/components/ui/button";
import AppLayout from "@/layouts/app-layout";
import { NavItem, BreadcrumbItem } from "@/types";
import { Head } from "@inertiajs/react";
import clsx from "clsx";
import { table } from "console";
import { ArrowDown01, FolderKanban, LayoutDashboard, List, Search, Table2, UserPen, Bolt, Contact, ChevronDown, University, Plus } from "lucide-react";

const navItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: 'dashboard',
    },
    {
        title: 'User Management',
        href: 'user-management',
        icon: UserPen,
        isActive: true,
    },
];

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'User Management',
        url: '/user-management',
    },
]

const tableLayout : {title: string, icon: any, isActive?: boolean}[] = [
    {
        title: 'Table',
        icon: Table2,
        isActive: true
    },
    {
        title: 'Board',
        icon: FolderKanban,
    },
    {
        title: 'List',
        icon: List,
    },
]


export default function UserManagement() {
    return (
        <AppLayout navItems={navItems} breadcrumbs={breadcrumbs}>
            <Head title="User Management" />
            <div className="flex flex-col gap-4 p-6 text-xs">
                <div className="flex justify-between border-b border-gray-100 pb-3">
                    <div className="flex gap-2">
                        {
                            tableLayout.map((item, index) => (
                                <div key={index} className={clsx(
                                    "flex gap-1 items-center px-2 py-1 rounded-md cursor-pointer",
                                    item.isActive ? "bg-gray-100" : "hover:bg-gray-100"
                                )}>
                                    <item.icon className="w-4 h-4" />
                                    <p>{item.title}</p>
                                </div>
                            ))
                        }
                        
                    </div>
                    <div className="flex gap-2 items-center">
                        <div className="flex gap-1 px-2 py-1">
                            <Search className="w-4 h-4" />
                            <p>Search</p>
                        </div>
                        <div className="flex gap-1 px-2 py-1">
                            <ArrowDown01 className="w-4 h-4" />
                            <p>Sort</p>
                        </div>
                        <div className="flex gap-1 px-2 py-1">
                            <Bolt className="w-4 h-4" />
                            <p>Customize</p>
                        </div>
                        <button className="px-2 py-1 rounded-sm border border-gray-200">Export</button>
                        <button className="px-2 py-1 rounded-sm border border-gray-200">Add User</button>
                    </div>
                </div>
                <div className="flex flex-wrap gap-2">
                    <div className="flex gap-1 items-center rounded-full px-2 py-1 border border-gray-200">
                        <Contact className="w-4 h-4" />
                        <p>Department</p>
                        <ChevronDown className="w-4 h-4"/>
                    </div>
                    <div className="flex gap-1 items-center rounded-full px-2 py-1 border border-gray-200">
                        <University className="w-4 h-4" />
                        <p>College</p>
                        <ChevronDown className="w-4 h-4"/>
                    </div>
                    <div className="flex gap-1 items-center rounded-full px-2 py-1 hover:bg-gray-50 cursor-pointer">
                        <Plus className="w-4 h-4" />
                        <p>Add Filter</p>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}
    