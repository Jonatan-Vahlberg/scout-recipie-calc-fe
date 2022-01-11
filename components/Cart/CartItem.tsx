import React from "react";
import styled from "styled-components";
import Card from "../Card";
import DropdownWrapper from "../Dropdown/DropdownWrapper";
import Ingredient from "../Recipie/Ingredient";

const IngredientWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin: 8px 0;
`

const ListedCartItem: React.FC<{ item: CartItem }> = ({ item }) => {
  return (
    <Card offColor>
      <DropdownWrapper title={item.recipie.name} defaultState={true}>
        <IngredientWrapper>

        {item.recipie.ingredients.map((ingredient) => (
          <Ingredient
          key={`INGREDIENT_IN_LIST_${ingredient.name}`}
          ingredient={ingredient}
          />
          ))}
      </IngredientWrapper>
      </DropdownWrapper>
    </Card>
  );
};

export default ListedCartItem;
