'use client'

import { DataTable } from "@/components/DataTable"
import Header from "@/components/Header"
import { Suspense } from "react"
import { columns } from "./columns"
import Form from "./form"
import { schema } from './form/schema'

const ChildrenPage = () => {
    return (
        <>
            <Header />
            <Suspense fallback={<p>Carregando...</p>}>
                <DataTable
                    columns={columns}
                    searchFor="name"
                    endpoint="/children"
                    form={Form}
                    schema={schema}
                    dialogTitleKey="Criança"
                />
            </Suspense>
        </>
    )
}

export default ChildrenPage