import styled from "styled-components";
import {
  background,
  color,
  typography,
  layout,
  space,
  border,
} from "styled-system";

// import { smallText } from '@/styles/mixin'

export const StyledContainer = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.lightGrey};
  color: ${({ theme }) => theme.colors.black};
`;

export const StyledContent = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh; /* 整个内容区满高 */

  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
  }
`;

export const StyledSidebar = styled.aside`
  /* width: 20%;
  max-width: 300px; */
  background: ${({ theme }) => theme.colors.white};
  border-right: 1px solid ${({ theme }) => theme.colors.grey};
  padding: 16px;
  overflow-y: auto;
  width: 25%; /* 桌機/平板時預設寬度 */

  @media (max-width: 768px) {
    width: 100%; /* 螢幕 ≤768px 時撐滿全寬 */
    max-height: 200px;
  }
`;

export const StyledMain = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: auto;
`;

export const StyledActionButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  font-size: 12px;
  background: #fff;
  color: #000;
  border: none;
  ${space};

  padding: 5px 10px;
  border-radius: 5px;

  &.disabled {
    color: #696969;
    border-color: #a7a7a7;
    background: rgba(216, 216, 216, 1);
    filter: grayscale(100%);
    pointer-events: none;
  }
`;

export const StyledText = styled.div`
  color: #000;
  font-size: 12px;
  text-align: center;
  white-space: pre-wrap;
  ${typography}
  ${color}
  ${background}
  ${border}
  ${layout}
  ${space}
`;
