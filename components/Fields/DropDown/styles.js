import styled from "styled-components";

export const DropdownContainer = styled.div`
  width: 100%;
`;

export const StyledSelect = styled.select`
  width: 100%;
  height: 40px;
  padding: 8px;
  font-size: 16px;
  color: #333;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
  /* pointer-events: none; */

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

export const StyledOption = styled.option`
  background-color: #fff;
  color: #333;
  font-size: 16px;
  padding: 10px;

  &:hover {
    background-color: #f0f0f0;
  }
`;
