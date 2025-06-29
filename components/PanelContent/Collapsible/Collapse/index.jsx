import { useEffect, useMemo, useRef, useState } from "react";

import { StyledCollapse } from "./styles";

const Collapse = ({
  open,
  children,
  className = "",
  startCollapsedSize = 0,
  collapsedSize = 0,
}) => {
  const targetHeightRef = useRef(null);
  const [collapseHeight, setCollapseHeight] = useState(10000);

  const collapseStyle = useMemo(() => {
    const transitionSize = collapsedSize || collapseHeight;
    const collapsedTransitionSecond =
      transitionSize * 0.001 > 0.8 ? 0.8 : transitionSize * 0.001;
    if (!open) {
      return {
        maxHeight: collapsedSize,
        transition: `max-height ${collapsedTransitionSecond}s ease`,
      };
    }

    return {
      maxHeight: `${collapseHeight}px`,
      transition: `max-height ${collapsedTransitionSecond}s ease`,
    };
  }, [open, collapsedSize, collapseHeight]);

  useEffect(() => {
    setCollapseHeight(targetHeightRef?.current?.scrollHeight || 0);
  }, [open]);

  return (
    <StyledCollapse
      style={collapseStyle}
      ref={targetHeightRef}
      className={className}
      open={open}
      startCollapsedSize={startCollapsedSize}
    >
      <div className="collapse-container">{children}</div>
    </StyledCollapse>
  );
};

export default Collapse;
