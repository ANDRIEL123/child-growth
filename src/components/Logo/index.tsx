export enum Color {
    White,
    Dark
}

type logoProps = {
    color?: Color
}

const Logo = (props: logoProps) => {
    const variant = props.color || Color.White
    const color = variant === Color.White ? 'text-white' : 'text-zinc-900'

    return (
        <div className={`relative z-20 flex items-center text-lg font-medium ${color}`} >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2 h-6 w-6"
            >
                <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
            Child Growth
        </div >
    )
}

export default Logo