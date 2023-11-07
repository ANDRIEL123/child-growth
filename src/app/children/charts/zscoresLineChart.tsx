import { LineChart } from "@/components/Charts/LineChart"
import { httpGet } from "@/services"
import { get } from "lodash"
import { useEffect, useState } from "react"

type ZScoresProps = {
    childrenId: number,
    chartType: number,
    alias: string
}

export function ZScoresLineChart(props: ZScoresProps) {
    const [data, setData] = useState<any[]>([])
    const {
        childrenId,
        chartType,
        alias
    } = props

    useEffect(() => {
        async function fetchData() {
            const response = await httpGet('PatientConsultation/GetZSCoresData', {
                childrenId,
                chartType
            }) as any[]

            let finalData = [[
                'Meses de vida',
                'Escore-z -3',
                'Escore-z -2',
                'Escore-z -1',
                'Escore-z 0',
                'Escore-z 1',
                'Escore-z 2',
                'Escore-z 3',
                'Paciente'
            ]] as any[]

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
                title: `${alias} x Idade de 0 a 5 anos`,
                curveType: "function",
                legend: {
                    position: 'bottom'
                }
            }}
        />
    )
}