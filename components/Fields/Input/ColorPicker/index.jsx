import React, { useState } from "react";
import styled from "styled-components";
import classNames from "classnames";

const SimpleColorPicker = ({
  className,
  defaultValue,
  register,
  registerName,
  disabled,
}) => {
  const [color, setColor] = useState(defaultValue || "#ffffff"); // 默认颜色

  return (
    <div className={className}>
      <span>選擇顏色: {color}</span>
      <input
        {...register(registerName, {})}
        type="color"
        className={classNames("color-picker", { disabled })}
        value={color}
        onChange={(e) => setColor(e.target.value)}
      />
    </div>
  );
};

export default styled(SimpleColorPicker)`
  display: flex;
  align-items: center;
  justify-content: space-between;

  .color-picker {
    width: 50px;
    height: 1.8em;
    vertical-align: bottom;
    border: 1px solid #000;
    border-radius: 1px;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    cursor: pointer;

    &.disabled {
      cursor: not-allowed;
      pointer-events: none;
      opacity: 0.8;
      border: 1px solid #ccc;
    }
  }

  .color-picker::-webkit-color-swatch-wrapper {
    padding: 0;
  }
  .color-picker::-webkit-color-swatch {
    border: none;
  }
`;
