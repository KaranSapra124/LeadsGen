import axios from "axios";
import { Lead } from "../Routes/Dashboard/Lead/page";

export const addLeads = (url: string, data: Lead) => {
    return axios.post(url, data)
}