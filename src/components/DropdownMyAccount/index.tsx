import {
    LogOut,
    Settings
} from "lucide-react"

import { UserAuthForm } from "@/app/Authentication/components/updateUserForm"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { useAuthContext } from "@/contexts/Auth"
import { useDialogContext } from "@/contexts/Dialog"
import { Avatar } from "@mui/material"

type DropdownMenuAccountProps = {
    avatar?: string
}

export function DropdownMenuMyAccount(props: DropdownMenuAccountProps) {
    const authContext = useAuthContext()
    const { openDialog } = useDialogContext()

    return (
        <DropdownMenu>
            <div className="flex items-center justify-center">
                <span className="text-white mr-5">{authContext.user?.name}</span>
                <DropdownMenuTrigger asChild>
                    <Avatar className="h-14 w-14 hover:cursor-pointer" src={props.avatar} alt="avatar" />
                </DropdownMenuTrigger>
            </div>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    className="hover:cursor-pointer hover:bg-slate-200"
                    onClick={() => openDialog({
                        title: 'Alteração de usuário',
                        dialogContent: (<UserAuthForm />),
                        withButtonConfirm: false
                    })}
                >
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Configurações</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    className="hover:cursor-pointer hover:bg-slate-200"
                    onClick={() => authContext.logout()}
                >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sair</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
