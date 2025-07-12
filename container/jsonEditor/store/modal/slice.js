import { createSlice } from "@reduxjs/toolkit";

import { COMMON_MODAL_TYPE } from "@/container/jsonEditor/constant";

export const initialState = {
  commonModal: {
    modalType: COMMON_MODAL_TYPE.NONE,
    modalProps: {},
  },
};

const slice = createSlice({
  name: "container/jsonEditor/modal",
  initialState,
  reducers: {
    // common modal
    openCommonModal: (state, { payload }) => {
      const { modalType, modalProps } = payload;

      state.commonModal.modalType = modalType;
      state.commonModal.modalProps = modalProps;
    },
    closeCommonModal: (state) => {
      state.commonModal.modalType = COMMON_MODAL_TYPE.NONE;
      state.commonModal.modalProps = {};
    },
  },
});

export const { openCommonModal, closeCommonModal } = slice.actions;

export default slice.reducer;
