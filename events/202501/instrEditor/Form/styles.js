import styled from "styled-components";
import { space } from "styled-system";
import "@radix-ui/colors/slate.css";
import "@radix-ui/colors/sky.css";

export const StyledFormBlock = styled.div`
  margin-bottom: 10px;

  .horizontal-line {
    border: 1px dashed var(--slate-6);
    margin: 5px 0;
  }
`;

export const StyledPreviewBlock = styled.div`
  .upload-status {
    color: var(--sky-11);
  }

  .upload-btn {
    margin-right: 10px;
  }
`;

export const StyledBtn = styled.div`
  border: 1px solid #000;
  color: #000;
  background: #fff;
  border-radius: 10px;
  width: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
  ${space};
`;

export const StyledSaveBtn = styled.button`
  background: #000;
  color: #fff;
  border-radius: 10px;
  width: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  overflow: hidden;
  padding: 10px 20px;
  white-space: nowrap;
  ${space};
`;
