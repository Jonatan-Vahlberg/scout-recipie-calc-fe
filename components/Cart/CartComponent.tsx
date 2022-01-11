import { AiOutlineShoppingCart } from "react-icons/ai";
import styled from "styled-components";
import { useCart } from "../../utils/context/CartContext";
import CartDrawer from "./CartDrawer";

const Button = styled.button<{ length?: string }>`
  position: relative;
  background-color: transparent;
  border: none;
  height: 32px;
  width: 32px;
  border-radius: 50%;
  font-size: 28px;
  display: flex;
  align-items: center;
  justify-content: center;

  &::after {
    position: absolute;
    right: -10px;
    top: -10px;
    content: ${({ length }) => length || "none"};
    width: 24px;
    height: 24px;
    font-size: 11px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.colors.primary[200]};
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
  }
`;
const CartComponent = () => {

  const {setIsOpen, cart} = useCart()
  return (
    <>
      <Button onClick={() => setIsOpen(true)} length={getLength(cart.length)}>
        <i className="fas fa-shopping-cart"></i>
        <CartDrawer/>
      </Button>
    </>
  );
};

const getLength = (length?: number) => {
  if (!length) return undefined;
  return `${length > 9 ? `'9+'` : `'${length}'`}`;
};
export default CartComponent;
