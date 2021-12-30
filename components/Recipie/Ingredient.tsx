import { usePortions } from "../../utils/context/PortionContext";
import Card from "../Card";
import { Text } from "../Styled/Text";
import CategoryIndicator from "./CategoryIndicator";

type IngredientProps = {
  ingredient: Ingredient;
};

const Ingredient: React.FC<IngredientProps> = ({ ingredient }) => {
  const portions = usePortions();

  const getAmmountFromPortions = () => {
    if(!ingredient.base_amount) return ''
    let ammount = ingredient.base_amount * portions.getPortions();
    if (ammount > 1000) return Math.round(ammount / 100) * 100;
    if (ammount > 500) return Math.round(ammount / 50) * 50;
    if (ammount > 50) return Math.round(ammount / 10) * 10;
    return Math.round(ammount);
  };

  const ingredientAmmount = ingredient.base_amount * portions.getPortions();
  return (
    <Card className="d-flex justify-content-between align-items-center w-100">
      <Text className="mb-0">
        <strong>
          {getAmmountFromPortions()} {ingredient.unit}
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
