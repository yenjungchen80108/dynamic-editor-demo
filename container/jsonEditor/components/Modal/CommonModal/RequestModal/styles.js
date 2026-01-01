import styled from "styled-components";

export const StyledReqWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 12px;

  label {
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 4px;
  }

  input,
  select {
    color: #000;
    font-size: 14px;
    padding: 8px 12px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background: #fff;
    appearance: none;
    transition:
      border-color 0.2s,
      box-shadow 0.2s;
    width: 100%;
    box-sizing: border-box;

    &:focus {
      outline: none;
      border-color: #0070f3;
      box-shadow: 0 0 0 2px rgba(0, 112, 243, 0.3);
    }
  }

  /* 在 select 後面加個小箭頭 */
  .select-wrapper {
    position: relative;

    &::after {
      content: "▾";
      position: absolute;
      right: 12px;
      top: 50%;
      transform: translateY(-50%);
      pointer-events: none;
      color: #666;
      font-size: 12px;
    }

    select {
      /* 隱藏原生箭頭 */
      background-image: none;
      padding-right: 32px;
    }
  }

  button {
    margin-top: 16px;
    padding: 10px 16px;
    background: #0070f3;
    color: #fff;
    font-size: 14px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background 0.2s;

    &:disabled {
      background: #ccc;
      cursor: not-allowed;
    }

    &:not(:disabled):hover {
      background: #005bb5;
    }
  }
`;
