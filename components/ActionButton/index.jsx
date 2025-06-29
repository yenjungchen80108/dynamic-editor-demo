import React, { forwardRef, cloneElement } from "react";
import styled from "styled-components";
import {
  position,
  layout,
  space,
  background,
  backgroundImage,
  backgroundPosition,
  backgroundRepeat,
  backgroundSize,
  border,
  letterSpacing,
} from "styled-system";

const ActionButton = forwardRef(({ asChild, children, ...props }, ref) => {
  const { className, onClick, disabled, ...actionData } = props;

  const handleClick = () => {
    onClick?.({ disabled, ...actionData });
  };

  const child = asChild ? (
    cloneElement(React.Children.only(children), {
      ref,
      className: `action ${className}`,
      onClick: handleClick,
      disabled: disabled,
    })
  ) : (
    <div
      className={`action ${className}`}
      onClick={handleClick}
      disabled={disabled}
    >
      {children}
    </div>
  );

  return child;
});

ActionButton.displayName = "ActionButton";

export default styled(ActionButton)`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  .btn-text {
    font-size: 14px;
    font-weight: 500;
    background: #fff;
    color: #000;
    padding: 10px 20px;
    margin: 5px 5px 0;
    border-radius: 10px;
  }

  cursor: pointer;
  user-select: none;
  ${layout}
  ${position}
  ${space}
  ${background}
  ${backgroundImage}
  ${backgroundPosition}
  ${backgroundRepeat}
  ${backgroundSize}
  ${border}
  ${letterSpacing}
  &[disabled] {
    cursor: auto;
    filter: grayscale(100%);
  }

  img {
    width: 100%;
    height: auto;
  }

  .countdown-wrapper {
    position: relative;
    left: -25%;
  }
`;
