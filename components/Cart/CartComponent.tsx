import { useCart } from "../../utils/context/CartContext";
import { useDrawer } from "../../utils/context/DrawerContext";
import { HeaderButton } from "../Styled/header";
import CartDrawerContent from "./CartDrawerContent";


const CartComponent = () => {

  const {cart} = useCart()
  const drawer = useDrawer()

  const setDrawer = () => {
    drawer.actions.setTitle("Kundvagn");
    drawer.actions.setContent(<CartDrawerContent/>)
    drawer.actions.setIsOpen(true)
  }

  return (
    <>
      <HeaderButton onClick={setDrawer} length={getLength(cart.length)}>
        <i className="fas fa-shopping-cart"></i>
      </HeaderButton>
    </>
  );
};

const getLength = (length?: number) => {
  if (!length) return undefined;
  return `${length > 9 ? `'9+'` : `'${length}'`}`;
};
export default CartComponent;
