import styled from "styled-components";

export const StyledReqWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;

  label {
    margin-top: 10px;
  }

  input {
    margin-top: 5px;
    width: 90%;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 5px;
    margin-bottom: 10px;
    background-color: #f5f5f5;
    color: #000;

    &::placeholder {
      color: #ccc;
    }
  }
`;
