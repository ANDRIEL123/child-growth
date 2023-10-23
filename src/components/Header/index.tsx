import { useAuthContext } from "@/contexts/Auth"
import { DropdownMenuMyAccount } from "../DropdownMyAccount"
import Logo from "../Logo"
import { NavMenu } from "../NavMenu"

const Header = () => {
    const authContext = useAuthContext()

    return (
        <div className="h-1 flex items-center text-center justify-between bg-zinc-900 p-10">
            {
                // TODO melhorar futuramente
                // Só mostra o menu se for pediatra
                authContext.user?.type === 0 ? (
                    <NavMenu />
                ) : null
            }
            <Logo />
            <DropdownMenuMyAccount avatar={authContext.user?.avatar} />
        </div>
    )
}

export default Header