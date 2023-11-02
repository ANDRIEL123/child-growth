import { Chart } from 'react-google-charts'

type LineChartProps = {
    data: any[],
    options: OptionsProps,
    width?: string,
    height?: string
}

type OptionsProps = {
    title: string,
    curveType: string,
    legend: object
}

export function LineChart(props: LineChartProps) {
    const {
        data,
        options,
        width = "100%",
        height = "600px"
    } = props

    return (
        <Chart
            chartType='Line'
            width={width}
            height={height}
            data={data}
            options={{
                ...options,
                chart: {
                    title: options.title
                }
            }}
        />
    )
}