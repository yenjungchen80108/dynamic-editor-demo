import cx from "classnames";

import {
  renderContent,
  renderDefaultBasicActionButton,
  renderDefaultPanelDetail,
  renderDefaultSeeMore,
} from "./utils";
import { StyledPanelContent } from "./styles";

const PanelContent = ({
  className,
  panelData,
  // renderTitle = renderDefaultTitle,
  renderActionButton = renderDefaultBasicActionButton,
  renderPanelDetail = renderDefaultPanelDetail,
  renderSeeMore = renderDefaultSeeMore,
  onCollapsibleToggle = () => null,
  onOpenModalClick = () => {},
  onActionButtonClick = () => {},
  ...props
}) => (
  <StyledPanelContent
    className={cx("panel-content-wrapper", className)}
    {...props}
  >
    {panelData?.map((content, index) => (
      <div
        className={cx("content-container", {
          [content?.containerProps?.className]: Boolean(
            content?.containerProps?.className
          ),
        })}
        key={index}
      >
        {renderContent({
          index,
          content,
          // renderTitle,
          renderActionButton,
          renderPanelDetail,
          renderSeeMore,
          onCollapsibleToggle,
          onOpenModalClick,
          onActionButtonClick,
        })}
      </div>
    ))}
  </StyledPanelContent>
);

export default PanelContent;
