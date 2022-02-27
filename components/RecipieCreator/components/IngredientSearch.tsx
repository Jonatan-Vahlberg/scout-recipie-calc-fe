import styled from "styled-components";
import { FormButton, StyledInput } from "../../Styled/Form";
import IngredientSearchItem from "./IngredientSearchItem";


type IngredientSearchProps = {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  onSelect: React.Dispatch<React.SetStateAction<BaseIngredient>>;
  changeMode: React.Dispatch<React.SetStateAction<IngredientMode>>
  mode: IngredientMode;
  ingredients: BaseIngredient[]
  selected?: BaseIngredient
};

const ListWrapper = styled.div`
    width: 100%;
    height: 175px;
    background-color: #fff;
    padding: 8px 8px;
    overdlow: auto;
    overflow-x: hidden;
`

const IngredientSearch: React.FC<IngredientSearchProps> = ({
  search,
  setSearch,
  onSelect,
  changeMode,
  mode,
  ingredients,
  selected
}) => {
  return (
    <div>
      <StyledInput
      className="mb-3"
        type="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Sök ingrediens"
      />
        <ListWrapper>
            {ingredients.map((ingredient) => (
                <IngredientSearchItem key={`INGREDIENT_SEARCH_ITEM_${ingredient.id}`} selected={selected?.id === ingredient.id} ingredient={ingredient} onSelect={onSelect}/>
            ))}
            <FormButton
            disabled={mode === "NEW"}
                    type="button"
                    onClick={() =>changeMode("NEW")}
                  >
                    Skapa ny ingrediens
            </FormButton>
        </ListWrapper>
      <div>

      </div>

    </div>
  );
};

export default IngredientSearch;
