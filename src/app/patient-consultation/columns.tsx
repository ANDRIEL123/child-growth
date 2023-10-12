import { formatDate } from "@/utils/date"
import { ColumnDef } from "@tanstack/react-table"

export const columns: ColumnDef<any>[] = [
    {
        accessorKey: 'date',
        header: 'Data da Consulta',
        cell: ({ row }) => {
            return (
                <div>
                    {formatDate(row.getValue("date"))}
                </div>
            )
        }
    },
    {
        accessorKey: 'height',
        header: 'Altura'
    },
    {
        accessorKey: 'weight',
        header: 'Peso'
    },
    {
        accessorKey: 'cephalicPerimeter',
        header: 'Perímetro Cefálico'
    }
]