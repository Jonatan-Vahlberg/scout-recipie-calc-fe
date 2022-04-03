import styled from "styled-components";
import { useCart } from "../../utils/context/CartContext";
import Card from "../Card";
import DropdownWrapper from "../Dropdown/DropdownWrapper";
import { Button } from "../Styled/Button";
import { Divider } from "../Styled/Divider";
import { Text } from "../Styled/Text";
import ListedCartItem from "./CartItem";
import RecipieItem from "./RecepieItem";

const RecipieList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const CartDrawerContent = () => {
  const cart = useCart();

  return (
    <div>
      
      <Text>Total mängd recept: {cart.cart?.length}</Text>
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
          <ListedCartItem
            key={`CART_ITEM_I${items?.[0].alias}`}
            items={items}
          />
        ))}
      </RecipieList>
    </div>
  );
};

export default CartDrawerContent;
