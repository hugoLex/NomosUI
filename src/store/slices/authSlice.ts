import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import Cookies from "js-cookie";
// this handles user and token, might be removed in the future 
interface User {
  full_name: string;
  organization: string;
  email: string;
  phone: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
}

interface SetCredentialsPayload {
  user?: User | null;
  access_token: string;
}

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    // use this to persist the token in cookies
    // token: Cookies.get("access_token") as string,
  } as AuthState,
  reducers: {
    setCredentials: (state, action: PayloadAction<SetCredentialsPayload>) => {
      const { user, access_token } = action.payload;
      if (user) {
        state.user = user;
      }
      state.token = access_token;
      // use this to persist the token in cookies
      // state.token = Cookies.get("access_token") as string;
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;
export default authSlice.reducer;

// state selectors for user and the token
export const selectCurrentUser = (state: any) => state.auth.user;
export const selectCurrentToken = (state: any) => state.auth.token;
