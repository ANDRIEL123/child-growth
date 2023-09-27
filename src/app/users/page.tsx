'use client'

import { DataTable } from "@/components/DataTable";
import Header from "@/components/Header";
import { AuthContext } from "@/contexts/Auth";
import { httpGet } from "@/services";
import { Suspense, useContext, useEffect, useState } from "react";
import { userColumns } from "./userColumns";

const UsersPage = () => {
    const authContext = useContext(AuthContext)
    const [users, setUsers] = useState([])

    const getUsers = async () => {
        const response = await httpGet('/users')
        setUsers(response.content)
    }

    useEffect(() => {
        getUsers()
    }, [])

    return (
        <>
            <Header />
            <Suspense fallback={<p>Carregando...</p>}>
                <DataTable columns={userColumns} data={users} />
            </Suspense>
        </>
    )
}

export default UsersPage