import { cn } from "@/lib/utils";
import { httpGet } from "@/services";
import { Warning } from "@mui/icons-material";
import { Autocomplete, TextField } from "@mui/material";
import { Label } from "@radix-ui/react-menubar";
import { useEffect, useState } from "react";
import { UseFormRegisterReturn, UseFormSetValue } from "react-hook-form";

type ComboBoxProps = {
    endpoint: string,
    register: UseFormRegisterReturn<any>,
    label: string,
    errorMessage: any,
    setValue: UseFormSetValue<any>
}

type Option = {
    label: string,
    value: string
}

function ComboBoxInput(props: ComboBoxProps) {
    const {
        endpoint,
        register,
        label,
        errorMessage,
        setValue
    } = props

    const [options, setOptions] = useState<any>([])

    useEffect(() => {
        async function fetchData() {
            const { content } = await httpGet(`${endpoint}/GetOptions`)
            setOptions(content)
        }

        fetchData()
    }, [endpoint])

    return (
        <>
            <Label className={cn(
                "text-xs",
                errorMessage ? "text-red-400" : null,
            )}>
                {`Selecione um(a) `}
                {label}
            </Label>
            <Autocomplete
                options={options}
                getOptionLabel={(option: Option) => option.label}
                {...register}
                onChange={(event, newValue: any) => {
                    register.onChange(newValue)
                    if (newValue) {
                        setValue(register.name, newValue.value)
                    } else {
                        setValue(register.name, '')
                    }

                }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        placeholder={label}
                    />
                )}
            />
            {
                errorMessage ? (
                    <span className="flex items-center text-red-400 text-sm mt-1">
                        <Warning style={{ fontSize: 18 }} />
                        <b className="ml-1.5 text-xs">{errorMessage}</b>
                    </span>
                ) : null
            }
        </>

    )
}

export default ComboBoxInput