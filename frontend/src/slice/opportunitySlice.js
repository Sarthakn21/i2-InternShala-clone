import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { fetchOpportunities, postOpportunity, getSingleOpportunity, updateOpportunity, deleteOpportunity, applyToOpportunity } from "../actions/opportunityActions";

// Fetch all opportunities (jobs and internships)

// Opportunity Slice
const opportunitySlice = createSlice({
    name: 'opportunities',
    initialState: {
        opportunities: [],
        currentOpportunity: null,
        loading: false,
        error: null,
        message: null,
    },
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        clearMessage: (state) => {
            state.message = null;
        },
    },
    extraReducers: (builder) => {
        // Fetch Opportunities
        builder.addCase(fetchOpportunities.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
            .addCase(fetchOpportunities.fulfilled, (state, action) => {
                state.opportunities = action.payload;
                state.loading = false;
                state.message = "Opportunities fetched successfully!";
            })
            .addCase(fetchOpportunities.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Post Opportunity
            .addCase(postOpportunity.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(postOpportunity.fulfilled, (state, action) => {
                state.opportunities.push(action.payload); // Add the new opportunity to the list
                state.loading = false;
                state.message = "Opportunity posted successfully!";
            })
            .addCase(postOpportunity.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(applyToOpportunity.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(applyToOpportunity.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;

                // Update the applicants list for the opportunity
                const opportunity = state.opportunities.find(
                    (opp) => opp._id === action.payload.application.opportunity
                );
                if (opportunity) {
                    opportunity.applicants.push(action.payload.application.student);
                }
            })
            .addCase(applyToOpportunity.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message || 'Failed to apply for opportunity';
            })

            // Get Single Opportunity
            .addCase(getSingleOpportunity.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getSingleOpportunity.fulfilled, (state, action) => {
                state.currentOpportunity = action.payload;
                state.loading = false;
            })
            .addCase(getSingleOpportunity.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Update Opportunity
            .addCase(updateOpportunity.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateOpportunity.fulfilled, (state, action) => {
                const index = state.opportunities.findIndex(
                    (opp) => opp._id === action.payload._id
                );
                if (index !== -1) {
                    state.opportunities[index] = action.payload;
                }
                state.loading = false;
                state.message = "Opportunity updated successfully!";
            })
            .addCase(updateOpportunity.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Delete Opportunity
            .addCase(deleteOpportunity.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteOpportunity.fulfilled, (state, action) => {
                state.opportunities = state.opportunities.filter(
                    (opportunity) => opportunity._id !== action.payload
                );
                state.loading = false;
                state.message = "Opportunity deleted successfully!";
            })
            .addCase(deleteOpportunity.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    },
});

// Export actions
export const { clearError, clearMessage } = opportunitySlice.actions;

// Export reducer
export default opportunitySlice.reducer;
