import { usePortions } from "../../utils/context/PortionContext";
import { getIngredientPortioned } from "../../utils/helpers";
import Card from "../Card";
import { Text } from "../Styled/Text";
import CategoryIndicator from "./CategoryIndicator";

type IngredientProps = {
  ingredient: Ingredient;
  portions: number;
};

const Ingredient: React.FC<IngredientProps> = ({ ingredient, portions }) => {

  
  return (
    <Card className="d-flex justify-content-between align-items-center w-100">
      <Text className="mb-0">
        <strong>
          {getIngredientPortioned(ingredient, portions)} {ingredient.unit}
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
