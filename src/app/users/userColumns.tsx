import { ColumnDef } from "@tanstack/react-table"

type User = {
    name: string
}

export const userColumns: ColumnDef<User>[] = [
    {
        accessorKey: 'name',
        header: 'Nome'
    }
]