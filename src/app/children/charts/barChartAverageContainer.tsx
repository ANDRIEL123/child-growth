
import { LineChartAverage } from "./barChartAverage"

type AverageProps = {
    childrenId: number
}

export interface LineChartAverageProps extends AverageProps {
    alias: string,
    chartType: number
}

export function AverageLineChart(props: AverageProps) {
    return (
        <div className="flex flex-col">
            <div className="mt-8">
                <LineChartAverage
                    childrenId={props.childrenId}
                    alias="Peso"
                    chartType={0}
                />
            </div>
            <div className="mt-8">
                <LineChartAverage
                    childrenId={props.childrenId}
                    alias="Altura"
                    chartType={1}
                />
            </div>
            <div className="mt-8">
                <LineChartAverage
                    childrenId={props.childrenId}
                    alias="Perímetro Cefálico"
                    chartType={2}
                />
            </div>
        </div>
    )
}