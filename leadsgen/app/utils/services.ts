import axios from "axios";
import { Lead } from "../Routes/Dashboard/Lead/page";
import { backendUrl } from "./globalVariables";

export const addLeads = (url: string, data: Lead) => {
    return axios.post(url, data)
}
export const getLeads = () => {
    return axios.get(`${backendUrl}/get-leads`)
}
export const deleteLead = (item: string) => {
    return axios.get(`${backendUrl}/delete-leads/${item}`)
}
export const editLead = (id: string, item: Lead) => {
    return axios.post(`${backendUrl}/edit-lead/${id}`, item)

}