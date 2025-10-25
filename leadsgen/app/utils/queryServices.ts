import { useMutation, useQuery } from "@tanstack/react-query";
import { addLeads, deleteLead, getLeads } from "./services";
import { Lead } from "../Routes/Dashboard/Lead/page";

interface AddLeadProps {
    url: string;
    item: Lead;
}

export const useAddLead = () =>
    useMutation({
        mutationKey: ["leads"],
        mutationFn: ({ url, item }: AddLeadProps) => addLeads(url, item),
    });
export const useGetLead = () =>
    useQuery({
        queryKey: ["leads"],
        queryFn: getLeads
    });
export const useDeleteLead = () =>
    useMutation({
        mutationKey: ["leads"],
        mutationFn: ({ id }: { id: string }) => deleteLead(id),
    });