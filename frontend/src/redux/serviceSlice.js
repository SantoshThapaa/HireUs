import { createSlice } from "@reduxjs/toolkit";

const serviceSlice = createSlice({
    name: "service",
    initialState: {
        singleService: null,
        searchServiceByText: "", // Add this to the initial state
    },
    reducers: {
        // Action to set the single service
        setSingleService: (state, action) => {
            state.singleService = action.payload;
        },
        // Action to update the search text
        setSearchServiceByText: (state, action) => {
            state.searchServiceByText = action.payload;
        },
    },
});

export const { setSingleService, setSearchServiceByText } = serviceSlice.actions;
export default serviceSlice.reducer;
