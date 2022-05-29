import { Modal } from "reactstrap";
import Card from "../Card";
import { Header, SubHeader } from "../Styled/Text";
import { Formik, Form, Field } from "formik";
import styled, { css } from "styled-components";
import DropdownWrapper from "../Dropdown/DropdownWrapper";
import { Button } from "../PortionSelector/PortionIncrementer";
import React, { useState } from "react";
import { FormButton, Label, StyledField } from "../Styled/Form";
import { useList } from "../../utils/context/ListContext";
import NewIngrdientPopup from "./components/NewIngrdientPopup";
import FullIngredient from "./components/FullIngredient";

type ModalProps = {
  isOpen: boolean;
  toggle: VoidFunction;
};

export const ActionBar = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const IngredientWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 16px;
`;

const RecipieModal: React.FC<ModalProps> = ({ isOpen, toggle }) => {
  const listContext = useList();

  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [posting, setPosting] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);

  const isAllIngredientsValid = () => {
    return ingredients.every((ingredient) => ingredient.ingredient.name !== "");
  };

  const onToggle = () => {
    toggle();
    setIngredients([]);
  };

  const onSubmit = (values: any) => {
    const recipie: FormRecipie = {
      name: values.name,
      link: values.link,
      image_link: values.imageLink,
      description: values.description,
      ingredients: ingredients,
    };
    setPosting(true);
    listContext.createRecipie(
      recipie,
      () => {
        setPosting(false);
      },
      () => {
        setPosting(false);
      }
    );
  };
  return (
    <Modal isOpen={isOpen} toggle={onToggle} centered backdrop="static">
      <Card>
        <div className="position-relative">
          <Header>Nytt recept</Header>
          <Formik
            initialValues={{
              name: "",
              link: "",
              imageLink: "",
              description: "",
            }}
            onSubmit={onSubmit}
          >
            {() => (
              <Form>
                <fieldset disabled={posting}></fieldset>
                <Card className="mb-3" offColor>
                  <Label htmlFor="name" className="required">
                    Titel
                  </Label>
                  <StyledField name="name" placeholder="Recpt Titel" />

                  <Label htmlFor="link">Länk till orginal recept</Label>
                  <StyledField name="link" placeholder="Länk till recept" />

                  <Label htmlFor="imageLink">Bildlänk</Label>
                  <StyledField name="imageLink" placeholder="Bildlänk" />
                </Card>
                <Card offColor>
                  <DropdownWrapper
                    title="Ingredienser (Baserat på 4 portioner)"
                    defaultState={true}
                  >
                    <IngredientWrapper>
                      {ingredients.map((ingredient, index) => (
                        <FullIngredient
                        key={`FULL_INGREDIENT_${ingredient.ingredient?.id}${index}`}
                          ingredient={ingredient}
                          removeIngredient={() => {
                            setIngredients((state) => {
                              let newState = [...state];
                              newState.splice(index, 1);
                              return newState;
                            });
                          }}
                        />
                      ))}
                    </IngredientWrapper>
                  </DropdownWrapper>
                  <FormButton
                    type="button"
                    onClick={() => setPopupVisible(true)}
                  >
                    Lägg till ingrediens
                  </FormButton>
                </Card>
                <ActionBar>
                  <FormButton
                    disabled={posting}
                    cancel
                    type="reset"
                    onClick={onToggle}
                  >
                    Avbryt
                  </FormButton>
                  <FormButton
                    disabled={
                      posting ||
                      ingredients.length === 0 ||
                      !isAllIngredientsValid()
                    }
                    type="submit"
                  >
                    Skapa
                  </FormButton>
                </ActionBar>
              </Form>
            )}
          </Formik>
          <NewIngrdientPopup
            addedIngredients={ingredients}
            addIngredient={(ingredient) => {
              setIngredients((state) => [...state, ingredient]);
            }}
            dismiss={() => setPopupVisible(false)}
            visible={popupVisible}
          />
        </div>
      </Card>
    </Modal>
  );
};

export default RecipieModal;
