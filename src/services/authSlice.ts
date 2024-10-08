import { createSlice } from "@reduxjs/toolkit";
import { userLogin } from "./authActions";

const initialState: AuthState = {
    loading: false,
    userInfo: null,
    userToken: null,
    error: null,
    success: false
}

// Define the types for the user information and error
interface UserInfo {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    avatar: string;
    userToken: string;
}

interface AuthState {
    loading: boolean;
    userInfo: UserInfo | null;
    userToken: string | null;
    error: string | null;
    success: boolean;
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            localStorage.removeItem('userToken') // deletes token from storage
            state.loading = false
            state.userInfo = null
            state.userToken = null
            state.error = null
        },
    },
    extraReducers: (builder) => {
        builder.addCase(userLogin.pending, (state) => {
            state.loading = true
            state.error = null
        },);
        builder.addCase(userLogin.fulfilled, (state, action) => {
            state.loading = false
            state.userInfo = action.payload
            state.userToken = action.payload.token
        },);
        builder.addCase(userLogin.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Unknown error";
        });
    }
})

export default authSlice.reducer
export const { logout } = authSlice.actions