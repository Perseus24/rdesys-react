import { ChevronRight, type LucideIcon } from "lucide-react"

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuAction,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { Link } from "@inertiajs/react"
import clsx from "clsx"
import { NavItem } from "@/types"

export function NavMain({
    items,
    }: {
    items: NavItem[]
}) {
    return (
        <SidebarGroup>
        <SidebarGroupLabel>Navigation</SidebarGroupLabel>
        <SidebarMenu>
            {items.map((item) => (
            <Collapsible key={item.title} asChild defaultOpen={item.isActive} className="group/collapsible">
                <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                    <SidebarMenuButton asChild tooltip={item.title} className={clsx(
                        "flex items-center space-x-2 rounded-md px-2 py-1 text-sm font-medium transition-colors duration-200 ease-in-out",
                        item.isActive ? "bg-cyan-500 text-white hover:bg-cyan-500 hover:text-none" : "",
                    )}>
                        <Link href={item.href}>
                            {item.icon && <item.icon />}
                            <span>{item.title}</span>
                        </Link>    
                    </SidebarMenuButton>
                    </CollapsibleTrigger>
                {
                    item.items?.length ? (
                    <>
                        <CollapsibleTrigger asChild>
                        <SidebarMenuAction className="data-[state=open]:rotate-90 text-white hover:text-white">
                            <ChevronRight color="white"/>
                            <span className="sr-only">Toggle</span>
                        </SidebarMenuAction>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                        <SidebarMenuSub>
                            {
                            item.items?.map((subItem)=>(
                                <SidebarMenuSubItem key={subItem.title}>
                                <SidebarMenuSubButton asChild className="hover:bg-white/10 hover:text-white">
                                    <Link className="text-white" href={subItem.href}>{subItem.title}</Link>
                                </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                            ))
                            }
                        </SidebarMenuSub>
                        </CollapsibleContent>
                    </>
                    ) : null
                }
                </SidebarMenuItem>
            </Collapsible>
            ))}
        </SidebarMenu>
        </SidebarGroup>
    )
}
