import { createSlice, PayloadAction } from "@reduxjs/toolkit";
type initialState = {
  value: AuthState;
};
type AuthState = {
  isAuth: boolean;
  role: string;
  CUSTOMER_ID: number | undefined;
  FIRST_NAME: string;
  AVATAR: string;
};
type loginPayload = {
  role: string;
  CUSTOMER_ID: number | undefined;
  FIRST_NAME: string;
  AVATAR: string;
};
const initialState = {
  value: {
    isAuth: false,
    role: "",
    CUSTOMER_ID: undefined,
    FIRST_NAME: "",
    AVATAR: "",
  } as AuthState,
} as initialState;
export const auth = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<loginPayload>) => {
      return {
        value: {
          ...state.value,
          ...action.payload,
          isAuth: true,
        },
      };
    },
    logout: () => {
      return initialState;
    },
  },
});
export const { loginSuccess, logout } = auth.actions;
export default auth.reducer;
