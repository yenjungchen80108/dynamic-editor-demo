import { COMMON_MODAL_TYPE } from "@/container/jsonEditor/constant";

import PanelDataModal from "./PanelDataModel";
import MergeModal from "./MergeModal";
import RequestModal from "./RequestModal";

const MODAL_COMPONENTS = {
  [COMMON_MODAL_TYPE.PANEL_DATA_MODAL]: PanelDataModal,
  [COMMON_MODAL_TYPE.MERGE_MODAL]: MergeModal,
  [COMMON_MODAL_TYPE.REQUEST_MODAL]: RequestModal,
};

const CommonModal = ({ modalType, modalProps, onClose }) => {
  if (!modalType || !MODAL_COMPONENTS[modalType]) return null;
  const SpecificModal = MODAL_COMPONENTS[modalType];

  return <SpecificModal {...modalProps} onClose={onClose} />;
};

export default CommonModal;
