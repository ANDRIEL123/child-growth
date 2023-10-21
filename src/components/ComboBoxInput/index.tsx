import { cn } from "@/lib/utils";
import { httpGet } from "@/services";
import { OptionProps } from "@/types/OptionsProps";
import { Warning } from "@mui/icons-material";
import { Autocomplete, TextField } from "@mui/material";
import { Label } from "@radix-ui/react-menubar";
import { get } from "lodash";
import { useEffect, useState } from "react";
import { UseFormRegisterReturn, UseFormSetValue } from "react-hook-form";

type ComboBoxProps = {
    endpoint: string,
    register: UseFormRegisterReturn<any>,
    label: string,
    errorMessage: any,
    setValue: UseFormSetValue<any>,
    item?: any
}

function ComboBoxInput(props: ComboBoxProps) {
    const {
        endpoint,
        register,
        label,
        errorMessage,
        setValue,
        item
    } = props

    const [options, setOptions] = useState<any>([])
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        async function fetchData() {
            const { content } = await httpGet(`${endpoint}/GetOptions`)
            setOptions(content)
            setLoading(false)
        }

        fetchData()
    }, [endpoint])

    const getInputValue = () => {
        if (item) {
            return options
                .find((x: any) => x.value === get(item, register.name)).label
        }
    }

    if (!loading) {
        return (
            <div className='mt-4 mb-4'>
                <Label className={cn(
                    "text-xs",
                    errorMessage ? "text-red-400" : null,
                )}>
                    {`Selecione um(a) `}
                    {label}
                </Label>
                <Autocomplete
                    options={options}
                    size="small"
                    getOptionLabel={(option: OptionProps) => option.label}
                    {...register}
                    onChange={(event, newValue: any) => {
                        register.onChange(newValue)
                        if (newValue) {
                            setValue(register.name, newValue.value)
                        } else {
                            setValue(register.name, '')
                        }

                    }}
                    noOptionsText="Sem opções"
                    inputValue={getInputValue()}
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
            </div>
        )
    }

    return null
}

export default ComboBoxInput