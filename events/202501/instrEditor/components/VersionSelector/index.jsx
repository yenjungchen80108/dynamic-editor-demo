import styled from "styled-components";
import { useEffect, useState } from "react";
import {
  DropdownContainer,
  StyledSelect,
  StyledOption,
} from "../../../../../components/Fields/DropDown/styles";

const VersionSelector = ({ className, onSelect }) => {
  const [versions, setVersions] = useState([]);

  useEffect(() => {
    fetch("/api/list-object-versions")
      .then((res) => res.json())
      .then((data) => setVersions(data))
      .catch((err) => console.error("Error fetching versions:", err));
  }, []);

  return (
    <DropdownContainer className={className}>
      <label>選擇版本：</label>
      <StyledSelect onChange={(e) => onSelect(e.target.value)}>
        {versions?.map((v) => (
          <StyledOption key={v.VersionId} value={v.VersionId}>
            {new Date(v.LastModified).toLocaleString()} (ID:{" "}
            {v.VersionId.slice(0, 10)})
          </StyledOption>
        ))}
      </StyledSelect>
    </DropdownContainer>
  );
};

export default styled(VersionSelector)`
  padding: 10px;
`;
