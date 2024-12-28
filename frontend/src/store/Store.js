import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../slice/authSlice"; //this might give error if then remove brackets
import opportunitySlice from "../slice/opportunitySlice";

export const store = configureStore({
    reducer: {
        auth: authSlice,
        opp: opportunitySlice,
    },
});