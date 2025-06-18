import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loginUser } from "../action/authAction";

interface AuthState {
    isLoggedIn: boolean;
    userInfo: any; 
    isLoading: boolean;
    token: string;
    message: string;
    isError: string;
}

const initialState: AuthState = {
    isLoggedIn: false,
    userInfo: null,
    isLoading: false,
    token: '',
    message: '',
    isError: ''
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action: PayloadAction<{ userInfo: any }>) => { 
            state.isLoggedIn = true;
            state.userInfo = action.payload.userInfo;
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.userInfo = null;
        }
    },
   
    
    
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
