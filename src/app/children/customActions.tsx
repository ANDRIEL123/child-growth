import { ManageHistory } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import { useRouter } from 'next/navigation';

type CustomActionsProps = {
    item: any
}

function CustomActions(props: CustomActionsProps) {
    const router = useRouter()

    return (
        <Tooltip title="Gerenciar">
            <ManageHistory
                className="hover:cursor-pointer ml-4"
                onClick={() => {
                    router.push(`patient-consultation?id=${props.item.id}`)
                }}
            />
        </Tooltip>
    )
}

export default CustomActions