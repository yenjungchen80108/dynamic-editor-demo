import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  error: null,
  modifiedImages: {},
};

const slice = createSlice({
  name: "events/202501/actPage/imageUploader",
  initialState,
  reducers: {
    setModifiedImage: {
      reducer: (state, { payload }) => {
        const { key, file } = payload || {};
        state.modifiedImages[key] = file; // 存储 Blob URL
      },
    },
    removeModifiedImage: (state, { payload }) => {
      delete state.modifiedImages[payload];
    },
    clearModifiedImages: (state) => {
      state.modifiedImages = {};
    },
  },
});

export const { setModifiedImage, removeModifiedImage, clearModifiedImages } =
  slice.actions;

export default slice.reducer;
