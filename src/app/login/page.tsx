
"use client"

import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AuthContext } from "@/contexts/Auth"
import { getAuthentication } from "@/services/auth"
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useContext, useState } from "react"
import { useForm } from 'react-hook-form'

import { UserSchemaFormData, userSchema } from "./schema"

export default function Login() {
    const router = useRouter()
    const authContext = useContext(AuthContext)
    const { register, handleSubmit, formState: {
        errors
    } } = useForm<UserSchemaFormData>({
        resolver: zodResolver(userSchema)
    });

    const [isLoading, setIsLoading] = useState(false)

    async function onSubmit(data: any) {
        setIsLoading(true)
        try {
            const authentication = await getAuthentication(data.email, data.password)

            authContext.login({
                email: data.email,
                token: authentication.accessToken
            })

            router.push('/users')
        } catch (error) {
            throw error
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="flex flex-col p-10">
            <div className="relative z-20 flex items-center text-lg font-medium">
                Child Growth
            </div>
            <div className="flex flex-col items-center justify-center mt-20">
                <Label className="text-xl">Informe seus dados para acessar</Label>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="w-full sm:w-1/3 lg mt-10"
                >
                    <div className="grid gap-2">
                        <div className="grid gap-1">
                            <Input
                                id="email"
                                placeholder="Informe seu e-mail"
                                autoCapitalize="none"
                                autoComplete="email"
                                autoCorrect="off"
                                errorMessage={errors.email?.message}
                                disabled={isLoading}
                                {...register('email')}
                            />
                            <Input
                                id="password"
                                placeholder="Informe sua senha"
                                type="password"
                                autoCapitalize="none"
                                autoComplete="password"
                                autoCorrect="offx"
                                errorMessage={errors.password?.message}
                                disabled={isLoading}
                                {...register('password')}
                            />
                        </div>
                        <Button disabled={isLoading}>
                            {isLoading && (
                                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            Entrar
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}