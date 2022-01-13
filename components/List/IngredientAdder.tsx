import React from "react";
import { MdCancel } from "react-icons/md";
import styled from "styled-components";
import { FormButton, Label, StyledInput } from "../Styled/Form";

type IngredientsAdderProps = {
  ingredients: Ingredient[];
  setIngredients: React.Dispatch<React.SetStateAction<Ingredient[]>>;
  disabled: boolean;
};

const IngredientWrapper = styled.div`
  display: grid;
  grid-template-columns: 50px 60px 1fr 120px 20px;
  gap: 0px 8px;
`;

const Icon = styled(MdCancel)`
  color: ${({ theme }) => theme.colors.primary[600]};
  align-self: center;
  justify-self: center;
  margin-bottom: 16px;
  font-size: 16px;
  cursor: pointer;
`

const ingredientsCategories: {
  name: string;
  category: Category | undefined;
}[] = [
  {name: "Kategori", category: undefined},
  {name: "Frukt", category: "FRUIT"},
  {name: "Grönsak", category: "VEGETABLE"},
  {name: "Torrvara", category: "DRY_GOOD"},
  {name: "Kylvara", category: "REFRIGERATED"},
  {name: "Krydda", category: "SPICE"},
]

const IngredientAdder: React.FC<IngredientsAdderProps> = ({
  ingredients,
  setIngredients,
  disabled
}) => {
  const _onChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    name: keyof Ingredient,
    index: number
  ) => {
    const ingredient = ingredients[index];

    //@ts-ignore
    ingredient[name] = e.target.value;

    setIngredients((state) => {
      return state.map((_ingredient, i) =>
        i === index ? ingredient : _ingredient
      );
    });
  };
  const _removeIngredient = (index:number) => {
    const _ingredients = [...ingredients];
    _ingredients.splice(index, 1);

    setIngredients(_ingredients);
  }

  return (
    <div>
      <Label>Ingredienser</Label>
      {ingredients.map((ingredient, index) => (
        <IngredientWrapper key={`INGREDIENT_ADD${ingredient.name}`}>
          <StyledInput
            placeholder="#"
            value={ingredient.base_amount}
            onChange={(e) => _onChange(e, "base_amount", index)}
          />
          <StyledInput
            placeholder="Enhet"
            value={ingredient.unit}
            onChange={(e) => _onChange(e, "unit", index)}
          />
          <StyledInput
            value={ingredient.name}
            onChange={(e) => _onChange(e, "name", index)}
          />
          <StyledInput
            value={ingredient.category}
            onChange={(e) => _onChange(e, "category", index)}
            as="select"
          >
            {ingredientsCategories.map(category => (
              <option key={`OPTION${category.name}${ingredient.name}`}  value={category.category}>
                {category.name}
              </option>
            ))}
          </StyledInput>
          <Icon onClick={() => _removeIngredient(index)}/>
        </IngredientWrapper>
      ))}
      <FormButton
        type="button"
        disabled={disabled}
        onClick={() =>
          setIngredients((state) => [...state, createNewIngredient()])
        }
      >
        <span className="mr-2">Lägg till Ingrediens</span>
        {/* <FaPlus /> */}
      </FormButton>
    </div>
  );
};

const createNewIngredient = (): Ingredient => ({
  name: "",
  unit: "",
  //@ts-ignore
  base_amount: "",
});

export default IngredientAdder;
