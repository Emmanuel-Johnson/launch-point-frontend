import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type Admin = {
  id: number;
  email: string;
  full_name: string;
  role: "admin";
};

type AdminState = {
  admin: Admin | null;
  isAuthenticated: boolean;
};

const initialState: AdminState = {
  admin: null,
  isAuthenticated: false,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setAdminCredentials: (state, action: PayloadAction<Admin>) => {
      state.admin = action.payload;
      state.isAuthenticated = true;
    },

    clearAdminCredentials: (state) => {
      state.admin = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setAdminCredentials, clearAdminCredentials } =
  adminSlice.actions;

export default adminSlice.reducer;
