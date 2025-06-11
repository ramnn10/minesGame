import { apiCall } from "../../config/HTTP";

// Define the structure of the login details
interface LoginDetails {
    username: string;
    password: string;
    isClint: boolean;
    host: string;
}

// Define the structure of the API response (adjust based on your API)
interface ApiResponse {
    data: any; // Replace 'any' with the appropriate type for the response data
}

// Define the authService with the login method
const authService = {
    login: async (loginDetails: LoginDetails): Promise<any> => { // Replace 'any' with the appropriate type for the return data
        try {
            console.log(loginDetails, "loginDetails received");

            const response: ApiResponse = await apiCall('POST', 'auth/login', loginDetails);
            return response.data;
        } catch (error: any) {
            console.error('Login failed:', error.data);
            throw error;
        }
    },
};

export default authService;
