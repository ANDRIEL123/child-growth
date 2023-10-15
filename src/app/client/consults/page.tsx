'use client'

import Header from "@/components/Header";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { httpGet } from "@/services";
import { formatDate } from "@/utils/date";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ConsultsPage() {
    const [consults, setConsults] = useState<any[]>()
    const { get } = useSearchParams()
    const userId = get('userId')

    useEffect(() => {
        async function fetchData() {
            const response = await httpGet('PatientConsultation/GetConsultsByUserId', {
                userId
            })

            setConsults(response.content)
        }

        fetchData()
    }, [])

    return (
        <>
            <Header />
            {
                consults?.map(item => (
                    <Card key={item.id}>
                        <CardHeader>
                            <CardTitle>{`Consulta do dia ${formatDate(item.date)}`}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {item.observations}
                        </CardContent>
                    </Card>
                ))
            }
        </>
    )
}