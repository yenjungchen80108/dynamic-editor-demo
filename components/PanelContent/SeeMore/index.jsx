import styled from "styled-components";
import { color, typography, space, border, background } from "styled-system";

import { px2Unit } from "@/styles/mixin";

const SeeMore = ({ className, open, onToggle }) => {
  const seeMoreTitle = open ? "點擊收合" : "查看更多";
  return (
    <div className={`${className} see-more`}>
      <div className="see-more-button" onClick={onToggle}>
        {seeMoreTitle}
      </div>
    </div>
  );
};

export default styled(SeeMore)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .see-more-button {
    background-color: #6fbba9;
    color: #fff;
    margin: 0 auto;
    font-size: ${px2Unit(14)};
    padding: ${px2Unit(5)} ${px2Unit(15)};
    border-radius: 5px;
    ${color}
    ${space}
    ${typography}
    ${border}
    ${background}
  }

  .panel-collapsible-see-more-images {
    img {
      display: block;
      width: 100%;
    }
  }
`;
