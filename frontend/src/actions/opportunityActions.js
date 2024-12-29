import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchOpportunities = createAsyncThunk(
    'opportunities/fetchOpportunities',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/opportunity/getall`);
            return response.data.opportunities;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Error fetching opportunities");
        }
    }
);

// Post an opportunity (job or internship)
export const postOpportunity = createAsyncThunk(
    'opportunities/postOpportunity',
    async (opportunityData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/opportunity/create`, opportunityData);
            return response.data.opportunity;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Error posting opportunity");
        }
    }
);

// Get a single opportunity by ID
export const getSingleOpportunity = createAsyncThunk(
    'opportunities/getSingleOpportunity',
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/opportunity/${id}`);
            return response.data.opportunity;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Error fetching opportunity");
        }
    }
);

// Update an opportunity
export const updateOpportunity = createAsyncThunk(
    'opportunities/updateOpportunity',
    async ({ id, opportunityData }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/opportunnity/${id}`, opportunityData);
            return response.data.opportunity;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Error updating opportunity");
        }
    }
);

// Delete an opportunity
export const deleteOpportunity = createAsyncThunk(
    'opportunities/deleteOpportunity',
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/opportunity/${id}`, {withCredentials: true});
            return id;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Error deleting opportunity");
        }
    }
);

export const applyToOpportunity = createAsyncThunk(
    'opportunities/apply',
    async ({ opportunityId, applicationData }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/opportunity/apply/${opportunityId}`, applicationData, { withCredentials: true });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: error.message });
        }
    }
);

export const fetchOppToRecruiter = createAsyncThunk('oppToRecruiter ', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/opportunity/recruiter`, {
            withCredentials: true,
        });
        
        return response.data.opportunities;
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})