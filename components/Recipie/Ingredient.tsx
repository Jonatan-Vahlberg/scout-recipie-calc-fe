import { usePortions } from "../../utils/context/PortionContext";
import { getIngredientPortioned } from "../../utils/helpers";
import Card from "../Card";
import { Text } from "../Styled/Text";
import CategoryIndicator from "./CategoryIndicator";

type IngredientProps = {
  ingredient: Ingredient;
  portions: number;
};

const Ingredient: React.FC<IngredientProps> = (props) => {
  const { portions, ingredient } = props;
  const {name, category, unit} = ingredient.ingredient
  const ingredientPortion = getIngredientPortioned(ingredient, portions);
  console.log("ingredientPortion", ingredientPortion)
  return (
    <Card className="d-flex justify-content-between align-items-center w-100">
      <Text className="mb-0">
        <strong>
          {ingredientPortion !== 0 && ingredientPortion} {ingredientPortion !== 0  && unit}
        </strong>{" "}
        {name}
      </Text>
      {category && (
        <CategoryIndicator category={category} />
      )}
    </Card>
  );
};

export default Ingredient;
