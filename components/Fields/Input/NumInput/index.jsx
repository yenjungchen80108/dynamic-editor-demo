import React, { useState } from "react";
import styled from "styled-components";
import classNames from "classnames";

const NumInput = ({
  className,
  style,
  register,
  registerName,
  required,
  min,
  max,
  placeholder,
  disabled,
  defaultValue,
  type,
}) => {
  return (
    <div className={className}>
      <input
        style={style}
        {...register(registerName, {
          required,
          min: {
            value: min?.value || 0,
            message: min?.message || "輸入值過小",
          },
          max: {
            value: max?.value || 10,
            message: max?.message || "輸入值過大",
          },
          validate: {
            notStartWithZero: (value) =>
              /^[1-9][0-9]*$/.test(value) || "數字不能以 0 開頭",
          },
        })}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        className={classNames("input", { "input-disabled": disabled })}
        defaultValue={defaultValue}
        autoFocus={false}
      />
    </div>
  );
};

export default styled(NumInput)``;
