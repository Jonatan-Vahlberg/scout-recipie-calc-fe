import styled from "styled-components";
import CategoryIndicator from "../../Recipie/CategoryIndicator";

const Wrapper = styled.div<{ selected: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  background-color: ${({ theme, selected }) =>
    selected ? theme.colors.gray[100] : "#fff"};
  padding: 4px 8px;
  &:hover {
    background-color: ${({ theme }) => theme.colors.gray[100]};
  }
`;

type IngredientSearchItemProps = {
  ingredient: BaseIngredient;
  onSelect: React.Dispatch<React.SetStateAction<BaseIngredient>>;
  selected: boolean;
};

const IngredientSearchItem: React.FC<IngredientSearchItemProps> = ({
  ingredient,
  selected,
  onSelect,
}) => {
  return (
    <Wrapper
      selected={selected}
      onClick={() => onSelect(selected ? undefined : ingredient)}
    >
      <span>
        <strong>{ingredient.name}</strong>
        {ingredient.unit ? ` ${ingredient.unit}` : ""}
      </span>
      {ingredient.category && (
        <CategoryIndicator category={ingredient.category} />
      )}
    </Wrapper>
  );
};

export default IngredientSearchItem;
