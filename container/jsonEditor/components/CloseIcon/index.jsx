import styled from "styled-components";
import { background, layout, position } from "styled-system";

import SvgCircleClose from "@/components/Icon/SvgCircleClose";

const CloseIcon = ({ className, onClose = () => null }) => (
  <SvgCircleClose
    className={className}
    xColor="#000"
    borderColor="#000"
    onClick={onClose}
  />
);

export default styled(CloseIcon)`
  cursor: pointer;
  position: absolute;
  top: 5px;
  right: 5px;
  width: 10px;
  height: 10px;
  border-radius: 50%;

  ${position}
  ${layout}
  ${background}
`;
