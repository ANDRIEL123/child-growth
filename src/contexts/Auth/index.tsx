'use client'

import { setItem } from "@/services/StorageService";
import React, { createContext, useEffect, useState } from "react";

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
        setItem('user', JSON.stringify(userInfo))
        setItem('access_token', userInfo.token)
    }

    const logout = () => {
        console.log('deslogou')
    }

    // Se tiver a informação do usuário no localStorage é setado
    useEffect(() => {
        const userFromStorage = localStorage.getItem('user');
        if (userFromStorage) {
            setUser(JSON.parse(userFromStorage));
        }
    }, []);

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

