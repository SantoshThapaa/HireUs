import { createSlice } from "@reduxjs/toolkit";

const servicesSlice = createSlice({
    name: "services",
    initialState: {
        services: [], // Initialize services as an empty array
        singleServices: null,
        searchServicesByText: "", // Add this to the initial state
    },
    reducers: {
        // Action to set the list of services
        setServices: (state, action) => {
            state.services = action.payload;
        },
        // Action to set a single service
        setSingleServices: (state, action) => {
            state.singleServices = action.payload;
        },
        // Action to update the search text
        setSearchServicesByText: (state, action) => {
            state.searchServicesByText = action.payload;
        },
    },
});

export const { setServices, setSingleServices, setSearchServicesByText } = servicesSlice.actions;
export default servicesSlice.reducer;
