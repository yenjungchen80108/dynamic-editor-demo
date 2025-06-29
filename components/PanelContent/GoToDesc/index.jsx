/* eslint-disable @next/next/no-img-element */
import styled from "styled-components";
import { layout } from "styled-system";

import { createScrollService } from "../utils/scrollIntoView";
// import { sizeUnit } from '@/styles/mixin'
import ActionButton from "../../ActionButton";
import { withS3Host } from "@/utils/imageHost";

const GoToDesc = ({
  className,
  tabIndex = 0,
  buttonImage = "/static/images/monopoly/202309/btn_desc.png",
  onBeforeGoToDesc,
}) => {
  const handleGoToDesc = () =>
    createScrollService({
      selector: `.section-${tabIndex + 1}`,
      beforeScroll: () => onBeforeGoToDesc?.(),
    });

  return (
    <ActionButton className={className} onClick={handleGoToDesc}>
      <img src={withS3Host(buttonImage)} alt="desc" />
    </ActionButton>
  );
};

export default styled(GoToDesc)`
  box-sizing: border-box;
  z-index: 10;
  width: 42px;
  height: 45px;
  ${layout};
`;
