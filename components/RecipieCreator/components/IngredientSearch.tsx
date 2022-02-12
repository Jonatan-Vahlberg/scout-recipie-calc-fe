import styled from "styled-components";
import { StyledInput } from "../../Styled/Form";
import IngredientSearchItem from "./IngredientSearchItem";


type IngredientSearchProps = {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  onSelect: React.Dispatch<React.SetStateAction<BaseIngredient>>;
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
                <IngredientSearchItem selected={selected?.id === ingredient.id} ingredient={ingredient} onSelect={onSelect}/>
            ))}
        </ListWrapper>
      <div>

      </div>

    </div>
  );
};

export default IngredientSearch;
