import { FormChildrenProps } from '@/types/FormChildrenProps';
import { populateFormOnOpen } from '@/utils/zodUtilities';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '../ui/button';

type FormBaseProps = {
    schema: z.ZodObject<any>,
    onSubmit: (data: any) => void,
    formComponent: React.ComponentType<FormChildrenProps>,
    createMode: boolean,
    item?: any
}

function Form(props: FormBaseProps) {
    const {
        onSubmit,
        schema,
        formComponent: FormComponent,
        createMode,
        item
    } = props

    const { register, handleSubmit, setValue, formState: {
        errors
    } } = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema)
    });

    const childrenFormProps = {
        register,
        errors,
        createMode,
        setValue,
        item
    } as FormChildrenProps

    // Se for atualização quando abrir preenche os dados
    useEffect(() => {
        if (!createMode) {
            populateFormOnOpen(
                setValue,
                schema,
                item
            )
        }
    }, [createMode, item, schema, setValue])

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormComponent {...childrenFormProps} />
            <Button className='float-right mt-5'>
                Confirmar
            </Button>
        </form>
    )
}

export default Form;
