import { space } from "styled-system";
import styled from "styled-components";
import { useSelector } from "react-redux";

import StaticImage from "@/components/Fields/StaticImage";
import Input from "@/components/Fields/Input";
import GroupedInput from "@/components/Fields/GroupedInput";
import { instrConfigSelector } from "@/events/202501/instrEditor/store/selector";
import { composeList } from "@/utils/mergeJson";

const FieldContent = ({
  className = "",
  formId,
  fieldData,
  fieldValue,
  disabled,
}) => {
  const {
    instrConfig: {
      instrFieldType: {
        staticImage,
        inputText,
        inputTextColor,
        inputNumber,
        doubleInputNumber,
        quadrupleInputNumber,
      },
    },
  } = useSelector(instrConfigSelector);

  const renderContent = (content, index) => {
    if (!content.type) return null;

    const uniqueKey = `${content?.registerName}_${formId}`;
    const defaultValue = fieldValue?.[uniqueKey];

    const composeDoubleInput = composeList(
      content.fields,
      doubleInputNumber.fields,
      "id"
    );
    const composeQuadrupleInput = composeList(
      content.fields,
      quadrupleInputNumber.fields,
      "id"
    );

    switch (content.type) {
      case "static_image":
        return (
          <StaticImage
            key={index}
            {...content}
            {...staticImage}
            registerName={uniqueKey}
            defaultValue={defaultValue}
            isDisabled={disabled}
          />
        );
      case "input_number":
        return (
          <Input
            key={index}
            {...content}
            {...inputNumber}
            registerName={uniqueKey}
            defaultValue={defaultValue}
            isDisabled={disabled}
          />
        );
      case "input_text":
        return (
          <Input
            key={index}
            {...content}
            {...inputText}
            registerName={uniqueKey}
            defaultValue={defaultValue}
            isDisabled={disabled}
          />
        );
      case "input_text_color":
        return (
          <Input
            key={index}
            {...content}
            {...inputTextColor}
            registerName={uniqueKey}
            defaultValue={defaultValue}
            isDisabled={disabled}
          />
        );
      case "double_input_number":
        return (
          <GroupedInput
            key={index}
            {...content}
            {...doubleInputNumber}
            formId={formId}
            fieldValue={fieldValue}
            fields={composeDoubleInput}
            isDisabled={disabled}
          />
        );
      case "quadruple_input_number":
        return (
          <GroupedInput
            key={index}
            {...content}
            {...quadrupleInputNumber}
            formId={formId}
            fieldValue={fieldValue}
            fields={composeQuadrupleInput}
            isDisabled={disabled}
          />
        );
      default:
        return null;
    }
  };

  return <div className={className}>{fieldData.fields.map(renderContent)}</div>;
};

export default styled(FieldContent)`
  ${space}
`;
