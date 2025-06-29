import styled from "styled-components";

export const StyledInputContainer = styled.div`
  --field-border-color: #b3b3b3;
  --box-background-color: rgba(255, 255, 255, 0.1);
  --placeholder-text-color: rgba(0, 0, 0, 0.4);
  --disabled-text-color: rgba(0, 0, 0, 0.3);
  --text-color: #000;
  --hint-color: #fd6969;

  display: flex;
  flex-direction: column;

  .input-alert {
    text-align: right;
    font-size: 12px;
    color: var(--hint-color);
    z-index: 0;
    margin-left: auto;
  }
`;
