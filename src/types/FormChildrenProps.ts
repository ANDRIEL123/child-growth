import { FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form"

export type FormChildrenProps = {
    register: UseFormRegister<any>,
    errors: FieldErrors<any>,
    setValue: UseFormSetValue<any>,
    createMode?: boolean,
    item?: any
}