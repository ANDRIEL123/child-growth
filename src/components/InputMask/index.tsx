import { InputMask } from "@react-input/mask"
import { UseFormRegisterReturn } from "react-hook-form"
import { Input, InputProps } from "../ui/input"

type MaskInputProps = {
    mask?: string,
    replacement?: string,
    register: UseFormRegisterReturn<any>
} & InputProps

function MaskInput(props: MaskInputProps) {
    return (
        <InputMask<typeof Input>
            component={Input}
            {...props}
            {...props.register}
        />
    )
}

export default MaskInput