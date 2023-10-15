'use client'

import { Input } from '@/components/ui/input';
import { FormChildrenProps } from '@/types/FormChildrenProps';
import { useSearchParams } from 'next/navigation';

function Form(props: FormChildrenProps) {
    const { get } = useSearchParams();
    const childrenId = get('id')

    const {
        errors,
        register,
        setValue
    } = props

    if (childrenId) {
        setValue('childrenId', childrenId)
    }

    return (
        <>
            <Input
                placeholder="Altura"
                label="Informe a altura em Centímetros"
                type='number'
                step="0.01"
                errorMessage={errors.height?.message}
                {...register('height')}
            />
            <Input
                placeholder="Peso"
                label="Informe o peso em Kilos"
                type='number'
                step="0.01"
                errorMessage={errors.weight?.message}
                {...register('weight')}
            />
            <Input
                placeholder="Perímetro Cefálico em Centímetros"
                label="Informe o perímetro cefálico"
                type='number'
                step="0.01"
                errorMessage={errors.cephalicPerimeter?.message}
                {...register('cephalicPerimeter')}
            />
            <Input
                placeholder="Observações"
                label="Observações"
                errorMessage={errors.observations?.message}
                {...register('observations')}
            />
            <Input
                type='date'
                placeholder='Data da consulta'
                label='Informe a data da consulta'
                errorMessage={errors.date?.message}
                {...register('date')}
            />
        </>
    )
}

export default Form