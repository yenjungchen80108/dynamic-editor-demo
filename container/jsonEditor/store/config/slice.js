import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

export const initialState = {
  error: null,
  jsonConfig: {
    styles: {
      backgroundColor: "#ffffff",
      textColor: "#000000",
    },
  },
};

const slice = createSlice({
  name: "container/jsonEditor/config",
  initialState,
  reducers: {
    setJsonConfig: (state, action) => {
      state.jsonConfig = action.payload.jsonConfig;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, { payload }) => ({
      ...state,
      ...payload.events.jsonEditor?.config,
    }));
  },
});

export const { setJsonConfig } = slice.actions;

export default slice.reducer;
