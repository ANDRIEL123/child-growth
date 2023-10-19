import { useDialogContext } from "@/contexts/Dialog";
import { AutoGraph, ManageHistory } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import { useRouter } from 'next/navigation';
import { LineChartAverageWeight } from "./charts/averageWeightLineChart";
import { LineChartComparative } from "./charts/comparativeLineChart";

type CustomActionsProps = {
    item: any
}

function CustomActions(props: CustomActionsProps) {
    const { openDialog } = useDialogContext()
    const router = useRouter()

    return (
        <>
            <Tooltip title="Gerenciar paciente">
                <ManageHistory
                    className="hover:cursor-pointer ml-4"
                    onClick={() => {
                        router.push(`patient-consultation?id=${props.item.id}`)
                    }}
                />
            </Tooltip>
            <Tooltip title="Visualizar Gráfico comparativo das últimas consultas">
                <AutoGraph
                    className="hover:cursor-pointer ml-4"
                    onClick={() => {
                        openDialog({
                            title: 'Resumo das últimas consultas',
                            dialogContent: <LineChartComparative
                                childrenId={props.item.id}
                            />,
                            withButtonConfirm: false
                        })
                    }}
                />
            </Tooltip>
            <Tooltip title="Visualizar Gráficos comparativos com percentil médio P50">
                <AutoGraph
                    className="hover:cursor-pointer ml-4"
                    onClick={() => {
                        openDialog({
                            title: 'Gráficos comparativos com percentil médio P50',
                            dialogContent: <LineChartAverageWeight
                                childrenId={props.item.id}
                            />,
                            withButtonConfirm: false
                        })
                    }}
                />
            </Tooltip>
        </>
    )
}

export default CustomActions