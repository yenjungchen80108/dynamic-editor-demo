import React from "react";
import styled from "styled-components";
import classNames from "classnames";

const TextArea = ({
  className,
  style,
  register,
  registerName,
  required,
  minLength,
  maxLength,
  pattern,
  validate,
  placeholder,
  disabled,
}) => {
  return (
    <div className={className}>
      <textarea
        style={style}
        {...register(registerName, {
          required,
          minLength,
          maxLength,
          pattern,
          validate,
        })}
        placeholder={placeholder}
        disabled={disabled}
        className={classNames("input textarea", {
          "input-disabled": disabled,
        })}
      />
    </div>
  );
};

export default styled(TextArea)``;
