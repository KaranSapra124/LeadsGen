"use client";
import { useGetLead } from "@/app/utils/queryServices";
import React, { useEffect, useState } from "react";
import {
    LineChart,
    Line,
    BarChart,
    Bar,
    AreaChart,
    Area,
    Tooltip,
    ResponsiveContainer,
    XAxis,
    YAxis,
    CartesianGrid,
} from "recharts";
import { Lead } from "./Lead/page";

const LeadsChartPage = () => {
    const { data: leads } = useGetLead();
    const [filteredLeads, setFilteredLeads] = useState(0);
    const [hotLeads, setHotLeads] = useState(0);
    const [monthlyActiveData, setMonthlyActiveData] = useState<any[]>([]);

    useEffect(() => {
        if (!leads?.data?.leads) return;

        const sum =
            leads?.data?.leads?.reduce((acc: number, lead: Lead) => {
                return lead?.status === "Active" ? acc + 1 : acc;
            }, 0) || 0;

        setFilteredLeads(sum);

        const hotLeadsCount =
            leads?.data?.leads?.reduce((acc: number, lead: Lead) => {
                if (lead?.leadScore && lead?.leadScore >= 8) return acc + 1;
                return acc;
            }, 0) || 0;

        setHotLeads(hotLeadsCount);

        // ------------------ 🧮 Group by Month ------------------
        const monthlyMap: Record<string, number> = {
            Jan: 0,
            Feb: 0,
            Mar: 0,
            Apr: 0,
            May: 0,
            Jun: 0,
            Jul: 0,
            Aug: 0,
            Sep: 0,
            Oct: 0,
            Nov: 0,
            Dec: 0
        };

        leads.data.leads.forEach((lead: Lead) => {
            if (lead?.createdAt) {
                const date = new Date(lead.createdAt);
                const monthName = date.toLocaleString("default", { month: "short" }); // e.g., "Jan"
                monthlyMap[monthName] = (monthlyMap[monthName] || 0) + 1;
            }
        });

        const formattedMonthlyData = Object.keys(monthlyMap).map((month) => ({
            month,
            active: monthlyMap[month],
        }));

        setMonthlyActiveData(formattedMonthlyData);
    }, [leads]);

    // --- Mock Data for static trends ---
    const totalLeadsData = [
        { day: "Mon", leads: 5 },
        { day: "Tue", leads: 12 },
        { day: "Wed", leads: 18 },
        { day: "Thu", leads: 22 },
        { day: "Fri", leads: 25 },
    ];

    const hotLeadsData = [
        { day: "Mon", hot: 1 },
        { day: "Tue", hot: 3 },
        { day: "Wed", hot: 2 },
        { day: "Thu", hot: 5 },
        { day: "Fri", hot: 4 },
    ];

    return (
        <div className="p-2 max-h-screen overflow-y-scroll flex flex-col">
            {/* ======================= WIDGETS SECTION ======================= */}
            <div className="grid md:grid-cols-3 grid-cols-1 gap-3 mb-2">
                {/* Total Leads */}
                <div className="bg-gradient-to-br from-green-50 to-white border border-green-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all rounded-lg p-2 flex flex-col items-center justify-center">
                    <div className="flex items-center space-x-2 text-[rgb(0,52,43)]">
                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                            <path
                                fill="currentColor"
                                d="M4 22.93a4 4 0 1 1 0-8a4 4 0 0 1 0 8m19.464-6.001l-8-13.857a4 4 0 0 0-6.93 4l8.001 13.857a4.001 4.001 0 0 0 6.93-4"
                            />
                        </svg>
                        <h1 className="text-gray-700 text-sm font-semibold uppercase tracking-wide">
                            Total Leads
                        </h1>
                    </div>
                    <p className="text-3xl font-bold text-[rgb(0,52,43)] mt-2">
                        {leads?.data?.leads?.length || 0}
                    </p>
                </div>
                {/* Hot Leads */}
                <div className="bg-gradient-to-br from-red-50 to-white border border-red-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all rounded-lg p-2 flex flex-col items-center justify-center">
                    <div className="flex items-center space-x-2 text-red-600">
                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                            <path
                                fill="currentColor"
                                d="M12.832 21.801c3.126-.626 7.168-2.875 7.168-8.69c0-5.291-3.873-8.815-6.658-10.434c-.619-.36-1.342.113-1.342.828v1.828c0 1.442-.606 4.074-2.29 5.169c-.86.559-1.79-.278-1.894-1.298l-.086-.838c-.1-.974-1.092-1.565-1.87-.971C4.461 8.46 3 10.33 3 13.11C3 20.221 8.289 22 10.933 22q.232 0 .484-.015C10.111 21.874 8 21.064 8 18.444c0-2.05 1.495-3.435 2.631-4.11c.306-.18.663.055.663.41v.59c0 .45.175 1.155.59 1.637c.47.546 1.159-.026 1.214-.744c.018-.226.246-.37.442-.256c.641.375 1.46 1.175 1.46 2.473c0 2.048-1.129 2.99-2.168 3.357"
                            />
                        </svg>
                        <h1 className="text-gray-700 text-sm font-semibold uppercase tracking-wide">
                            Hot Leads
                        </h1>
                    </div>
                    <p className="text-3xl font-bold text-red-600 mt-2">{hotLeads || 0}</p>
                </div>
                {/* Active Leads */}
                <div className="bg-gradient-to-br from-emerald-50 to-white border border-emerald-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all rounded-lg p-2 flex flex-col items-center justify-center">
                    <div className="flex items-center space-x-2 text-green-700">
                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                            <circle cx={12} cy={9} r={4} fill="currentColor" />
                            <circle cx={17} cy={9} r={3} fill="currentColor" />
                            <circle cx={7} cy={9} r={3} fill="currentColor" />
                        </svg>
                        <h1 className="text-gray-700 text-sm font-semibold uppercase tracking-wide">
                            Active Leads
                        </h1>
                    </div>
                    <p className="text-3xl font-bold text-green-700 mt-2">{filteredLeads || 0}</p>
                </div>


            </div>

            {/* ======================= ACTIVE LEADS CHART (Month-wise) ======================= */}
            <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm mb-2">
                <h2 className="text-lg font-bold text-blue-800 mb-3">
                    Active Leads (Month-wise)
                </h2>
                <div className="h-52">
                    <ResponsiveContainer width="100%" height="100%" className={"overfow-x-scroll"}>
                        <BarChart data={monthlyActiveData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="active" fill="oklch(42.4% 0.199 265.638)" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* ======================= OTHER CHARTS SECTION ======================= */}
            <div className="grid md:grid-cols-2 grid-cols-1 gap-2">
                {/* Total Leads Trend */}
                <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                    <h2  className="text-lg font-bold text-blue-800 mb-3">
                        Total Leads Trend
                    </h2>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={totalLeadsData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                <XAxis dataKey="day" />
                                <YAxis />
                                <Tooltip />
                                <Line type="monotone" dataKey="leads" stroke="oklch(42.4% 0.199 265.638)" strokeWidth={2} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Hot Leads Insights */}
                <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                    <h2 className="text-lg font-semibold text-red-700 mb-3">Hot Leads Insights</h2>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={hotLeadsData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                <XAxis dataKey="day" />
                                <YAxis />
                                <Tooltip />
                                <Area type="monotone" dataKey="hot" stroke="#DC2626" fill="#FCA5A5" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LeadsChartPage;
