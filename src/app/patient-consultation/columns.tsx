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
        header: 'Altura (Centímetros)'
    },
    {
        accessorKey: 'weight',
        header: 'Peso (Kilos)'
    },
    {
        accessorKey: 'cephalicPerimeter',
        header: 'Perímetro Cefálico (Centímetros)'
    }
]