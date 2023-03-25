import axios from "./axios-wrapper";
import { apiUrl } from ".";

export const GETProfile = () => {
    return axios.get(
        `${apiUrl}admins/me`,
    )
};
