import { StyledCustomImage } from "../styles";
import ActionButton from "../../ActionButton";
import styled from "styled-components";
import { background, color, typography, layout } from "styled-system";
import { withS3Host } from "@/utils/imageHost";

const BasicActionButton = ({
  className,
  title,
  titleImage,
  onActionButtonClick,
}) => (
  <ActionButton className={className} onClick={onActionButtonClick}>
    {title && <div className="action-title">{title}</div>}
    {titleImage && (
      <StyledCustomImage
        className="action-btn-img"
        src={withS3Host(titleImage)}
      />
    )}
  </ActionButton>
);

export default styled(BasicActionButton)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: absolute;
  z-index: 2;
  width: ${({ width }) => (width ? `${width}px` : "auto")};
  height: ${({ height }) => (height ? `${height}px` : "auto")};
  top: ${({ top }) => (top ? `${top}px` : "auto")};
  right: ${({ right }) => (right ? `${right}px` : "auto")};
  left: ${({ left }) => (left ? `${left}px` : "auto")};
  bottom: ${({ bottom }) => (bottom ? `${bottom}px` : "auto")};
  ${background};
  ${color};
  ${typography};
  ${layout};

  .action-btn-img {
    object-fit: contain;
    width: 100%;
    height: 100%;
  }
`;
