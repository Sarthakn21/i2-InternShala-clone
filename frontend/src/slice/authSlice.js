import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser, logoutUser,registerUser } from "../actions/authActions";
const localItem = localStorage.getItem("authUser");
const initialState = {
    user: localItem ? JSON.parse(localItem) : null,
    adminuser: [],
    isAuthenticated: localItem ? true : false,
    loading: false,
    error: null,
    message: null,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        authClearError: (state, action) => {
            // state.loading = false;
            state.error = null;
            state.success = false;
        },
        authcustomadd: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
            state.loading = false;
            state.error = null;
            state.message = null;
            state.success = true;
            localStorage.setItem("authUser", JSON.stringify(action.payload));
        }

    },
    extraReducers: (builder) => {
        builder.addCase(loginUser.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.success = false;
        })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.user = action.payload;
                state.isAuthenticated = true;
                state.loading = false;
                state.error = null;
                state.message = null;
                state.success = true;
                localStorage.setItem("authUser", JSON.stringify(action.payload));
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
                state.isAuthenticated = false;
                state.user = null;
                state.message = action.payload.message;
                // console.log("error occured", action.payload);

                console.log("inrejectd user", action.payload)
            })
            .addCase(logoutUser.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(logoutUser.fulfilled, (state, action) => {
                state.user = null;
                state.isAuthenticated = false;
                state.loading = false;
                state.error = null;
                state.message = "Logout successfull";
                localStorage.removeItem("authUser");
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
                state.message = action.payload.message;
            })
            .addCase(registerUser.pending, (state, action) => {
                state.loading = true;
                state.error = null;
                state.message = null;
                state.isAuthenticated = false;
                state.user = null;
                // console.log("in register user pending state")
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.user = action.payload;
                state.isAuthenticated = true;
                state.loading = false;
                state.error = null;
                state.message = action.payload.message;
                localStorage.setItem("authUser", JSON.stringify(action.payload));
                // console.log("in register user fulfilled state")
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
                state.message = action.payload.message;
                state.isAuthenticated = false;
                state.user = null;
                console.log("in register user rejected state", action.payload);
            })

    },
});
export const { authClearError, authcustomadd } = authSlice.actions;
export default authSlice.reducer;