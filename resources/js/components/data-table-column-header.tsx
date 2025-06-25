// Reusable component to make any column sortable

import { Column } from "@tanstack/react-table"
import { ArrowDown, ArrowUp, ChevronsUpDown, EyeOff } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface DataTableColumnHeaderProps<TData, TValue>
    extends React.HTMLAttributes<HTMLDivElement> {
    column: Column<TData, TValue>
    title: string
}

export function DataTableColumnHeader<TData, TValue>({
    column,
    title,
    className,
}: DataTableColumnHeaderProps<TData, TValue>) {
    if (!column.getCanSort()) {
        return <div className={cn(className)}>{title}</div>
    }

    return (
        <div className={cn("flex items-center gap-2", className)}>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
            <Button
                variant="ghost"
                size="sm"
                className="data-[state=open]:bg-accent -ml-3 h-8 text-xs"
            >
                <span className="text-xs">{title}</span>
                {
                    column.getIsSorted() === "desc" ? (
                        <ArrowDown className="h-4 w-4" />
                        ) : column.getIsSorted() === "asc" ? (
                        <ArrowUp />
                        ) : (
                        <ChevronsUpDown className="h-4 w-4" />
                    )
                }
            </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="text-xs">
                <DropdownMenuItem  className="text-xs" onClick={() => column.toggleSorting(false)}>
                    <ArrowUp />
                    Asc
                </DropdownMenuItem>
                <DropdownMenuItem className="text-xs" onClick={() => column.toggleSorting(true)}>
                    <ArrowDown />
                    Desc
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-xs" onClick={() => column.toggleVisibility(false)}>
                    <EyeOff />
                    Hide
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
        </div>
    )
}
