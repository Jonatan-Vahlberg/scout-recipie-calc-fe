import { usePortions } from "../../utils/context/PortionContext";
import Card from "../Card";
import { Text } from "../Styled/Text";
import CategoryIndicator from "./CategoryIndicator";

type IngredientProps = {
  ingredient: Ingredient;
  customPortions?: number;
};

const Ingredient: React.FC<IngredientProps> = ({ ingredient }) => {
  const portions = usePortions();

  const getamountFromPortions = () => {
    if(!ingredient.base_amount) return ''
    let amount = (ingredient.base_amount/4) * portions.getPortions();
    if (amount > 1000) return Math.round(amount / 100) * 100;
    if (amount > 500) return Math.round(amount / 50) * 50;
    if (amount > 50) return Math.round(amount / 10) * 10;
    if (amount < 10 && ingredient.category === "SPICE") return (Math.round(amount * 10) / 10).toFixed(1)
    return Math.round(amount);
  };

  const ingredientamount = ingredient.base_amount * portions.getPortions();
  return (
    <Card className="d-flex justify-content-between align-items-center w-100">
      <Text className="mb-0">
        <strong>
          {getamountFromPortions()} {ingredient.unit}
        </strong>{" "}
        {ingredient.name}
      </Text>
      {ingredient.category && (
        <CategoryIndicator category={ingredient.category} />
      )}
    </Card>
  );
};

export default Ingredient;
