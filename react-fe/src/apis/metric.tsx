import axios from "./axios-wrapper";
import { apiUrl } from ".";

const subURL: string = `${apiUrl}metric/`

export const GETLatestMetric = (company_id: string) => {
    return axios.get(
        `${subURL}latest/company/${company_id}`
    )
}

export const POSTMetricSnapshot = (company_id: string) => {
    return axios.post(
        `${subURL}company/${company_id}`
    )
}

export const PUTMetricSnapshot = (metric_snapshot_id: string, new_body: any) => {

    return axios.put(
        `${subURL}snapshot/${metric_snapshot_id}`,
        new_body
    )
}