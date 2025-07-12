import { COMMON_MODAL_TYPE } from "@/container/jsonEditor/constant";

import PanelDataModal from "./PanelDataModel";
import MergeModal from "./MergeModal";

const MODAL_COMPONENTS = {
  [COMMON_MODAL_TYPE.PANEL_DATA_MODAL]: PanelDataModal,
  [COMMON_MODAL_TYPE.MERGE_MODAL]: MergeModal,
};

const CommonModal = ({ modalType, modalProps, onClose }) => {
  if (!modalType || !MODAL_COMPONENTS[modalType]) return null;
  const SpecificModal = MODAL_COMPONENTS[modalType];

  return <SpecificModal {...modalProps} onClose={onClose} />;
};

export default CommonModal;
