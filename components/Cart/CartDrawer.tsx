import { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { useCart } from "../../utils/context/CartContext";
import Card from "../Card";
import DropdownWrapper from "../Dropdown/DropdownWrapper";
import { Divider } from "../Styled/Divider";
import { Header, Text } from "../Styled/Text";
import ListedCartItem from "./CartItem";
import RecipieItem from "./RecepieItem";

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
`;

const OpenPosition = css`
  right: 0;
`;

const Drawer = styled(Card)<{ isOpen: boolean }>`
  position: absolute;
  width: min(75vw, 500px);
  height: 100vh !important;
  transition: all 0.5s;
  ${({ isOpen }) => (isOpen ? OpenPosition : InertPosition)};
  cursor: initial;
  text-align: left;
  overflow-y: auto;
`;

const RecipieList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const CartDrawer = () => {
  const cart = useCart();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  useEffect(() => {
    if (cart.isOpen) {
      setTimeout(() => {
        setIsDrawerOpen(true);
      }, 25);
    } else {
      setIsDrawerOpen(false);
    }
    if (document) {
      if (cart.isOpen) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "unset";
      }
    }
  }, [cart.isOpen]);

  return (
    <Backdrop
      isOpen={cart.isOpen}
      onClick={(e) => {
        e.stopPropagation();
        cart.setIsOpen(false);
      }}
    >
      <Drawer
        onClick={(e) => {
          e.stopPropagation();
        }}
        isOpen={isDrawerOpen}
      >
        <Header>Kundvangn</Header>
        <Divider />
        <Text>Total mängd recept: {cart.cart.length}</Text>
        <Divider />
        <Card offColor>
            <DropdownWrapper title="Recept" defaultState={false}>
          <RecipieList>
              {cart.cart.map((item) => (
                <RecipieItem item={item} />
              ))}
          </RecipieList>
            </DropdownWrapper>
        </Card>
        <Divider />

        <RecipieList>
          {cart.groupByRecipie().map((items) => (
            <ListedCartItem items={items} />
          ))}
        </RecipieList>
      </Drawer>
    </Backdrop>
  );
};

export default CartDrawer;
