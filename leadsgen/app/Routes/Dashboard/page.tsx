"use client"
import { useGetLead } from '@/app/utils/queryServices';
import React, { useEffect, useState } from 'react'
import { Lead } from './Lead/page';

const LeadsChartPage = () => {

    const { data: leads, isLoading } = useGetLead();
    const [filteredLeads, setFilteredLeads] = useState(0)
    useEffect(() => {
        const sum = leads?.data?.leads?.reduce((acc: number, lead: Lead) => {
            return lead?.status === "Active" && acc + 1
        }, 0)
        setFilteredLeads(sum)
    }, [leads])
    return (
        <>
            <div>
                <h1>Total Leads</h1>
                <p>{leads?.data?.leads?.length}</p>
            </div>
            <div>
                <h1>Active Leads</h1>
                <p>{filteredLeads}</p>
            </div>
        </>
    )
}

export default LeadsChartPage