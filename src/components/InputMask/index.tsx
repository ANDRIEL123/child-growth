import { InputMask } from "@react-input/mask"
import { UseFormRegisterReturn } from "react-hook-form"
import { Input, InputProps } from "../ui/input"

type MaskInputProps = {
    mask?: string,
    replacement?: any,
    register: UseFormRegisterReturn<any>
} & InputProps

function MaskInput(props: MaskInputProps) {
    return (
        <InputMask
            component={Input}
            label={props.label}
            errorMessage={props.errorMessage}
            mask={props.mask}
            placeholder={props.placeholder}
            replacement={props.replacement}
            {...props.register}
        />
    )
}

export default MaskInput