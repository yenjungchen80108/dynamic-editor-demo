import React from "react";
import { StyledContainer, StyledContent } from "./styles";
import { ThemeProvider } from "styled-components";
import { useSelector } from "react-redux";
import { actConfigSelector } from "./store/selector";
import * as Tabs from "@radix-ui/react-tabs";
import Tab2 from "./panels/Tab2";

const styles = {
  colors: {
    primary: "#000",
  },
};

const Page = ({ isEditMode, ...props }) => {
  // const {
  //   actConfig: { styles },
  // } = useSelector(actConfigSelector);

  const tabConfig = [
    { label: "Main", value: "tab1", content: "main" },
    { label: "Instruction", value: "instr", content: <Tab2 {...props} /> },
  ];

  return (
    <ThemeProvider theme={styles}>
      <StyledContainer>
        <StyledContent>
          <Tabs.Root className="TabsRoot" defaultValue="tab1">
            <Tabs.List className="TabsList" aria-label="">
              {tabConfig.map((tab) => (
                <Tabs.Trigger
                  key={tab.value}
                  className="TabsTrigger"
                  value={tab.value}
                >
                  {tab.label}
                </Tabs.Trigger>
              ))}
            </Tabs.List>
            {tabConfig.map((tab) => (
              <Tabs.Content
                key={tab.value}
                className="TabsContent"
                value={tab.value}
              >
                {tab.value === "instr"
                  ? React.cloneElement(tab.content, { isEditMode })
                  : tab.content}
              </Tabs.Content>
            ))}
          </Tabs.Root>
        </StyledContent>
      </StyledContainer>
    </ThemeProvider>
  );
};

export default Page;
