import { formatDate } from "@/utils/date"
import { ColumnDef } from "@tanstack/react-table"

type UserProps = {
    name: string,
    birthDate: Date
}

export const childrenColumns: ColumnDef<UserProps>[] = [
    {
        accessorKey: 'name',
        header: 'Nome'
    },
    {
        accessorKey: 'birthDate',
        header: 'Aniversário',
        cell: ({ row }) => {
            return (
                <div>
                    {formatDate(row.getValue("birthDate"))}
                </div>
            )
        }
    }
]