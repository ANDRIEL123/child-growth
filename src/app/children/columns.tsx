import { formatDate } from "@/utils/date"
import { ColumnDef } from "@tanstack/react-table"

export const columns: ColumnDef<any>[] = [
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