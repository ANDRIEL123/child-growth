import { LineChart } from "@/components/Charts/LineChart"
import { httpGet } from "@/services"
import { get } from "lodash"
import { useEffect, useState } from "react"

type LineChartComparativeProps = {
    childrenId: number
}

export function LineChartComparative(props: LineChartComparativeProps) {
    const [data, setData] = useState<any[]>([])
    const {
        childrenId
    } = props

    useEffect(() => {
        async function fetchData() {
            const response = await httpGet('PatientConsultation/GetGraphComparativeData', {
                childrenId
            }) as any[]

            let finalData = [['Data', 'Perímetro Cefálico', 'Altura', 'Peso']] as any[]

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
                title: '',
                curveType: "function",
                legend: { position: 'bottom' }
            }}
        />
    )
}