import React from "react";
import { useSelector } from "react-redux";

import { instrConfigSelector } from "@/events/202501/instrEditor/store/selector";
import styled from "styled-components";
import { space } from "styled-system";
import FieldContent from "@/components/FieldContent";

import { FIELD_TYPE } from "@/events/202501/instrEditor/constant";

const FloatImages = ({ className }) => {
  const {
    instrConfig: { formFields },
  } = useSelector(instrConfigSelector);

  const fieldData = formFields?.[FIELD_TYPE?.FLOAT_IMAGES];

  return (
    <div className={className}>
      <h2>{fieldData?.title}</h2>
      <FieldContent fieldData={fieldData} />
    </div>
  );
};

export default styled(FloatImages)`
  ${space}
`;
