import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

export const loginUser = createAsyncThunk('loginUser', async (credentials, { rejectWithValue }) => {
    try {
        console.log(credentials)
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/users/login`, credentials, {
            withCredentials: true
        })
        return response.data.user
    } catch (error) {
        console.log(error)
        return rejectWithValue(error.response.data)
    }
})
export const logoutUser = createAsyncThunk('logoutUser', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/users/logout`, {
            withCredentials: true
        })
        // console.log("logout response", response.data)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const registerUser = createAsyncThunk('registerUser', async (credentials, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/users/register`, credentials, {
            withCredentials: true
        })
        return response.data.user
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})
export const getCurrentUser = createAsyncThunk('getCurrentUser', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/users/getcurrentuser`, {
            withCredentials: true
        })
        console.log("current user response", response.data.user)
        return response.data.user
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})
