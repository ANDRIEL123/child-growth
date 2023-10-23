import { Chart } from 'react-google-charts'

type BarChartProps = {
    data: any[],
    options: OptionsProps,
    width?: string,
    height?: string
}

type OptionsProps = {
    title: string,
    subTitle?: string
}

export function BarChart(props: BarChartProps) {
    const {
        data,
        options,
        width = "90%",
        height = "500px"
    } = props

    return (
        <Chart
            chartType='Bar'
            width={width}
            height={height}
            data={data}
            options={{
                chart: options
            }}
        />
    )
}