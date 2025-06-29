import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import { space } from "styled-system";
import { instrConfigSelector } from "@/events/202501/instrEditor/store/selector";
import { FIELD_TYPE } from "@/events/202501/instrEditor/constant";
import FieldContent from "@/components/FieldContent";

const SingleStaticImage = ({ className, ...props }) => {
  const {
    instrConfig: { formFields },
  } = useSelector(instrConfigSelector);

  const fieldData = formFields?.[FIELD_TYPE?.STATIC_IMAGE];

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

export default styled(SingleStaticImage)`
  ${space}
`;
