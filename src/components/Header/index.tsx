import { AccountCircle } from "@mui/icons-material"
import Logo from "../Logo"
import { NavMenu } from "../NavMenu"

const Header = () => {
    return (
        <div className="h-1 flex items-center text-center justify-between bg-zinc-900 p-10">
            <NavMenu />
            <Logo />
            <AccountCircle style={{ fontSize: 35, color: 'white' }} />
        </div>
    )
}

export default Header