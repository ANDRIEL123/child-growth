import ComboBoxInput from '@/components/ComboBoxInput';
import { SelectInput } from '@/components/SelectInput';
import { Input } from '@/components/ui/input';
import { FormChildrenProps } from '@/types/FormChildrenProps';

function Form(props: FormChildrenProps) {
    const {
        errors,
        register,
        setValue,
        item
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
            <SelectInput
                label="Selecione o gênero"
                options={[
                    { label: 'Masculino', value: 0 },
                    { label: 'Feminino', value: 1 }
                ]}
                register={register('gender')}
                initialValue={item.gender}
                errorMessage={errors.gender?.message}
            />
            <ComboBoxInput
                endpoint='responsible'
                label='Responsável'
                register={register('responsibleId')}
                errorMessage={errors.responsibleId?.message}
                setValue={setValue}
                item={item}
            />
        </>
    )
}

export default Form