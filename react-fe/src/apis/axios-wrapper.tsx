import axios from 'axios';
import { authStore } from '../store';

// Request interceptor
axios.interceptors.request.use(function (config) {

    // Add token as header if token is stored
    const token = authStore.getState().token
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config;

  }, function (error) {

    // Do something with request error
    return Promise.reject(error);

  });

// Response interceptor
axios.interceptors.response.use(function (response) {
    // do nothing in response success
    return response;

  }, function (error) {

    const status = error?.response?.status

    // if unauthorized - log user out and clear token
    if (status == 401) {
        authStore.setState({token: null})
        authStore.getState().logout()
    } 

    return Promise.reject(error);
  });

export default axios;