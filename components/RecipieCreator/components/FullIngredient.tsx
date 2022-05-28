import { MdCancel } from "react-icons/md";
import styled from "styled-components";
import CategoryIndicator from "../../Recipie/CategoryIndicator";
import ReplacementIndicator from "../../Recipie/ReplacementIndicator";
import { FormButton } from "../../Styled/Form";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  background: ${({ theme }) => theme.colors.white};
  padding: 4px 8px;
`;

const LeftSide = styled.div`
  ddplay: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;
const RightSide = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
`;

const Icon = styled(MdCancel)`
  color: ${({ theme }) => theme.colors.primary[500]};
  align-self: center;
  justify-self: center;
  font-size: 24px;
  cursor: pointer;
`;

const MarkingsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

type FullIngredientProps = {
  ingredient: Ingredient;
  removeIngredient: VoidFunction;
};

const FullIngredient: React.FC<FullIngredientProps> = ({
  ingredient,
  removeIngredient,
}) => {
  
  return (
    <Wrapper>
      <LeftSide>
        <strong>{ingredient.name}</strong>&nbsp;{ingredient.amount}
        {ingredient.unit}
        <div>
          <MarkingsWrapper>
            {ingredient.category && (
              <CategoryIndicator small category={ingredient.category} />
            )}
            {ingredient.replaces_reason && (
              <ReplacementIndicator small reason={ingredient.replaces_reason} />
            )}
          </MarkingsWrapper>
        </div>
      </LeftSide>
      <div>
        <RightSide>
          <Icon onClick={removeIngredient}></Icon>
        </RightSide>
      </div>
    </Wrapper>
  );
};

export default FullIngredient;
