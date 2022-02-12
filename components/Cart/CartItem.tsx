import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { usePortions } from "../../utils/context/PortionContext";
import Card from "../Card";
import DropdownWrapper from "../Dropdown/DropdownWrapper";
import Ingredient from "../Recipie/Ingredient";

const IngredientWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin: 8px 0;
`

const ListedCartItem: React.FC<{ items: CartItem[] }> = ({ items }) => {
  const {getPortions} = usePortions()

  const [item, setItem] = useState<CartItem>(items?.[0])
  const [totalPortions, setTotalPortions] = useState(0)

  useEffect(() => {
    setTotalPortions(getTotalPortions())
    setItem(items?.[0])
  },[items])

  const getTotalPortions = () => {
    let portions = 0;
    items.forEach(item => {
      
      portions += getPortions(item.portions)
    })
    return portions
  }
  
  if(!item) return null
  
  return (
    <Card offColor>
      <DropdownWrapper title={`${item.recipie.name} x${Math.round(totalPortions)}`} defaultState={true}>
        <IngredientWrapper>

        {item.recipie.ingredients.map((ingredient) => (
          <Ingredient
          key={`INGREDIENT_IN_LIST_${ingredient.name}`}
          ingredient={ingredient}
          portions={totalPortions}
          />
          ))}
      </IngredientWrapper>
      </DropdownWrapper>
    </Card>
  );
};

export default ListedCartItem;
