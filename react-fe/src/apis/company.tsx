import axios from "./axios-wrapper";
import { apiUrl } from ".";

export const GETCompanies = () => {
    return axios.get(
        `${apiUrl}company/`,
    )
};
