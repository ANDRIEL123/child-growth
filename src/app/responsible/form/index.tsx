import MaskInput from '@/components/InputMask';
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
                placeholder="E-mail"
                label="Informe o email"
                type="email"
                autoCapitalize="none"
                autoComplete="email"
                errorMessage={errors.email?.message}
                autoCorrect="off"
                {...register('email')}
            />
            <MaskInput
                mask="(__) _____-____"
                replacement={{ _: /\d/ }}
                placeholder="Telefone"
                label="Informe o telefone"
                errorMessage={errors.phone?.message}
                register={register('phone')}
            />
            <MaskInput
                mask="___.___.___-__"
                replacement={{ _: /\d/ }}
                placeholder="CPF"
                label="Informe o CPF"
                type="tel"
                errorMessage={errors.cpf?.message}
                register={register('cpf')}
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