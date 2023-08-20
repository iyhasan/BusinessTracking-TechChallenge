import axios from "./axios-wrapper";
import { apiUrl } from ".";

const subURL: string = `${apiUrl}company/`

export const GETCompanies = () => {
    return axios.get(
        `${subURL}`,
    )
};

export const GETCompanyByID = (company_id: string) => {
    return axios.get(
        `${subURL}${company_id}`
    )
}