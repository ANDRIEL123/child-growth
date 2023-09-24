'use client'

import { removeItem, setItem } from "@/services/StorageService";
import { UserAuthProps } from "@/types/UserAuthProps";
import React, { createContext, useEffect, useState } from "react";

type AuthContextProps = {
    user: UserAuthProps | null,
    login: (token: string) => void,
    logout: () => void,
    setUserData: (userInfo: UserAuthProps) => void
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps)

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<UserAuthProps | null>(null)

    const login = (token: string) => {
        setItem('access_token', token)
    }

    const logout = () => {
        removeItem('user')
        removeItem('access_token')
    }

    const setUserData = (userInfo: UserAuthProps) => {
        setItem('user', JSON.stringify(userInfo))
        setUser(userInfo)
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
            logout,
            setUserData
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthContext,
    AuthProvider
};

