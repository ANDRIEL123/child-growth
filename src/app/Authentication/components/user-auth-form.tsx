"use client"

import * as React from "react"

import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { httpPost } from "@/services"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { NewUserSchemaFormData, newUserSchema } from "./schema"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { }

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  const { register, handleSubmit, formState: {
    errors
  } } = useForm<NewUserSchemaFormData>({
    resolver: zodResolver(newUserSchema)
  });

  async function onSubmit(data: any) {
    setIsLoading(true)

    try {
      await httpPost('users', data)

      router.push('/login')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="E-mail"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              errorMessage={errors.email?.message}
              autoCorrect="off"
              disabled={isLoading}
              {...register('email')}
            />
            <Input
              id="password"
              placeholder="Senha"
              autoCapitalize="none"
              type="password"
              errorMessage={errors.password?.message}
              autoCorrect="off"
              disabled={isLoading}
              {...register('password')}
            />
            <Input
              id="name"
              placeholder="Nome"
              autoCapitalize="none"
              errorMessage={errors.name?.message}
              autoCorrect="off"
              disabled={isLoading}
              {...register('name')}
            />
          </div>
          <Button disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Confirmar
          </Button>
        </div>
      </form>
    </div>
  )
}