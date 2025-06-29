import cx from "classnames";
import { useCallback, useRef, useState } from "react";
import styled from "styled-components";

import scrollToElement from "../utils/scrollToElement";

import Collapse from "./Collapse";

const Collapsible = ({
  index,
  className,
  children,
  modalConfig = {},
  collapsibleConfig = {},
  defaultIsOpen = false,
  onCollapsibleToggle = () => null,
  renderPanelDetail = () => null,
  renderHeader = () => null,
  renderSeeMore = () => null,
  renderActionButton = () => null,
}) => {
  const contentRef = useRef();
  const [isOpen, setIsOpen] = useState(defaultIsOpen);

  const { offset = 0, minHeight = 0 } = collapsibleConfig || {};

  const handleToggleCollapse = useCallback(() => {
    setIsOpen((state) => {
      if (state) {
        onCollapsibleToggle?.(false);
        scrollToElement(contentRef, { behavior: "auto" });
        return false;
      }

      onCollapsibleToggle?.(true);
      return true;
    });
  }, [onCollapsibleToggle]);

  return (
    <PanelCollapsible
      // detailButtonStyle={modalConfig?.detailButton?.style}
      className={cx("panel-collapsible", className)}
      offset={offset}
      open={isOpen}
      ref={contentRef}
    >
      <div className="panel-collapsible-header">
        {renderHeader({ index, open: isOpen, onToggle: handleToggleCollapse })}
      </div>
      {renderActionButton?.({ open: isOpen, onToggle: handleToggleCollapse })}
      <div className="panel-collapsible-body">
        <Collapse
          open={isOpen}
          startCollapsedSize={isOpen ? 0 : offset}
          collapsedSize={minHeight}
        >
          <div className="panel-collapsible-content">{children}</div>
        </Collapse>
        {renderPanelDetail?.({ open: isOpen })}
        {renderSeeMore?.({
          open: isOpen,
          onToggle: handleToggleCollapse,
        })}
      </div>
    </PanelCollapsible>
  );
};

export const PanelCollapsible = styled.div`
  position: relative;
  .panel-collapsible-header {
    img {
      display: block;
      width: 100%;
    }
  }
  .panel-collapsible-content {
    position: relative;
    img {
      display: block;
      width: 100%;
    }
  }

  .panel-collapsible-see-more {
    text-align: center;
  }
`;

export default Collapsible;
