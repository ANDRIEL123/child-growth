"use client"

import * as React from "react"

import MaskInput from "@/components/InputMask"
import UploadImageInput from "@/components/UploadImageInput"
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
  const { register, control, handleSubmit, setError, formState: {
    errors
  } } = useForm<NewUserSchemaFormData>({
    resolver: zodResolver(newUserSchema)
  });

  async function onSubmit(data: any) {
    setIsLoading(true)

    const file = control._formValues.avatar[0]

    // Lida com o envio da mensagem em base64
    if (file) {
      const reader = new FileReader()

      reader.onload = async function (event) {
        data.avatar = 'data:image/png;base64,' + (event.target?.result as string)?.split(',')[1]

        await sendUser(data)
      }

      reader.readAsDataURL(file)
    } else {
      data.avatar = null
      await sendUser(data)
    }
  }

  async function sendUser(data: any) {
    try {
      if (data.password !== data.confirmPassword) {
        setError('password', { message: 'As senhas não coincidem.' })
        setError('confirmPassword', { message: 'As senhas não coincidem.' })
      } else {
        await httpPost('users', data)

        router.push('/login')
      }
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
              placeholder="E-mail"
              label="Informe o email"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              errorMessage={errors.email?.message}
              autoCorrect="off"
              disabled={isLoading}
              {...register('email')}
            />
            <Input
              placeholder="Nome"
              autoCapitalize="none"
              label="Informe o nome"
              errorMessage={errors.name?.message}
              autoCorrect="off"
              disabled={isLoading}
              {...register('name')}
            />
            <Input
              placeholder="Senha"
              label="Informe a senha"
              type="password"
              errorMessage={errors.password?.message}
              disabled={isLoading}
              {...register('password')}
            />
            <Input
              placeholder="Senha"
              label="Confirme a senha"
              type="password"
              errorMessage={errors.confirmPassword?.message}
              autoCorrect="off"
              disabled={isLoading}
              {...register('confirmPassword')}
            />
            <MaskInput
              mask="(__) _____-_____"
              replacement="_"
              placeholder="Telefone"
              label="Informe o telefone"
              errorMessage={errors.phone?.message}
              disabled={isLoading}
              register={register('phone')}
            />
            <UploadImageInput
              errorMessage={errors.avatar?.message}
              label="Selecione sua imagem de perfil"
              disabled={isLoading}
              register={register('avatar')}
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