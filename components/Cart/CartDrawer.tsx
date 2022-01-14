import { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { useCart } from "../../utils/context/CartContext";
import Card from "../Card";
import DropdownWrapper from "../Dropdown/DropdownWrapper";
import { Button } from "../Styled/Button";
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
  @media (max-width: 768px) {
    right: -100vw;
  }
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

  @media (max-width: 768px) {
    width: 100vw;
  }
`;

const RecipieList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const CloseIcon = styled.i.attrs({ className: "fa fa-times" })`
  color: ${({ theme }) => theme.colors.primary[600]};
  position: absolute;
  right: 16px;
  top: 25px;
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
        <Header>Kundvagn</Header>
        <CloseIcon onClick={() => cart.setIsOpen(false)} />
        <Divider />
        <Text>Total mängd recept: {cart.cart.length}</Text>
        <Button onClick={() => cart.copyCart()}>
          Kopiera kundvagn&nbsp;&nbsp;<i className="mr-2 fa fa-copy"></i>
        </Button>
        <Divider />
        <Card offColor>
          <DropdownWrapper title="Recept" defaultState={false}>
            <RecipieList>
              {cart.cart.map((item) => (
                <RecipieItem key={`CART_RECIPIE_I${item.alias}`} item={item} />
              ))}
            </RecipieList>
          </DropdownWrapper>
        </Card>
        <Divider />

        <RecipieList>
          {cart.groupByRecipie().map((items) => (
            <ListedCartItem key={`CART_ITEM_I${items?.[0].alias}`} items={items} />
          ))}
        </RecipieList>
      </Drawer>
    </Backdrop>
  );
};

export default CartDrawer;
