import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type UserRole = "student" | "instructor" | "admin";

type User = {
  id: number;
  email: string;
  full_name: string;
  role: UserRole;
  profile_image: string | null;
};

type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
};

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },

    clearCredentials: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },

    setProfileImage: (state, action: PayloadAction<string | null>) => {
      if (state.user) {
        state.user.profile_image = action.payload;
      }
    },
  },
});

export const { setCredentials, clearCredentials, setProfileImage } =
  authSlice.actions;

export default authSlice.reducer;
