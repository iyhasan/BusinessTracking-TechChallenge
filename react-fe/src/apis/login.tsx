import axios from "./axios-wrapper";
import { LoginFields } from "../types/login-form";
import { apiUrl } from ".";

export const POSTLogin = (form: LoginFields) => {

    return axios.post(
        `${apiUrl}auth/user`,
        {
            email: form.email,
            password: form.password
        },
    )
};
