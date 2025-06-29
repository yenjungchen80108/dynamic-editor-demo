import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

export const initialState = {
  error: null,
  actConfig: {},
};

const slice = createSlice({
  name: "events/202501/actPage/config",
  initialState,
  reducers: {
    setActConfig: (state, { payload }) => {
      const { actConfig } = payload;

      return {
        actConfig,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, { payload }) => {
      return {
        ...state,
        ...payload.events.actPage202501?.config,
      };
    });
  },
});

export const { setActConfig } = slice.actions;

export default slice.reducer;
