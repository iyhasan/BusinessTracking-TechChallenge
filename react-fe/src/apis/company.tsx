import axios from "./axios-wrapper";
import { apiUrl } from ".";

const subURL: string = `${apiUrl}company/`

export const GETCompanies = () => {
    return axios.get(
        `${subURL}`,
    )
};

export const POSTCompany = (payload: any) => {
    return axios.post(
        `${subURL}`, payload
    )
}

export const GETCompanyByID = (company_id: string) => {
    return axios.get(
        `${subURL}${company_id}`
    )
}

export const GETIndustries = () => {
    return axios.get(
        `${subURL}industries`
    )
}

export const POSTCompanyIndustries = (company_id: string, payload: any) => {
    return axios.post(
        `${subURL}industries/${company_id}`, payload
    )
}

export const GETBusinessModels = () => {
    return axios.get(
        `${subURL}business-models`
    )
}

export const POSTCompanyBusinessModels = (company_id: string, payload: any) => {
    return axios.post(
        `${subURL}business-models/${company_id}`, payload
    )
}