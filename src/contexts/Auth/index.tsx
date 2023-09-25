'use client'

import { removeItem, setItem } from "@/services/StorageService";
import { UserAuthProps } from "@/types/UserAuthProps";
import { useRouter } from "next/navigation";
import React, { createContext, useEffect, useState } from "react";
import { toast } from 'react-toastify';

type AuthContextProps = {
    user: UserAuthProps | null,
    login: (token: string) => void,
    logout: () => void,
    setUserData: (userInfo: UserAuthProps) => void
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps)

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter()
    const [user, setUser] = useState<UserAuthProps | null>(null)

    const login = (token: string) => {
        setItem('access_token', token)
    }

    const logout = () => {
        removeItem('user')
        removeItem('access_token')
        setUser(null)

        toast.info('Usuário desconectado.')
        router.push('/login')

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

