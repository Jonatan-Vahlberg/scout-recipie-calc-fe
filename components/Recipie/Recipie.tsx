import styled from "styled-components";
import { usePortions } from "../../utils/context/PortionContext";
import { useRecipie } from "../../utils/context/RecipieContext";
import { useUser } from "../../utils/context/UserContext";
import Card from "../Card";
import PortionSelector from "../PortionSelector/PortionSelector";
import RecipeUpdatingModal from "../RecipieCreator/RecipieUpdatingModal";
import { Header, SubHeader, Text } from "../Styled/Text";
import AddToCartButton from "./AddToCart";
import Ingredient from "./Ingredient";
import Step from "./Step";

const containerAreas = {
  withStepsDesktop: `"header image" "content image" "ingredients steps"`,
  withoutStepsDesktop: `"header image" "content image" "ingredients ingredients"`,
  mobile: `"header" "image" "content" "ingredients" "steps"`,
};

const HeaderWrapper = styled.div`
  grid-area: header;
  background-color: ${({ theme }) => theme.colors.white};
  padding: 16px 16px;
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  align-items: center;
`;

const Container = styled.div<{ withSteps: boolean }>`
  padding: 16px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-areas: ${({ withSteps }) =>
    withSteps
      ? containerAreas.withStepsDesktop
      : containerAreas.withoutStepsDesktop};

  @media (max-width: 1199px) {
    grid-template-columns: 1fr;
    grid-template-areas: ${containerAreas.mobile};
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  display: flex;
  grid-area: image;
  overflow: hidden;
  & img {
    width: 100%;
    object-fit: contain;
    width: 100%;
    height: 100%;

    @media (max-width: 1199px) {
      height: 400px;
    }
  }
  background-color: ${({ theme }) => theme.colors.white};
`;

const ContentWrapper = styled.div`
  grid-area: content;
  background-color: ${({ theme }) => theme.colors.white};
  padding: 16px;
`;

const Anchor = styled.a`
  color: ${({ theme }) => theme.colors.primary[300]};
  font-size: 18px;
  line-height: 21px;
  &:link,
  &:visited {
    color: ${({ theme }) => theme.colors.primary[300]};
    &:hover {
      color: ${({ theme }) => theme.colors.primary[500]};
    }
  }
  &:hover {
    color: ${({ theme }) => theme.colors.primary[500]};
  }
`;

const IngredientWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px 0;
`;

const Recipie = () => {
  const user = useUser();
  const { recipie } = useRecipie();
  const portions = usePortions()
  if(!recipie) return null
  return (
    <Container withSteps={true}>
      <HeaderWrapper>
        <Header className="mb-0">{recipie.name}
          </Header>
          {user.user && <RecipeUpdatingModal/>}
        <AddToCartButton recipie={recipie}/>
      </HeaderWrapper>
      <ImageWrapper>
        {recipie.image_link && (
          <img alt="Recipie image" src={recipie.image_link} />
        )}

      </ImageWrapper>
      <ContentWrapper>
        {recipie.link && (
          <Anchor href={recipie.link} target="_blank">
            Orginal Recept
          </Anchor>
        )}
        <Text>{recipie.description}</Text>
        <PortionSelector />
      </ContentWrapper>
      <Card offColor style={{ gridArea: "ingredients" }}>
        <SubHeader>Ingredienser</SubHeader>
        <IngredientWrapper>
          {recipie?.ingredients.map((ingredient, index, list) => {
            let ingredientsPortions = portions.getIngredientSpesificPortions(list, ingredient)
            return (
              <Ingredient
                key={`INGREDIENT_${ingredient.ingredient.id}`}
                ingredient={ingredient}
                portions={ingredientsPortions}
              />
            )
          })}
        </IngredientWrapper>
      </Card>
      {recipie.steps && (
        <Card offColor style={{ gridArea: "steps" }}>
          <SubHeader>Steg</SubHeader>
          <IngredientWrapper>
            {recipie.steps?.map((step, index) => (
              <Step key={`STEP_DETAIL_${step.description}`} step={'step'} index={index + 1} />
            ))}
          </IngredientWrapper>
        </Card>
      )}
    </Container>
  );
};

export default Recipie;
