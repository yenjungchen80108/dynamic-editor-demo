/* eslint-disable @next/next/no-img-element */
import cx from "classnames";
import styled from "styled-components";
import { color, space } from "styled-system";

import { withS3Host } from "@/utils/imageHost";

const PanelImage = ({ className, src, ...props }) => {
  const wrapperClassName = cx("panel-content-img", className);
  if (Array.isArray(src)) {
    return (
      <ImageContainer className={wrapperClassName} {...props}>
        {src?.map((s, idx) => (
          <img key={idx} src={withS3Host(s)} alt="" />
        ))}
      </ImageContainer>
    );
  }

  return (
    <ImageContainer className={wrapperClassName} {...props}>
      <img src={withS3Host(src)} alt="" />
    </ImageContainer>
  );
};

export const ImageContainer = styled.div`
  ${space};
  ${color};
`;

export default styled(PanelImage)`
  img {
    user-select: none;
    display: block;
    width: 100%;
  }
`;
