import React from "react";
import { StyledContainer, StyledContent } from "./styles";
import { ThemeProvider } from "styled-components";

const styles = {
  colors: {
    primary: "#000",
  },
};

const Page = () => {
  return (
    <ThemeProvider theme={styles}>
      <StyledContainer>
        <StyledContent>json editor</StyledContent>
      </StyledContainer>
    </ThemeProvider>
  );
};

export default Page;
