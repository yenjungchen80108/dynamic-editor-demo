import React from "react";
import { useSelector } from "react-redux";

import Input from "@/components/Fields/Input";
import styled from "styled-components";
import { space } from "styled-system";

import { instrConfigSelector } from "@/events/202501/instrEditor/store/selector";
import FieldContent from "@/components/FieldContent";
import { FIELD_TYPE } from "@/events/202501/instrEditor/constant";

const Terms = ({ className, ...props }) => {
  const {
    instrConfig: { formFields },
  } = useSelector(instrConfigSelector);

  const fieldData = formFields?.[FIELD_TYPE?.TERMS];

  return (
    <div className={className}>
      <h2>{fieldData?.title}</h2>
      <FieldContent
        fieldData={fieldData}
        fieldValue={props.defaultValues}
        formId={props.formId}
        {...props}
      />
    </div>
  );
};

export default styled(Terms)`
  ${space}
`;
