import { createSlice } from "@reduxjs/toolkit"
import type { GlobalState } from "../../types/todo"


const initialState: GlobalState = {theme: localStorage.getItem("theme") as "light" | "dark" ?? "light"}

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
      localStorage.setItem("theme", action.payload);
    },
  },
})

export const { setTheme } = globalSlice.actions