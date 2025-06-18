import { createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../services/authSlice";

// Define the expected structure of loginDetails
interface LoginDetails {
    username: string;
    password: string;
    isClint: boolean;
    host: string;
}

// Define the response structure (adjust based on your API response)
interface LoginResponse {
    token: string;
    userInfo: any; // Replace 'any' with the appropriate type if available
}

// Define the error response structure
interface ErrorResponse {
    message: string;
}

// Define the ThunkAction
export const loginUser = createAsyncThunk<LoginResponse, LoginDetails, { rejectValue: ErrorResponse }>(
    "user/login",
    async (loginDetails: any, { rejectWithValue }) => {
        try {
            console.log(loginDetails, "loginDetails");
            const response = await authService.login(loginDetails);
            localStorage.setItem("token", JSON.stringify(response?.data?.token))
            console.log(response.data, "Response from login");
            return response.data;
        } catch (error: any) {
            console.log(error.response?.data, "Error during login");
            return rejectWithValue(error.response?.data as ErrorResponse);
        }
    }
);
