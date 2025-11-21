import axios from "axios";
import { Lead } from "../Routes/Dashboard/Lead/page";
import { backendUrl } from "./globalVariables";
import { RegisterFormData } from "../Auth/register/page";
import { loginType } from "../Auth/login/page";

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
export const generateFollowUp = (msg: string) => {
    return axios.post(`${backendUrl}/ai/follow-up`, { aiMessage: msg })
}

// Auth Routes
export const register = (item: RegisterFormData) => {
    return axios.post(`${backendUrl}/auth/register`, item)
}
export const login = (item: loginType) => {
    return axios.post(`${backendUrl}/auth/login`, item)
}