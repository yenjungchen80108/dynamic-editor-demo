import React from "react";
import styled from "styled-components";
import classNames from "classnames";

const TextInput = ({
  className,
  style,
  register,
  type,
  registerName,
  required,
  minLength,
  maxLength,
  pattern,
  validate,
  defaultValue,
  placeholder,
  disabled,
  defaultPlaceholder,
}) => {
  return (
    <div className={className}>
      <input
        style={style}
        {...register(registerName, {
          required,
          minLength,
          maxLength,
          pattern,
          validate,
        })}
        defaultValue={defaultValue}
        type={type}
        placeholder={placeholder || defaultPlaceholder}
        disabled={disabled}
        className={classNames("input", { "input-disabled": disabled })}
      />
    </div>
  );
};

export default styled(TextInput)``;
