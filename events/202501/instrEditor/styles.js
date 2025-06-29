import styled from "styled-components";
import "@radix-ui/colors/gray.css";
import "@radix-ui/colors/slate.css";

export const StyledContainer = styled.div`
  min-height: 100vh;
  font-size: 12px;
  background: #fff;
`;

export const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 375px;
  height: 100vh;
  margin: 0 auto;
  position: relative;
  background: #fff;
  color: #000;
  background-color: var(--slate-3);
  overflow: scroll;

  .TabsRoot {
    display: flex;
    flex-direction: column;
    width: 375px;
    height: 100vh;
  }

  .TabsList {
    flex-shrink: 0;
    display: flex;
    border: 1px solid var(--slate-3);
  }

  .TabsTrigger {
    font-family: inherit;
    color: var(--slate-10);
    background-color: var(--slate-1);
    border: 1px solid var(--slate-5);
    padding: 0 20px;
    height: 45px;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 15px;
    line-height: 1;
    user-select: none;
  }

  .TabsTrigger:hover {
    color: var(--gray-12);
  }

  .TabsTrigger[data-state="active"] {
    color: var(--gray-12);
    background-color: var(--slate-7);
    border: 1px solid var(--gray-8);
  }

  .TabsContent {
    color: var(--gray-12);
    flex-grow: 1;
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
    width: 375px;
    margin: 0 auto;
    outline: none;
  }
`;
