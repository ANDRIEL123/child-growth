import { DropdownMenuMyAccount } from "../DropdownMyAccount"
import Logo from "../Logo"
import { NavMenu } from "../NavMenu"

type HeaderProps = {
    avatar?: string
}

const Header = (props: HeaderProps) => {
    return (
        <div className="h-1 flex items-center text-center justify-between bg-zinc-900 p-10">
            <NavMenu />
            <Logo />
            <DropdownMenuMyAccount avatar={props.avatar} />
        </div>
    )
}

export default Header