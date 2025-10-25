import { useMutation } from "@tanstack/react-query";
import { addLeads } from "./services";
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
