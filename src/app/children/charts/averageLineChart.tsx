import { LineChartAverageCephalicPerimeter } from "./averageCephalicPerimeterLineChart"
import { LineChartAverageHeight } from "./averageHeightLineChart"
import { LineChartAverageWeight } from "./averageWeightLineChart"

export type LineChartAverageProps = {
    childrenId: number
}

export function AverageLineChart(props: LineChartAverageProps) {
    return (
        <div className="flex flex-col">
            <LineChartAverageWeight
                childrenId={props.childrenId}
            />
            <LineChartAverageHeight
                childrenId={props.childrenId}
            />
            <LineChartAverageCephalicPerimeter
                childrenId={props.childrenId}
            />
        </div>
    )
}