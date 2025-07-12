import styled, { css } from "styled-components";

import { px2Unit } from "@/styles/mixin";

export const StyledContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  position: fixed;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  overflow: hidden;
`;

export const StyledModalSection = styled.div`
  width: ${({ width }) => width || "85%"};
  height: fit-content;
  max-height: 90%;
  position: relative;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-height: 90vh; // TODO: 高度限制
  overflow-y: ${({ overflowY }) => overflowY || "visible"};
  ${({ marginTop }) =>
    marginTop &&
    css`
      margin-top: ${px2Unit(marginTop)};
    `};
`;

export const StyledCloseButton = styled.div`
  position: absolute;
  right: ${px2Unit(0)};
  top: ${px2Unit(0)};
  margin: ${px2Unit(10)};
  cursor: pointer;
  z-index: 1;
`;

export const StyledDefaultCloseIcon = styled.div`
  width: ${px2Unit(14)};
  height: ${px2Unit(14)};
  background-size: cover;
  background-position: center;
  background-image: url("/static/images/shared/close.svg");
`;
export const StyledBackdrop = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: transparent;
`;
