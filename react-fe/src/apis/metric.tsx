import axios from "./axios-wrapper";
import { apiUrl } from ".";

const subURL: string = `${apiUrl}metric/`

export const GETLatestMetric = (company_id: string) => {
    return axios.get(
        `${subURL}latest/company/${company_id}`
    )
}

export const GETMetricsForCompany = (company_id: string) => {
    return axios.get(
        `${subURL}company/${company_id}`
    )
}

export const GETSnapshotByID = (snapshot_id: string) => {
    return axios.get(
        `${subURL}snapshot/${snapshot_id}`
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

export const GETMetricTypes = () => {
    return axios.get(`${subURL}types`)
}

export const GETEntriesForSnapshot = (snapshot_id: string) => {
    return axios.get(`${subURL}entries/by-snapshot/${snapshot_id}`)
}

export const PUTMetricEntry = (snapshot_id: string, metric_type_id: number, payload: any) => {
    return axios.put(`${subURL}entries/${snapshot_id}/${metric_type_id}`, payload)
}

export const POSTMetricEntry = (payload: any) => {
    return axios.post(`${subURL}entries`, payload)
}