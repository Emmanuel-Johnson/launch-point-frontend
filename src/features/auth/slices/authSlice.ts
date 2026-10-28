import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type UserRole = "student" | "instructor" | "admin";

type User = {
  id: number;
  email: string;
  full_name: string;
  role: UserRole;
  profile_image: string | null;
};

type AuthState = {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
};

const initialState: AuthState = {
  user: null,
  accessToken: null,
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

    setAccessToken: (state, action: PayloadAction<string | null>) => {
      state.accessToken = action.payload;
    },

    clearCredentials: (state) => {
      state.user = null;
      state.accessToken = null;
      state.isAuthenticated = false;
    },

    setProfileImage: (state, action: PayloadAction<string | null>) => {
      if (state.user) {
        state.user.profile_image = action.payload;
      }
    },

    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = {
          ...state.user,
          ...action.payload,
        };
      }
    },
  },
});

export const {
  setCredentials,
  setAccessToken,
  clearCredentials,
  setProfileImage,
  updateUser,
} = authSlice.actions;

export default authSlice.reducer;
