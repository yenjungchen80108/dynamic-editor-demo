import React from "react";
import { useSelector } from "react-redux";

import { space } from "styled-system";
import styled from "styled-components";

import { instrConfigSelector } from "@/events/202501/instrEditor/store/selector";
import FieldContent from "@/components/FieldContent";
import { FIELD_TYPE } from "@/events/202501/instrEditor/constant";

const ImageWithCollapseModal = ({ className, ...props }) => {
  const {
    instrConfig: { formFields },
  } = useSelector(instrConfigSelector);

  const fieldData = formFields?.[FIELD_TYPE?.IMAGE_WITH_COLLAPSE_MODAL];

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

export default styled(ImageWithCollapseModal)`
  ${space}
`;
