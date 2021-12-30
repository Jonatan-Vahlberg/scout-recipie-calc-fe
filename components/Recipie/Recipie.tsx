import Image from "next/image";
import styled from "styled-components";
import { useRecipie } from "../../utils/context/RecipieContext";
import Card from "../Card";
import PortionSelector from "../PortionSelector/PortionSelector";
import { Header, SubHeader } from "../Styled/Text";
import Ingredient from "./Ingredient";

const Container = styled.div`
  padding: 16px;
`;

const ImageWrapper = styled.div`
  height: 600px;
  position: relative;
  width: 100%;
  margin-bottom: 16px;
  display:flex;
  overflow: hidden;
  &: img{
    width:100%;
    object-fit: contain;
  }
`;

const Anchor = styled.a`
  color: ${({ theme }) => theme.colors.primary[200]};
  font-size: 18px;
  line-height: 21px;
  &:link,
  &:visited {
    color: ${({ theme }) => theme.colors.primary[200]};
    &:hover {
      color: ${({ theme }) => theme.colors.primary[300]};
    }
  }
  &:hover {
    color: ${({ theme }) => theme.colors.primary[300]};
  }
`;

const IngredientWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px 0;
`;

const Recipie = () => {
  const { recipie } = useRecipie();
  return (
    <Container>
      <Header>{recipie.name}</Header>
      {recipie.image_link && (
        <ImageWrapper>
          <img
            alt="Recipie image"
            src={recipie.image_link}
          />
        </ImageWrapper>
      )}
      {recipie.link && (
        <Anchor href={recipie.link} target="_blank">
          Orginal Recept
        </Anchor>
      )}
      <PortionSelector />
      <Card offColor>
        <SubHeader>Ingredienser</SubHeader>
        <IngredientWrapper>
          {recipie?.ingredients.map((ingredient) => (
            <Ingredient
              key={`INGREDIENT_${ingredient.name}`}
              ingredient={ingredient}
            />
          ))}
        </IngredientWrapper>
      </Card>
    </Container>
  );
};

export default Recipie;
