'use client'

import { httpGet } from "@/services";
import { useEffect, useState } from "react";

interface User {
    id: bigint,
    name: string
}

const UsersPage = () => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        // Update the document title using the browser API
        getUsers()
    });

    const getUsers = async () => {
        const response = await httpGet('/users')
        setUsers(response)
    }

    return (
        <>
            {
                users.map((item: User) => (
                    <h3 key={item.name}>{item.name}</h3>
                ))
            }
        </>
    )
}

export default UsersPage