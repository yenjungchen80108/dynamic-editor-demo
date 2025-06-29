import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { space } from "styled-system";

import { DropdownContainer, StyledSelect, StyledOption } from "./styles";

const Dropdown = ({ formFields, dropType, onSelect, disabled, className }) => {
  const [selectedId, setSelectedId] = useState("");

  useEffect(() => {
    if (dropType && formFields[dropType]) {
      setSelectedId(dropType);
    }
  }, [dropType, formFields]);

  const handleChange = (e) => {
    const id = e.target.value;
    setSelectedId(id);
    onSelect(id);
  };

  return (
    <DropdownContainer className={className}>
      <StyledSelect
        value={selectedId}
        onChange={handleChange}
        disabled={disabled}
      >
        <StyledOption value="">請選擇說明頁類別</StyledOption>
        {Object.keys(formFields)?.map((id) => (
          <StyledOption key={id} value={id}>
            {formFields[id].title}
          </StyledOption>
        ))}
      </StyledSelect>
    </DropdownContainer>
  );
};

export default styled(Dropdown)`
  ${space}
`;
