import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

export const initialState = {
  error: null,
  editorConfig: {},
};

const slice = createSlice({
  name: "editor/config",
  initialState,
  reducers: {
    setEditorConfig: (state, { payload }) => {
      const { editorConfig } = payload;

      return {
        editorConfig,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, { payload }) => {
      return {
        ...state,
        ...payload.editor?.config,
      };
    });
  },
});

export const { setEditorConfig } = slice.actions;

export default slice.reducer;
