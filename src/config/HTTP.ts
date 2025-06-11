import axios, { AxiosResponse } from "axios";

export const constApi = {
    BACKEND_URL: 'https://api.plx99.com/v1/',
    // BACKEND_URL: 'https://api.tvs99.com/v1/',
    SOCKET_URL: 'https://api.tvs99.com/',
};

interface User {
    token: string;
}

function authHeader(): Record<string, string> {
    const user: User | null = JSON.parse(localStorage.getItem('user_id') || 'null');
    if (user && user.token) {
        return { 'Authorization': 'Bearer ' + user.token };
    } else {
        return {};
    }
}

export const apiCall = async (
    method: 'GET' | 'POST' | 'PUT' | 'DELETE', 
    path: string, 
    payload?: any
)  => {
    try {
        const response = await axios({
            method,
            url: constApi.BACKEND_URL + path,
            data: payload,
            headers: {
                'Content-Type': 'application/json',
                ...authHeader(),
            },
        });

        return response.data;
    } catch (error: any) {
        if (error?.response?.data?.code === 3 || error?.response?.status === 401) {
            localStorage.clear();
            window.location.href = '/signin';
        } else if (error.response) {
            throw error.response;
        } else if (error.request) {
            throw new Error('No response received from the server');
        } else {
            console.error(error, "Error occurred during request setup");
            throw new Error(error.message);
        }
    }
};
