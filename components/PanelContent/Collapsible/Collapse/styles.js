import styled from "styled-components";

export const StyledCollapse = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "startCollapsedSize", // 过滤掉 buttonStyle
})`
  overflow: hidden;
  * {
    box-sizing: border-box;
  }

  .collapse-container {
    position: relative;
    ${({ startCollapsedSize, open }) => {
      if (!open && Number(startCollapsedSize) > 0) {
        return `
            transition: transform 0.6s ease;
            transform: translateY(${-startCollapsedSize}px);
        `;
      }

      return "";
    }}
  }
`;
