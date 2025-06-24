import AppLayout from "@/layouts/app-layout";
import { NavItem, BreadcrumbItem } from "@/types";
import { Head } from "@inertiajs/react";
import { LayoutDashboard, SquareLibrary, UserPen } from "lucide-react";

const navItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: 'dashboard',
        icon: LayoutDashboard,
        isActive: true,
    },
    {
        title: 'User Management',
        href: 'user-management',
        icon: UserPen,
    },
];

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        url: '/dashboard',
    },
]

export default function Dashboard() {
    return (
        <AppLayout navItems={navItems} breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
        </AppLayout>
    )
}