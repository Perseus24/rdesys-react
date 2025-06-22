import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import { NavItem, type BreadcrumbItem } from '@/types';
import { type ReactNode } from 'react';

interface AppLayoutProps {
    children: ReactNode;
    navItems?: NavItem[];
    breadcrumbs?: BreadcrumbItem[];
}

export default ({ children, navItems, breadcrumbs, ...props }: AppLayoutProps) => (
    <AppLayoutTemplate navItems={navItems} breadcrumbs={breadcrumbs} {...props}>
        {children}
    </AppLayoutTemplate>
);
