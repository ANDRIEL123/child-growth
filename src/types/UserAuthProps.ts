export type UserAuthProps = {
    id: bigint,
    name: string,
    email: string,
    token: string,
    active: number,
    phone: string,
    birthDate: Date,
    password: string,
    avatar?: string
}