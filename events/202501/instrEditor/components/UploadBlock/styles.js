import styled from "styled-components";
import * as Tabs from "@radix-ui/react-tabs";

import { px2Unit } from "@/styles/mixin";

export const StyledTabsRoot = styled(Tabs.Root)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  position: relative;
`;

export const StyledTabsList = styled(Tabs.List)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto 0;
  background-color: transparent;
  border-radius: ${px2Unit(8)};
  width: 100%;
  position: relative;
  z-index: 1;
`;

export const StyledTabsTrigger = styled(Tabs.Trigger)`
  flex: 1;
  /* padding: ${px2Unit(8)} 0; */
  border: none;
  background-color: transparent;
  cursor: pointer;
  text-align: center;
  font-weight: 400;
  color: #ffff;
  -webkit-tap-highlight-color: transparent;
  position: relative;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  &[data-state="active"] {
    animation: fadeIn 1s forwards;
    font-weight: bold;
    color: #000;
    position: relative;
  }
`;

export const StyledRewardCardsSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${px2Unit(16)};
  height: 100%;
`;

export const StyledTabsContent = styled(Tabs.Content)`
  background-image: url(${(props) => props.subTabBg});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: top;
  border-radius: ${px2Unit(8)};
  width: 100%;
  color: #fff;
  height: auto;
  /* padding: ${px2Unit(10)} ${px2Unit(10)} ${px2Unit(10)} ${px2Unit(10)}; */
`;

export const TabContentWrapper = styled.div`
  height: auto;
  color: white;
`;

export const StyledTabList = styled(Tabs.List)`
  display: flex;
  justify-content: center;
  gap: 5px;
  position: relative;
  z-index: 1;
`;

export const StyledCustomDescImage = styled.img`
  width: ${px2Unit(329)};
  height: ${px2Unit(252)};
  z-index: 10;
  position: absolute;
  top: ${px2Unit(70)};
  left: 50%;
  transform: translateX(-50%)
    ${({ translateY }) =>
      translateY ? `translateY(${px2Unit(translateY)})` : "none"};
`;
