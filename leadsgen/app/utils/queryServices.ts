import { useMutation, useQuery } from "@tanstack/react-query";
import { addLeads, deleteLead, editLead, getLeads, login, register } from "./services";
import { Lead } from "../Routes/Dashboard/Lead/page";
import { RegisterFormData } from "../Auth/register/page";
import { loginType } from "../Auth/login/page";

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
export const useEditLead = () =>
    useMutation({
        mutationKey: ["leads"],
        mutationFn: ({ id, data }: { id: string, data: Lead }) => editLead(id, data),
    });

// Auth
export const useRegister = () => useMutation({
    mutationKey: ["user"],
    mutationFn: ({ data }: { data: RegisterFormData }) => register(data)
});
export const useLogin = () => useMutation({
    mutationKey: ["user"],
    mutationFn: ({ data }: { data: loginType }) => login(data)
});