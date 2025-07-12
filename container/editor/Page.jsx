import React from "react";
import { StyledContainer, StyledContent } from "./styles";
import { ThemeProvider } from "styled-components";
import dynamic from "next/dynamic";

const Editor = dynamic(() => import("./components/Editor"), { ssr: false });

const styles = {
  colors: {
    primary: "#000",
  },
};

const Page = () => {
  return (
    <ThemeProvider theme={styles}>
      <StyledContainer>
        <StyledContent>
          <Editor />
        </StyledContent>
      </StyledContainer>
    </ThemeProvider>
  );
};

export default Page;
