import styled from "styled-components";
import "@radix-ui/colors/sky.css";
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

  /* color: #000; */
  /* background: #eee; */

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

  /* .TabsTrigger:first-child {
    border-top-left-radius: 6px;
  }

  .TabsTrigger:last-child {
    border-top-right-radius: 6px;
  } */

  .TabsTrigger:hover {
    color: var(--sky-11);
  }

  .TabsTrigger[data-state="active"] {
    color: var(--sky-11);
    background-color: var(--sky-3);
    border: 1px solid var(--sky-8);
  }

  /* .TabsTrigger:focus {
    position: relative;
    box-shadow: 0 0 0 2px black;
  } */

  .TabsContent {
    flex-grow: 1;
    color: var(--sky-11);
    background-color: var(--slate-3);
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
    width: 375px;
    margin: 0 auto;
    outline: none;
    /* overflow: scroll; */
  }
`;
