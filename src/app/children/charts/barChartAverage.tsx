import { BarChart } from "@/components/Charts/BarChart"
import { httpGet } from "@/services"
import { get } from "lodash"
import { useEffect, useState } from "react"
import { BarChartAverageProps } from "./barChartAverageContainer"

export function BarChartAverage(props: BarChartAverageProps) {
    const [data, setData] = useState<any[]>([])
    const {
        childrenId,
        alias,
        chartType
    } = props

    useEffect(() => {
        async function fetchData() {
            const response = await httpGet('PatientConsultation/GetComparativeAveragePercentile', {
                childrenId,
                chartType
            }) as any[]

            let finalData = [['Meses de vida', 'Média P50', alias]] as any[]

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
        <BarChart
            data={data}
            options={{
                title: alias
            }}
        />
    )
}