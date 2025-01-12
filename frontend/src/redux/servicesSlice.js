import { createSlice } from "@reduxjs/toolkit";

const servicesSlice = createSlice({
    name: "services",
    initialState: {
        singleServices: null,
        services: [], 
        searchServicesByText: "", 
    },
    reducers: {
        setSingleServices: (state, action) => {
            state.singleServices = action.payload;
        },
        setServices: (state, action) => {
            state.services = action.payload;
        },
        setSearchServicesByText: (state, action) => {
            state.searchServicesByText = action.payload;
        },
    },
});

export const { setSingleServices, setServices,  setSearchServicesByText } = servicesSlice.actions;
export default servicesSlice.reducer;
