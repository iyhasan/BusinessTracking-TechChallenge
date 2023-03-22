import axios from "axios";
import { LoginFields } from "../types/login-form";
import { apiUrl } from ".";

export const POSTLogin = (form: LoginFields) => {
    console.log('Email:', form.email);
    console.log('Password:', form.password);

    return axios.post(
        `${apiUrl}users/token`,
        {
            email: form.email,
            password: form.password
        },
    )
};
