import { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { useDrawer } from "../../utils/context/DrawerContext";
import Card from "../Card";
import { Divider } from "../Styled/Divider";
import DrawerHeader from "./DrawerHeader";

const Backdrop = styled.div<{ isOpen: boolean }>`
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  visibility: ${({ isOpen }) => (isOpen ? "visible" : "hidden")};
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 100;
`;

const InertPosition = css`
  right: min(-75vw, -500px);
  @media (max-width: 768px) {
    right: -100vw;
  }
`;

const OpenPosition = css`
  right: 0;
`;

const DrawerWrapper = styled(Card)<{ isOpen: boolean }>`
  position: absolute;
  width: min(75vw, 500px);
  height: 100vh !important;
  transition: all 0.5s;
  ${({ isOpen }) => (isOpen ? OpenPosition : InertPosition)};
  cursor: initial;
  text-align: left;
  overflow-y: auto;

  @media (max-width: 768px) {
    width: 100vw;
  }
`;

const Drawer = () => {
  const drawer = useDrawer()
    
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  useEffect(() => {
    if (drawer.isOpen) {
      setTimeout(() => {
        setIsDrawerOpen(true);
      }, 25);
    } else {
      setIsDrawerOpen(false);
    }
    if (document) {
      if (drawer.isOpen) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "unset";
      }
    }
  }, [drawer.isOpen]);

  return (
    <Backdrop
      isOpen={drawer.isOpen}
      onClick={(e) => {
        e.stopPropagation();
        drawer.actions.setIsOpen(false);
      }}
    >
      <DrawerWrapper
        onClick={(e) => {
          e.stopPropagation();
        }}
        isOpen={isDrawerOpen}
      >
         <DrawerHeader/>
         <Divider />
         {drawer.content && drawer.content} 
      </DrawerWrapper>
    </Backdrop>
  );
};

export default Drawer;
