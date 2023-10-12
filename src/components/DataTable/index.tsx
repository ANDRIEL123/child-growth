"use client"

import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { ChevronDown } from "lucide-react";
import * as React from "react";

import { QueryObserverResult, RefetchOptions, RefetchQueryFilters, useQuery } from "@tanstack/react-query";
import { z } from 'zod';

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { OpenDialogProps, useDialogContext } from "@/contexts/Dialog";
import { httpDelete, httpGet, httpPost, httpPut } from "@/services";
import { FormChildrenProps } from "@/types/FormChildrenProps";
import { Add, Delete, Edit, ManageHistory } from '@mui/icons-material';
import { Tooltip } from "@mui/material";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import { useRouter } from 'next/navigation';
import Form from "../Form";
import { Checkbox } from "../ui/checkbox";

type DataTableProps = {
    columns: ColumnDef<any>[],
    searchFor: string,
    endpoint: string,
    form: (props: FormChildrenProps) => JSX.Element,
    schema: z.ZodObject<any>,
    dialogTitleKey?: string,
    withManage?: boolean,
    endpointGet?: string,
    endpointGetParams?: any
}

const columnsBase: ColumnDef<any>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected()}
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
    }
]

const getColumnsActions = (
    endpoint: string,
    openDialog: (openDialogProps: OpenDialogProps) => void,
    refetch: <TPageData>(options?:
        (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined) =>
        Promise<QueryObserverResult<any, unknown>>,
    form: (props: FormChildrenProps) => JSX.Element,
    schema: z.ZodObject<any>,
    closeDialog: () => void,
    router: AppRouterInstance,
    withManage?: boolean
) => {
    const FormContainer = form

    const columnsActions: ColumnDef<any>[] = [
        {
            id: "actions",
            cell: ({ row }) => {
                const id = row.original.id

                return (
                    <>
                        <Tooltip title="Edite o registro">
                            <Edit
                                className="hover:cursor-pointer"
                                onClick={() => openDialog({
                                    title: 'Editar registro',
                                    dialogContent: (
                                        <Form
                                            formComponent={FormContainer}
                                            schema={schema}
                                            onSubmit={async (data) => {
                                                await httpPut(endpoint, data)
                                                closeDialog()
                                                refetch()
                                            }}
                                            createMode={false}
                                            item={row.original}
                                        />
                                    ),
                                    withButtonConfirm: false
                                })}
                            />
                        </Tooltip>
                        <Tooltip title="Exclua o registro">
                            <Delete
                                className="hover:cursor-pointer ml-4"
                                onClick={() => openDialog({
                                    title: 'Deletar',
                                    dialogContent: (<>Realmente deseja excluir?</>),
                                    onConfirm: async () => {
                                        await httpDelete(endpoint, id)
                                        refetch()
                                    }
                                })}
                            />
                        </Tooltip>
                        {
                            withManage ? (
                                <Tooltip title="Gerenciar">
                                    <ManageHistory
                                        className="hover:cursor-pointer ml-4"
                                        onClick={() => {
                                            router.push(`patient-consultation?id=${id}`)
                                        }}
                                    />
                                </Tooltip>
                            ) : null
                        }
                    </>
                )
            }
        }
    ]

    return columnsActions
}

export function DataTable(props: DataTableProps) {
    const { openDialog, closeDialog } = useDialogContext()
    const router = useRouter()

    const {
        columns: newColumns,
        searchFor,
        endpoint,
        form: FormContainer,
        schema,
        dialogTitleKey,
        withManage,
        endpointGet,
        endpointGetParams
    } = props

    const { data, isLoading, refetch } = useQuery({
        queryKey: ['data'],
        queryFn: async () => await httpGet(endpointGet ? endpointGet : endpoint, endpointGetParams)
    })

    const columns = [
        ...columnsBase,
        ...newColumns,
        ...getColumnsActions(
            endpoint,
            openDialog,
            refetch,
            FormContainer,
            schema,
            closeDialog,
            router,
            withManage
        )
    ]

    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})

    const table = useReactTable({
        data: data?.content ? data.content : data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    })

    if (isLoading) {
        return null
    }

    // Submit do formulário
    const submitCreate = async (data: any) => {
        await httpPost(endpoint, data)
        refetch()
        closeDialog()
    }

    return (
        <div className="w-full p-5">
            <div className="flex items-center py-4">
                <div className="flex items-center">
                    <Tooltip title="Novo registro">
                        <Add
                            className="text-3xl hover:cursor-pointer"
                            onClick={() => {
                                openDialog({
                                    dialogContent: (
                                        <Form
                                            formComponent={FormContainer}
                                            schema={schema}
                                            onSubmit={submitCreate}
                                            createMode
                                        />
                                    ),
                                    title: `Cadastro de ${dialogTitleKey}`,
                                    withButtonConfirm: false
                                })
                            }}
                        />
                    </Tooltip>
                    <Input
                        placeholder="Pesquise..."
                        value={(table.getColumn(searchFor)?.getFilterValue() as string) ?? ""}
                        onChange={(event) =>
                            table.getColumn(searchFor)?.setFilterValue(event.target.value)
                        }
                        className="max-w-sm ml-2 mt-2"
                    />
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto">
                            Colunas <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => {
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value: any) =>
                                            column.toggleVisibility(!!value)
                                        }
                                    >
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                )
                            })}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "Selecionado(s"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    Sem dados
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="flex-1 text-sm text-muted-foreground">
                    {table.getFilteredSelectedRowModel().rows.length} de{" "}
                    {table.getFilteredRowModel().rows.length} Linha(s) selecionada(s)
                </div>
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Anterior
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Próxima
                    </Button>
                </div>
            </div>
        </div>
    )
}
