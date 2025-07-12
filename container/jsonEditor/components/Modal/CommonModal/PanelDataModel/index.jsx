/* eslint-disable local-rules/check-withS3Host */
import styled from "styled-components";

import PanelContent from "@/components/PanelContent";
import CloseIcon from "@/container/jsonEditor/components/CloseIcon";

import { ModalContainer } from "../../styles";

const PanelDataModal = ({
  className,
  onClose,
  title,
  color,
  background,
  panelData,
}) => (
  <ModalContainer
    className={className}
    border="2px solid #FFEAE8"
    borderRadius="5px"
  >
    <CloseIcon onClose={onClose} />
    {title && <div className="title">{title}</div>}
    <PanelContent
      className="hidden-scrollbar"
      color={color}
      background={background}
      panelData={panelData}
    />
  </ModalContainer>
);

export default styled(PanelDataModal)`
  ${PanelContent} {
    overflow-y: scroll;
    color: ${({ color }) => color ?? "#000"};
    background: ${({ background }) => background ?? "transparent"};
  }
`;
