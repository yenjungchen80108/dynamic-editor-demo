import styled from "styled-components";

export const StyledGroupedInput = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  position: relative;
  gap: 3px;

  input {
    width: 100%;
    height: 20px;
    border-radius: 5px;
    border: solid 1px var(--field-border-color);
    background-color: #fff;
    color: var(--text-color);

    -webkit-user-select: text;

    &::placeholder {
      color: var(--placeholder-text-color);
    }
  }

  .input-disabled {
    color: var(--disabled-text-color);
    background-color: var(--disabled-bg-color);
  }

  .input-item {
    display: flex;
    align-items: center;
    gap: 3px;
  }

  .input-alert {
    text-align: right;
    font-size: 12px;
    color: var(--hint-color);
    z-index: 0;
    margin-left: auto;
  }
`;
