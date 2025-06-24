import { Button } from '@/components/ui/button';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, NavItem, SharedData, UserData } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { LayoutDashboard, LoaderCircle, SquareLibrary, University } from 'lucide-react';
import { useEffect, useState } from 'react';

const navItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: 'dashboard',
        icon: LayoutDashboard,
        isActive: true,
    },
    {
        title: 'Submission Form',
        href: 'submission-form',
        icon: SquareLibrary,
    },
];

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        url: '/dashboard',
    },
]

interface Props {
    userData: UserData;
    researcherDetails: any; //TODO: add type to the index
}

const Dashboard: React.FC<Props> = ({ userData, researcherDetails }) => {
    
    return (
        <AppLayout navItems={navItems} breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto text-xs">
                <div className="grid auto-rows-min gap-4 md:grid-cols-2 ">
                    <div className="relative h-full min-h-[30vh] overflow-hidden rounded-xl border border-sidebar-border/70 bg-cyan-500/10 p-6 text-gray-800">
                        <p className='text-2xl font-semibold w-1/2 mb-4'>Welcome, {userData.name}!</p>
                        <p className='text-sm font-medium'>The Call for BU-Funded Research and Development Proposals is currently closed.</p>
                        <div className='flex gap-3 mt-4'>
                            <Button variant={'secondary'} className='shadow-none bg-white' >Learn More</Button>
                            <Button className='bg-cyan-500 hover:bg-cyan-500/80' >Submit Now</Button>
                        </div>
                    </div>
                    <div className="relative h-full overflow-hidden rounded-xl border border-sidebar-border/70 p-6 pl-12 text-gray-600">
                        <img src="/images/bu_logo.svg" width={50} height={50} alt="BU Logo"  className='absolute right-6 top-6' />
                        {/* <LoaderCircle className="h-4 w-4 animate-spin" /> */}
                        <p className='text-8xl font-semibold mt-7 text-cyan-500'>1<span className='text-base text-gray-600 ml-2'>current ongoing proposal</span></p>
                        <div className='mt-5 flex gap-2 items-end absolute right-6 bottom-6'>
                            <University />
                            <p className='text-sm font-medium'>{researcherDetails.college_name}</p>
                        </div>
                    </div>
                </div>
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                </div>
            </div>
        </AppLayout>
    );
}

export default Dashboard;
