import { useMemo } from "react";
import { useFormContext } from "react-hook-form";

import { StyledInput } from "./styles";
import { StyledInputContainer } from "../styles";

import SimpleColorPicker from "./ColorPicker";
import TextInput from "./TextInput";
import NumInput from "./NumInput";
import TextArea from "./TextArea";

// 取得嵌套物件的值
const getNestedValue = (obj, path) => {
  return path.split(".").reduce((acc, key) => acc?.[key], obj);
};

const Input = (props) => {
  const {
    className,
    required,
    registerName,
    description,
    label,
    defaultLabel,
    type,
    disabled: disabledProps = false,
    defaultValue,
    isDisabled,
  } = props;

  const formContext = useFormContext();
  const { register, formState } = formContext;
  const disabled = isDisabled || useMemo(() => disabledProps, [disabledProps]);

  const fieldError = getNestedValue(formState.errors, registerName);

  const inputComponents = {
    text: TextInput,
    color: SimpleColorPicker,
    number: NumInput,
    textarea: TextArea,
  };

  const InputComponent = inputComponents[type];

  return (
    <StyledInputContainer className={className}>
      <StyledInput>
        <h3>
          {label || defaultLabel}{" "}
          {required && <span className="need-mark">*</span>}
        </h3>
        <div className="input-title">
          {!!description && (
            <div className="input-description">{description}</div>
          )}
        </div>
        <div className="input-info">
          <InputComponent
            register={register}
            defaultValue={defaultValue}
            disabled={disabled}
            type={type}
            {...props}
          />
          {fieldError && (
            <div className="input-desc">
              <div className="input-alert">
                {fieldError?.message || fieldError?.type || "※請檢查欄位"}
              </div>
            </div>
          )}
        </div>
      </StyledInput>
    </StyledInputContainer>
  );
};

export default Input;
