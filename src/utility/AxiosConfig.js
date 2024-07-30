// ** Axios
import axios from 'axios';

// ** Utils
import { getAccessToken, getCurrentUser, logoutCurrentUser } from "./Utils";

const restApiUrl = process.env?.REACT_APP_DEV_NET_API_HOSTNAME || "";

const instance = axios.create({
    baseURL: `${restApiUrl}`
});

// For GET requests
instance.interceptors.request.use((req) => {
    const currentUser = getCurrentUser();
    const token = getAccessToken();
    if (currentUser && currentUser._id && token) {
        // req.headers({'x-access-token' : `${token}`});
        req.headers['x-access-token'] = token;
    }

    // Add configurations here
    return req;
}, (err) => {
    return Promise.reject(err);
})

// For POST requests
instance.interceptors.response.use((res) => {
    // Add configurations here
    if (res.status === 201) {
        console.log('Posted Successfully');
    }

    return res
}, (error) => {
    const { status } = error.response;
    if (status === 401) {
        logoutCurrentUser();
        window.location.reload();
    }

    return Promise.reject(error);
})

export default instance;
