import { useState } from "react";
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
  const [copyingCart, setCopyingCart] = useState(false);
  const [copyingIngredients, setCopyingIngredients] = useState(false);

  const onCopy = (setter: Function, copyFunc: Function) => {
    setter(true);
    copyFunc();
    setTimeout(() => {
      setter(false);
    }, 2000);
  };

  return (
    <div>
      <Text>Total mängd recept: {cart.cart?.length}</Text>
      <Button
        onClick={() => onCopy(setCopyingCart, cart.copyCart)}
        className="mb-2"
        disabled={copyingCart}
      >
        {copyingCart ? "Kopierad..." : "Kopiera kundvagn"}&nbsp;&nbsp;
        <i className="mr-2 fa fa-copy"></i>
      </Button>
      <Button
        onClick={() => onCopy(setCopyingIngredients, cart.copyIngredients)}
        disabled={copyingIngredients}
      >
        {copyingIngredients ? "Kopierad..." : "Kopiera Ingredienser"}
        &nbsp;&nbsp;<i className="mr-2 fa fa-carrot"></i>
      </Button>
      <Divider />
      <Card offColor>
        <DropdownWrapper title="Recept" defaultState={false}>
          <RecipieList>
            {cart.cart.map((item) => (
              <RecipieItem
                key={`CART_RECIPIE_${item?.id || item.alias}`}
                item={item}
              />
            ))}
          </RecipieList>
        </DropdownWrapper>
      </Card>
      <Divider />

      <RecipieList>
        {cart.groupByRecipie().map((items) => (
          <ListedCartItem
            key={`CART_ITEM_I${items?.[0].id || items[0]?.alias}`}
            items={items}
          />
        ))}
      </RecipieList>
    </div>
  );
};

export default CartDrawerContent;
