
import { ZScoresLineChart } from "./zscoresLineChart"

type AverageProps = {
    childrenId: number
}

export interface BarChartAverageProps extends AverageProps {
    alias: string,
    chartType: number
}

export function ZScoresContainer(props: AverageProps) {
    return (
        <div className="flex flex-col">
            <div className="mt-8">
                <ZScoresLineChart
                    childrenId={props.childrenId}
                    chartType={0}
                    alias="Peso"
                />
            </div>
            <div className="mt-8">
                <ZScoresLineChart
                    childrenId={props.childrenId}
                    chartType={1}
                    alias="Altura"
                />
            </div>
            <div className="mt-8">
                <ZScoresLineChart
                    childrenId={props.childrenId}
                    chartType={2}
                    alias="Perímetro Cefálico"
                />
            </div>
        </div>
    )
}