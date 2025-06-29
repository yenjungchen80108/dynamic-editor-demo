import styled from "styled-components";
import { space, background, color, border } from "styled-system";

export const StyledCustomImage = styled.img`
  width: ${({ width }) => (width ? width : "100%")};
  height: ${({ height }) => (height ? height : "auto")};
  ${background}
  ${color}
  ${border}
`;

export const StyledPanelContent = styled.div`
  /* basic */
  display: flex;
  flex-direction: column;
  ${space}

  .panel-content-img {
    width: 100%;
    max-width: 100%;
  }

  .content-container {
    position: relative;
    &:not(:last-child) {
      margin-bottom: 15px;
    }
  }

  .panel-content-header {
    z-index: 0;
    .panel-default-title-image {
      img {
        display: block;
        width: 100%;
      }
    }
  }
  .panel-content-body {
    position: relative;
    z-index: 0;
  }

  /* action button */
  .panel-action-button {
    position: absolute;
    z-index: 1;
  }

  .panel-content-with-action-button {
    position: relative;
  }
  img {
    user-select: none;
  }
`;

export const StyledPanelDetail = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "buttonStyle", // 过滤掉 buttonStyle
})`
  position: absolute;

  width: ${({ width = 100 }) => width};

  .panel-detail-button {
    img {
      display: block;
      width: 100%;
      height: 100%;
    }
  }

  ${({ buttonStyle = {} }) =>
    Object.keys(buttonStyle)
      .map((key) => {
        const value = buttonStyle[key];
        // 处理值是否需要单位
        return Number.isNaN(Number(value))
          ? `${key}:${value};`
          : `${key}:${value}px;`;
      })
      .join("")}

  transition: top 0.3s ease, bottom 0.3s ease, left 0.3s ease, right 0.3s ease;
`;
