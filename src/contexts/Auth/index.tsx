'use client'

import { setItem } from "@/services/StorageService";
import React, { createContext, useState } from "react";

type UserProps = {
    email: string,
    token: string
}

type AuthContextProps = {
    user: UserProps | null,
    login: (user: UserProps) => void,
    logout: () => void
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps)

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<UserProps | null>(null)

    const login = (userInfo: UserProps) => {
        setUser(userInfo)
        setItem('access_token', userInfo.token)
    }

    const logout = () => {
        console.log('deslogou')
    }

    return (
        <AuthContext.Provider value={{
            user,
            login,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthContext,
    AuthProvider
};

