import React from "react";
import { useFormContext } from "react-hook-form";
import { StyledGroupedInput } from "./styles";
import { StyledInputContainer } from "../styles";
import classNames from "classnames";
// import { integerValidation } from "@/utils/formValidation";

const GroupedInput = ({
  className,
  fields,
  type,
  registerName,
  label,
  validate,
  placeholder,
  formId,
  required,
  defaultLabel,
  fieldValue,
  isDisabled,
}) => {
  const formContext = useFormContext();
  const { register, formState } = formContext;
  const fieldError = formState.errors[registerName];

  return (
    <StyledInputContainer className={className}>
      <h3>
        {label || defaultLabel}{" "}
        {required && <span className="need-mark">*</span>}
      </h3>
      <StyledGroupedInput>
        {fields.map((field, index) => {
          const uniqueKey = `${field?.registerName}_${formId}`;
          const defaultValue = fieldValue?.[uniqueKey];

          return (
            <div key={index} className="input-item">
              <span>{field.defaultLabel || field.label} </span>
              <input
                type={field.type}
                placeholder={field.placeholder || field.defaultPlaceholder}
                {...register(uniqueKey, {
                  required,
                  validate: {
                    ...validate,
                  },
                })}
                // registerName={uniqueKey}
                defaultValue={defaultValue}
                disabled={isDisabled}
                className={classNames("input", {
                  "input-disabled": isDisabled,
                })}
              />
            </div>
          );
        })}
        {fieldError && (
          <div className="input-desc">
            <div className="input-alert">
              {fieldError?.message || fieldError?.type || "※請檢查欄位"}
            </div>
          </div>
        )}
      </StyledGroupedInput>
    </StyledInputContainer>
  );
};

export default GroupedInput;
