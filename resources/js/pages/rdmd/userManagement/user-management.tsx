import { Button } from "@/components/ui/button";
import AppLayout from "@/layouts/app-layout";
import { NavItem, BreadcrumbItem } from "@/types";
import { Head } from "@inertiajs/react";
import clsx from "clsx";
import { table } from "console";
import { ArrowDown01, FolderKanban, LayoutDashboard, List, Search, Table2, UserPen, Bolt, Contact, ChevronDown, University, Plus } from "lucide-react";
import { DataTable } from "./data-table";
import { columns, Payment } from "./columns";
// import { columns, Payment } from "./columns"
// import { DataTable } from "./data-table"
const navItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: 'dashboard',
        icon: LayoutDashboard,
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
];

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
];

// async function getData(): Promise<Payment[]> {
//   // Fetch data from your API here.
//     return [
//         {
//         id: "728ed52f",
//         amount: 100,
//         status: "pending",
//         email: "m@example.com",
//         },
//         // ...
//     ]
// }

const data: Payment[] = [
    {
        id: "728ed52f",
        name: "John Doe",
        status: "active",
        email: "m@example.com",
        department: "IT",
        created_at: "2022-01-01",
        college: "ABC College",
    },
    {
        id: "a1b2c3d4",
        name: "Alice Smith",
        status: "active",
        email: "alice.smith@example.com",
        department: "HR",
        created_at: "2022-02-15",
        college: "XYZ University",
    },
    {
        id: "e5f6g7h8",
        name: "Bob Johnson",
        status: "inactive",
        email: "bob.johnson@example.com",
        department: "Finance",
        created_at: "2021-11-23",
        college: "LMN Institute",
    },
    {
        id: "i9j0k1l2",
        name: "Carol Davis",
        status: "active",
        email: "carol.davis@example.com",
        department: "Marketing",
        created_at: "2023-03-01",
        college: "ABC College",
    },
    {
        id: "m3n4o5p6",
        name: "David Wilson",
        status: "active",
        email: "david.wilson@example.com",
        department: "IT",
        created_at: "2020-09-12",
        college: "XYZ University",
    },
    {
        id: "q7r8s9t0",
        name: "Eve Brown",
        status: "inactive",
        email: "eve.brown@example.com",
        department: "IT",
        created_at: "2021-05-30",
        college: "DEF College",
    },
    {
        id: "u1v2w3x4",
        name: "Frank White",
        status: "active",
        email: "frank.white@example.com",
        department: "Operations",
        created_at: "2022-12-05",
        college: "GHI University",
    },
    {
        id: "y5z6a7b8",
        name: "Grace Green",
        status: "active",
        email: "grace.green@example.com",
        department: "IT",
        created_at: "2023-01-18",
        college: "JKL Institute",
    },
    {
        id: "c9d0e1f2",
        name: "Henry Adams",
        status: "inactive",
        email: "henry.adams@example.com",
        department: "Logistics",
        created_at: "2021-07-09",
        college: "ABC College",
    },
    {
        id: "g3h4i5j6",
        name: "Ivy Thomas",
        status: "active",
        email: "ivy.thomas@example.com",
        department: "R&D",
        created_at: "2022-03-21",
        college: "XYZ University",
    },
    {
        id: "k7l8m9n0",
        name: "Jack Martin",
        status: "active",
        email: "jack.martin@example.com",
        department: "Sales",
        created_at: "2023-06-10",
        college: "NOP College",
    },
    {
    id: "o1p2q3r4",
    name: "Karen Lopez",
    status: "inactive",
    email: "karen.lopez@example.com",
    department: "Legal",
    created_at: "2021-04-17",
    college: "UVW University",
    },
    {
        id: "s5t6u7v8",
        name: "Liam Scott",
        status: "active",
        email: "liam.scott@example.com",
        department: "IT",
        created_at: "2023-05-12",
        college: "ABC College",
    },
    {
        id: "w9x0y1z2",
        name: "Mia Turner",
        status: "active",
        email: "mia.turner@example.com",
        department: "Customer Support",
        created_at: "2022-08-03",
        college: "QRS Institute",
    },
    {
        id: "a3b4c5d6",
        name: "Noah Phillips",
        status: "inactive",
        email: "noah.phillips@example.com",
        department: "Engineering",
        created_at: "2020-10-22",
        college: "XYZ University",
    },
    {
        id: "e7f8g9h0",
        name: "Olivia Campbell",
        status: "active",
        email: "olivia.campbell@example.com",
        department: "Design",
        created_at: "2021-12-09",
        college: "LMN College",
    },
    {
        id: "i1j2k3l4",
        name: "Paul Reed",
        status: "active",
        email: "paul.reed@example.com",
        department: "Finance",
        created_at: "2023-04-25",
        college: "ABC College",
    },
    {
        id: "m5n6o7p8",
        name: "Quinn Stewart",
        status: "inactive",
        email: "quinn.stewart@example.com",
        department: "Research",
        created_at: "2022-07-14",
        college: "GHI University",
    },
    {
        id: "q9r0s1t2",
        name: "Rachel Bryant",
        status: "active",
        email: "rachel.bryant@example.com",
        department: "HR",
        created_at: "2021-03-29",
        college: "XYZ University",
    },
    {
        id: "u3v4w5x6",
        name: "Samuel Bennett",
        status: "active",
        email: "samuel.bennett@example.com",
        department: "IT",
        created_at: "2023-02-11",
        college: "ABC College",
    },
    {
        id: "y7z8a9b0",
        name: "Tina Foster",
        status: "inactive",
        email: "tina.foster@example.com",
        department: "Administration",
        created_at: "2020-06-06",
        college: "NOP University",
    }
];



export default function UserManagement() {
    // const data = await getData();
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
                <DataTable columns={columns} data={data} />
                
            </div>
        </AppLayout>
    )
}
    