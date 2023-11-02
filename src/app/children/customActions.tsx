import { useDialogContext } from "@/contexts/Dialog";
import { AutoGraph, Insights, ManageHistory, QueryStats } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import { useRouter } from 'next/navigation';
import { showLoading } from 'react-global-loading';
import { AverageLineChart } from "./charts/barChartAverageContainer";
import { LineChartComparative } from "./charts/comparativeLineChart";
import { ZScoresContainer } from "./charts/zscoresContainer";

type CustomActionsProps = {
    item: any
}

function CustomActions(props: CustomActionsProps) {
    const { item } = props
    const { openDialog } = useDialogContext()
    const router = useRouter()

    return (
        <>
            <Tooltip title="Gerenciar paciente">
                <ManageHistory
                    className="hover:cursor-pointer ml-4"
                    onClick={() => {
                        showLoading(true)
                        router.push(`patient-consultation?id=${item.id}`)
                        setTimeout(() => {
                            showLoading(false)
                        }, 500)
                    }}
                />
            </Tooltip>
            <Tooltip title="Visualizar Gráfico últimas consultas">
                <AutoGraph
                    className="hover:cursor-pointer ml-4"
                    onClick={() => {
                        openDialog({
                            title: `Resumo das últimas consultas do paciente ${item.name}`,
                            dialogContent: <LineChartComparative
                                childrenId={item.id}
                            />,
                            withButtonConfirm: false,
                            dialogProps: {
                                maxWidth: 'lg'
                            }
                        })
                    }}
                />
            </Tooltip>
            <Tooltip title="Visualizar Gráficos comparativos com percentil médio P50">
                <QueryStats
                    className="hover:cursor-pointer ml-4"
                    onClick={() => {
                        openDialog({
                            title: `Gráficos comparativos com percentil médio P50 do paciente ${item.name}`,
                            dialogContent: <AverageLineChart
                                childrenId={item.id}
                            />,
                            withButtonConfirm: false,
                            dialogProps: {
                                maxWidth: 'lg'
                            }
                        })
                    }}
                />
            </Tooltip>
            <Tooltip title="Visualizar Gráficos Escore-z">
                <Insights
                    className="hover:cursor-pointer ml-4"
                    onClick={() => {
                        openDialog({
                            title: `Gráficos Escore-z do paciente ${item.name}`,
                            dialogContent: <ZScoresContainer
                                childrenId={item.id}
                            />,
                            withButtonConfirm: false,
                            dialogProps: {
                                maxWidth: 'lg'
                            }
                        })
                    }}
                />
            </Tooltip>
        </>
    )
}

export default CustomActions