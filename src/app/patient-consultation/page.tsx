'use client'

import { DataTable } from "@/components/DataTable"
import Header from "@/components/Header"
import { httpGet } from "@/services"
import { Typography } from "@mui/material"
import { head } from "lodash"
import { useRouter, useSearchParams } from "next/navigation"
import { Suspense, useEffect, useState } from "react"
import { columns } from "./columns"
import Form from "./form"
import { schema } from './form/schema'

const PatientConsultationPage = () => {
    const { get } = useSearchParams();
    const router = useRouter()
    const [patient, setPatient] = useState<any>(null)
    const childrenId = get('id')

    async function fetchData() {
        const patientData = await httpGet('/children/getbyfilters', {
            filters: JSON.stringify([
                { PropertyName: 'Id', Operation: 'Equals', Value: childrenId }
            ])
        })

        setPatient(head(patientData))
    }

    useEffect(() => {
        if (childrenId) {
            fetchData()
        } else {
            router.push('/children')
        }
    }, [])

    return (
        <>
            <Header />
            <Typography className="ml-5 mt-5 text-2xl text-center">
                {'Gerenciamento de Consultas do Paciente: '}
                <b>{patient?.name}</b>
            </Typography>
            <Suspense fallback={<p>Carregando...</p>}>
                <DataTable
                    columns={columns}
                    searchFor="name"
                    endpoint="/PatientConsultation"
                    endpointGet="/PatientConsultation/GetByFilters"
                    endpointGetParams={
                        {
                            filters: JSON.stringify([
                                { PropertyName: 'ChildrenId', Operation: 'Equals', Value: childrenId }
                            ])
                        }
                    }
                    form={Form}
                    schema={schema}
                    dialogTitleKey="Consulta"
                />
            </Suspense>
        </>
    )
}

export default PatientConsultationPage