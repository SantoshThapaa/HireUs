import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    admin: null,  // Default value is null, representing that admin data is not yet loaded
};

const authadminSlice = createSlice({
    name: 'authadmin',
    initialState,
    reducers: {
        setAdmin: (state, action) => {
            state.admin = action.payload;  // Set the admin data when dispatched
        },
    },
});

export const { setAdmin } = authadminSlice.actions;
export default authadminSlice.reducer;
