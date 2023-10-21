import { LineChart } from "@/components/Charts/LineChart"
import { httpGet } from "@/services"
import { get } from "lodash"
import { useEffect, useState } from "react"
import { LineChartAverageProps } from "./averageLineChart"

export function LineChartAverageWeight(props: LineChartAverageProps) {
    const [data, setData] = useState<any[]>([])
    const {
        childrenId
    } = props

    useEffect(() => {
        async function fetchData() {
            const response = await httpGet('PatientConsultation/GetComparativeAveragePercentile', {
                childrenId,
                chartType: 0
            }) as any[]

            let finalData = [['Competência', 'Média P50', 'Peso']] as any[]

            response.map(item => {
                let element = []

                for (let property in item) {
                    const value = get(item, property)
                    element.push(value)
                }

                finalData.push(element)
            })

            setData(finalData)
        }

        fetchData()
    }, [])


    return (
        <LineChart
            data={data}
            options={{
                title: 'Peso',
                curveType: "function",
                legend: { position: 'bottom' }
            }}
        />
    )
}