import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://sove.app/api/v1";


type LoginPayload = {
  login: string;
  password: string;
};
type LoginResponse = {
  access_token: string;
  token_type: string;
};

type AuthState = {
  token: string | null;
  isAuthenticated: boolean;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};

const initialState: AuthState = {
  token: null,
  isAuthenticated: false,
  status: "idle",
  error: null,
};

export const loginUser = createAsyncThunk<
  LoginResponse,
  LoginPayload,
  { rejectValue: string }
>("auth/loginUser", async ({ login, password }, thunkAPI) => {
  try {
    const response = await fetch(`${API_BASE}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        login,
        password,
      }),
    });

    if (!response.ok) {
      return thunkAPI.rejectWithValue("Неверный логин или пароль");
    }

    const data: LoginResponse = await response.json();

    if (typeof window !== "undefined") {
      localStorage.setItem("token", data.access_token);
    }

    return data;
  } catch {
    return thunkAPI.rejectWithValue("Ошибка сети");
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    hydrateToken(state) {
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("token");
        state.token = token;
        state.isAuthenticated = !!token;
      }
    },
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
      state.isAuthenticated = true;
      state.error = null;

      if (typeof window !== "undefined") {
        localStorage.setItem("token", action.payload);
      }
    },
    logout(state) {
      state.token = null;
      state.isAuthenticated = false;
      state.status = "idle";
      state.error = null;

      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.token = action.payload.access_token;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Login failed";
      });
  },
});

export const { hydrateToken, setToken, logout } = authSlice.actions;
export default authSlice.reducer;
