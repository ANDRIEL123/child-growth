'use client'

import { DataTable } from "@/components/DataTable";
import { AuthContext } from "@/contexts/Auth";
import { httpGet } from "@/services";
import { useContext, useEffect, useState } from "react";
import { userColumns } from "./userColumns";

const UsersPage = () => {
    const authContext = useContext(AuthContext)
    const [users, setUsers] = useState([])

    useEffect(() => {
        getUsers()
    });

    const getUsers = async () => {
        const response = await httpGet('/users')
        setUsers(response)
    }

    return (
        <>
            <h3>Bem vindo(a) {authContext.user?.email}</h3>
            <DataTable columns={userColumns} data={users} />
        </>
    )
}

export default UsersPage