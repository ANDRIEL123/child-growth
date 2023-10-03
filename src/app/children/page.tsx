'use client'

import { DataTableBase } from "@/components/DataTableBase";
import Header from "@/components/Header";
import { Suspense } from "react";
import { childrenColumns } from './childrenColumns';

const ChildrenPage = () => {
    return (
        <>
            <Header />
            <Suspense fallback={<p>Carregando...</p>}>
                <DataTableBase
                    columns={childrenColumns}
                    searchFor="name"
                    endpoint="/children"
                />
            </Suspense>
        </>
    )
}

export default ChildrenPage