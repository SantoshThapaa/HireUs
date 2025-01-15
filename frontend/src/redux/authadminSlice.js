import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { admin: null },
  reducers: {
    setAdmin(state, action) {
      state.admin = action.payload;
    },
  },
});

export const { setAdmin } = authSlice.actions;
export default authSlice.reducer;
