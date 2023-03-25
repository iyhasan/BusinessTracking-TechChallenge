import axios from './axios-wrapper';
import { apiUrl } from '.';

export const GETUserCountMetrics = () => {

    return axios.get(
        `${apiUrl}admins/count-metrics`
    )

}