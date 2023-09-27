import { AuthContext } from "@/contexts/Auth"
import { useContext } from "react"
import { DropdownMenuMyAccount } from "../DropdownMyAccount"
import Logo from "../Logo"
import { NavMenu } from "../NavMenu"

const Header = () => {
    const authContext = useContext(AuthContext)

    return (
        <div className="h-1 flex items-center text-center justify-between bg-zinc-900 p-10">
            <NavMenu />
            <Logo />
            <DropdownMenuMyAccount avatar={authContext.user?.avatar} />
        </div>
    )
}

export default Header