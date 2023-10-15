"use client"

import * as React from "react"

import MaskInput from "@/components/InputMask"
import { SelectInput } from "@/components/SelectInput"
import UploadImageInput from "@/components/UploadImageInput"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuthContext } from "@/contexts/Auth"
import { useDialogContext } from "@/contexts/Dialog"
import { cn } from "@/lib/utils"
import { httpGet, httpPut } from "@/services"
import { zodResolver } from "@hookform/resolvers/zod"
import { head } from "lodash"
import { useForm } from "react-hook-form"
import { UserSchemaFormData, userSchema } from "./schema"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { }

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const { user } = useAuthContext()
  const { closeDialog } = useDialogContext()
  const [file, setFile] = React.useState('')
  const [isLoading, setIsLoading] = React.useState<boolean>(true)
  const { register, control, handleSubmit, setError, setValue, formState: {
    errors
  } } = useForm<UserSchemaFormData>({
    resolver: zodResolver(userSchema)
  });

  React.useEffect(() => {
    async function fetchData() {
      setIsLoading(true)
      const userData = await httpGet('/Users/GetByFilters', {
        filters: JSON.stringify([
          { PropertyName: 'Id', Operation: 'Equals', Value: user?.id }
        ])
      })

      if (userData) {
        const initialUserData = head(userData) as any
        const treatUserData = {
          ...initialUserData,
          confirmPassword: initialUserData.password
        }

        const ret = userSchema.parse(treatUserData)

        setValue('id', ret.id)
        setValue('name', ret.name)
        setValue('email', ret.email)
        setValue('avatar', ret.avatar)
        setFile(initialUserData.avatar)
        setValue('password', ret.password)
        setValue('confirmPassword', ret.confirmPassword)
        setValue('phone', ret.phone)
        setValue('type', ret.type)
      }

      setIsLoading(false)
    }

    fetchData()
  }, [])

  async function onSubmit(data: any) {
    setIsLoading(true)

    const file = control._formValues.avatar[0]

    // Lida com o envio da mensagem em base64
    if (file && file instanceof File) {
      const reader = new FileReader()

      reader.onload = async function (event) {
        data.avatar = 'data:image/png;base64,' + (event.target?.result as string)?.split(',')[1]

        await sendUser(data)
      }

      reader.readAsDataURL(file)
    } else {
      await sendUser(data)
    }
  }

  async function sendUser(data: any) {
    try {
      if (data.password !== data.confirmPassword) {
        setError('password', { message: 'As senhas não coincidem.' })
        setError('confirmPassword', { message: 'As senhas não coincidem.' })
      } else {
        await httpPut('users', data)

        closeDialog()
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
              replacement={{ _: /\d/ }}
              placeholder="Telefone"
              label="Informe o telefone"
              errorMessage={errors.phone?.message}
              disabled={isLoading}
              register={register('phone')}
            />
            <SelectInput
              label="Selecione um Tipo de Usuário"
              options={[
                { label: 'Pediatra', value: 0 },
                { label: 'Responsável', value: 1 }
              ]}
              register={register('type')}
              initialValue={control._formValues.type}
              errorMessage={errors.type?.message}
              loading={isLoading}
              disabled
            />
            <UploadImageInput
              errorMessage={errors.avatar?.message}
              label="Selecione sua imagem de perfil"
              disabled={isLoading}
              register={register('avatar')}
              file={file}
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