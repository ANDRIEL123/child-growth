import { Input } from '@/components/ui/input';
import { FormChildrenProps } from '@/types/FormChildrenProps';

function Form(props: FormChildrenProps) {
    const {
        errors,
        register
    } = props

    return (
        <>
            <Input
                placeholder="Altura"
                label="Informe a altura"
                type='number'
                errorMessage={errors.height?.message}
                {...register('height')}
            />
            <Input
                placeholder="Peso"
                label="Informe o peso"
                type='number'
                errorMessage={errors.weight?.message}
                {...register('weight')}
            />
            <Input
                placeholder="Perímetro Cefálico"
                label="Informe o perímetro cefálico"
                type='number'
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
            <Input
                placeholder="Criança"
                label="Informe a criança"
                errorMessage={errors.childrenId?.message}
                {...register('children_id')}
            />
        </>
    )
}

export default Form