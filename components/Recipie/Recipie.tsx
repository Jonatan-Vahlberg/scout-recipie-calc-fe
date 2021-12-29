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
      <ImageWrapper>
        <Image
          alt="Recipie image"
          src="https://picsum.photos/1024"
          layout="fill"
          objectFit="contain"
        />
      </ImageWrapper>
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
