import { MdCancel } from "react-icons/md";
import styled, { css } from "styled-components";
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

const IconStyle = css`
align-self: center;
justify-self: center;
font-size: 24px;
cursor: pointer;

 

`

const EditIcon = styled.i`
  ${IconStyle};
  font-size: 18px;
  color: ${({ theme }) => theme.colors.primary[300]};
  &:hover {
    color: ${({ theme }) => theme.colors.primary[500]};
  }
`;

const DeletionIcon = styled.i`
  ${IconStyle};

  color: ${({ theme }) => theme.colors.error};
  &:hover {
    color: ${({ theme }) => theme.colors.error_dark};
  }
`

const MarkingsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

type FullIngredientProps = {
  ingredient: Ingredient;
  removeIngredient: VoidFunction;
  editIngredient: VoidFunction;
};

const FullIngredient: React.FC<FullIngredientProps> = ({
  ingredient,
  removeIngredient,
  editIngredient,
}) => {
  
  return (
    <Wrapper>
      <LeftSide>
        <strong>{ingredient.ingredient.name}</strong>&nbsp;{ingredient.amount}
        {ingredient.amount && ingredient.ingredient.unit}
        <div>
          <MarkingsWrapper>
            {ingredient.ingredient.category && (
              <CategoryIndicator small category={ingredient.ingredient.category} />
            )}
            {ingredient.replaces_reason && (
              <ReplacementIndicator small reason={ingredient.replaces_reason} />
            )}
          </MarkingsWrapper>
        </div>
      </LeftSide>
      <div>
        <RightSide>
          <EditIcon className="fas fa-pen" onClick={editIngredient}></EditIcon>
          <DeletionIcon className="far fa-times" onClick={removeIngredient}></DeletionIcon>
        </RightSide>
      </div>
    </Wrapper>
  );
};

export default FullIngredient;
