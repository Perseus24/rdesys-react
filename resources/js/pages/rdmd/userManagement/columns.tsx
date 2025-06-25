import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DataTableColumnHeader } from "@/components/data-table-column-header"
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
    id: string
    name: string
    status:  "active" | "inactive" 
    email: string
    department: string
    created_at: string
    college: string
}

export const columns: ColumnDef<Payment>[] = [
    {
        id: "select",
        header: ({ table }) => (
        <Checkbox
            checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
        />
        ),
        cell: ({ row }) => (
        <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
        />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "status",
        header: "Status",
    },
    {
        accessorKey: "email",
        header: ({ column }) => (   // this makes the column sortable, this is a reusable component
            <DataTableColumnHeader column={column} title="Email" />
        ),
    },
    {
        accessorKey: "department",
        header: "Department",
    },
    {
        accessorKey: "created_at",
        header: ({ column }) => ( 
            <DataTableColumnHeader column={column} title="Created at" />
        ),

    },
    {
        accessorKey: "college",
        header: "College",
    },
    {
        id: "actions",
        cell: ({ row }) => {
            return (
                <DropdownMenu>
                <DropdownMenuTrigger asChild className="text-xs">
                    <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="text-xs">
                    <DropdownMenuLabel className="text-xs">Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem  className="text-xs" >View user details</DropdownMenuItem>
                    <DropdownMenuItem  className="text-xs">Edit user</DropdownMenuItem>
                </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]

// Columns are where you define the core of what your table will look like. They define the data that will be displayed, how it will be formatted, sorted and filtered.