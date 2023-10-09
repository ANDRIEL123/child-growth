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
                placeholder="Nome"
                label="Informe o nome"
                errorMessage={errors.name?.message}
                {...register('name')}
            />
            <Input
                type='date'
                placeholder='Data de nascimento'
                label='Informe a data de nascimento'
                errorMessage={errors.birthDate?.message}
                {...register('birthDate')}
            />
        </>
    )
}

export default Form