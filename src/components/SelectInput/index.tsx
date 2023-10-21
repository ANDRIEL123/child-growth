import { OptionProps } from '@/types/OptionsProps';
import { Warning } from '@mui/icons-material';
import { InputLabel } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { UseFormRegisterReturn } from 'react-hook-form';

type SelectInputProps = {
    options: OptionProps[],
    label: string,
    errorMessage: any,
    initialValue?: string | number,
    register: UseFormRegisterReturn<any>,
    loading?: boolean,
    disabled?: boolean
}

export function SelectInput(props: SelectInputProps) {
    const {
        options,
        label,
        register,
        errorMessage,
        initialValue,
        loading,
        disabled = false
    } = props

    if (loading) {
        return null
    }

    console.log(initialValue)

    return (
        <div className='mt-4 mb-4'>
            <FormControl fullWidth size='small'>
                <InputLabel>{label}</InputLabel>
                <Select
                    label={label}
                    defaultValue={initialValue}
                    disabled={disabled}
                    {...register}
                >
                    {options.map(element => {
                        return (
                            <MenuItem key={element.value} value={element.value}>
                                {element.label}
                            </MenuItem>
                        )
                    })}
                </Select>
            </FormControl>
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