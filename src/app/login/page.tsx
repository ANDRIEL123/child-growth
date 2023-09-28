
"use client"

import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuthContext } from "@/contexts/Auth"
import { getAuthentication } from "@/services/auth"
import { zodResolver } from '@hookform/resolvers/zod'
import { head } from 'lodash'
import { useRouter } from 'next/navigation'
import { useState } from "react"
import { useForm } from 'react-hook-form'

import Logo, { Color } from "@/components/Logo"
import { httpGet } from "@/services"
import { UserAuthProps } from "@/types/UserAuthProps"
import Link from "next/link"
import { UserSchemaFormData, userSchema } from "./schema"

export default function Login() {
    const router = useRouter()
    const authContext = useAuthContext()
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

            authContext.login(authentication.accessToken)

            const user = await httpGet('/users/getbyfilters', {
                filters: JSON.stringify([
                    { PropertyName: 'Email', Operation: 'Equals', Value: data.email }
                ])
            })

            const userAuth = head(user) as UserAuthProps
            userAuth.token = authentication.accessToken;
            authContext.setUserData(userAuth)

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
                <Logo color={Color.Dark} />
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
                                placeholder="E-mail"
                                label="Informe o Email"
                                autoCapitalize="none"
                                autoComplete="email"
                                autoCorrect="off"
                                errorMessage={errors.email?.message}
                                disabled={isLoading}
                                {...register('email')}
                            />
                            <Input
                                id="password"
                                placeholder="Senha"
                                label="Informe a senha"
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
                        <div className="flex justify-center">
                            <span className="text-sm" >Não possuí uma conta?</span>
                            <Link href="/" className="font-bold text-sm ml-1">
                                Fazer cadastro
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}