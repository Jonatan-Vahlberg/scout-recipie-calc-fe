import { useEffect, useState } from "react";
import { Modal } from "reactstrap";
import styled from "styled-components";
import { useRecipie } from "../../utils/context/RecipieContext";
import Card from "../Card";
import { Header } from "../Header";
import { SubHeader } from "../Styled/Text";
import NewIngrdientPopup from "./components/NewIngrdientPopup";
import RecipieModalContent from "./components/RecipieModalContent";

const EditPen = styled.i`
font-size: 20px;
color: ${({ theme }) => theme.colors.primary[300]};

&:hover {
  color: ${({ theme }) => theme.colors.primary[500]};
}
`

const RecipeUpdatingModal = ({}) => {
    const recipie = useRecipie()
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    const [posting, setPosting] = useState(false);
    const [ingredients, setIngredients] = useState<Ingredient[]>(recipie?.recipie.ingredients);
    const [popupVisible, setPopupVisible] = useState(false);
  const [selectedIngredient, setSelectedIngredient] = useState<Ingredient>()


    useEffect(() => {
        setIngredients(recipie?.recipie.ingredients);
    },[recipie.recipie])

    const onSubmit = (values: any) => {
        
        const newRecipie: Recipie = {
            ...recipie.recipie,
            name: values.name,
            link: values.link,
            image_link: values.imageLink,
            description: values.description,
            ingredients: ingredients,
          };
        

          setPosting(true);
          recipie.updateRecipie(
            newRecipie,
            () => {
              setPosting(false);
              onToggle();
            },
            () => {
              setPosting(false);
            }
          );
    }

    const onToggle = () => {
        toggle();
        setIngredients([]);
      };
      console.log(ingredients)
    return (
        <>
        <EditPen role="button" className="fas fa-pen " onClick={toggle}></EditPen>
        <Modal isOpen={isOpen} toggle={toggle}>
            <Card>
                <SubHeader>Uppdatera recept</SubHeader>
          <RecipieModalContent
            onSubmit={onSubmit}
            initialValues={{
              name: recipie.recipie?.name || "",
              link: recipie.recipie?.link || "",
              imageLink: recipie.recipie?.image_link || "",
            }}
            enableReinitialize
            posting={posting}
            ingredients={ingredients}
            setIngredients={setIngredients}
            onToggle={onToggle}
            setPopupVisible={setPopupVisible}
            submitText="Uppdatera"
            setSelectedIngredient={setSelectedIngredient}

          />
          <NewIngrdientPopup
            addedIngredients={ingredients}
            addIngredient={(ingredient) => {
              setIngredients((state) => [...state, ingredient]);
            }}
            updateIngredient={(ingredient) => {
              setIngredients((state) =>{
                const index = state.findIndex(i => i.id === ingredient.id);
                console.log(index, ingredient)
                if(index === -1) return state;
                state.splice(index, 1, ingredient);
                return [...state];
              })
            }}
            dismiss={() => {
              setPopupVisible(false);
              setSelectedIngredient(undefined);
            }}
            visible={popupVisible}
            savedIngredient={selectedIngredient}
          />
            </Card>
        </Modal>
        </>
    );
};

export default RecipeUpdatingModal;