import React from "react";
import { useSelector } from "react-redux";
import { instrConfigSelector } from "@/events/202501/instrEditor/store/selector";
import styled from "styled-components";
import { space } from "styled-system";
import FieldContent from "@/components/FieldContent";
import { FIELD_TYPE } from "@/events/202501/instrEditor/constant";

const ImageWithNavTab = ({ className, ...props }) => {
  const {
    instrConfig: { formFields },
  } = useSelector(instrConfigSelector);

  const fieldData = formFields?.[FIELD_TYPE?.IMAGE_WITH_NAV_TAB];

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

export default styled(ImageWithNavTab)`
  ${space}
`;
