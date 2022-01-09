import { Modal } from "reactstrap";
import Card from "../Card";
import { Header, SubHeader } from "../Styled/Text";
import { Formik, Form, Field } from "formik";
import styled, { css } from "styled-components";
import DropdownWrapper from "../Dropdown/DropdownWrapper";
import { Button } from "../PortionSelector/PortionIncrementer";
import IngredientAdder from "./IngredientAdder";
import React, { useState } from "react";
import { FormButton, Label, StyledField } from "../Styled/Form";
import { useList } from "../../utils/context/ListContext";

type ModalProps = {
  isOpen: boolean;
  toggle: VoidFunction;
};

const ActionBar = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const CreateNewRecipieModal: React.FC<ModalProps> = ({ isOpen, toggle }) => {
  const listContext = useList();

  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [posting, setPosting] = useState(false);

  const isAllIngredientsValid = () => {
    return ingredients.every((ingredient) => ingredient.name !== "");
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

  console.log(isAllIngredientsValid());
  return (
    <Modal isOpen={isOpen} toggle={onToggle} centered backdrop="static">
      <Card>
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
                  <IngredientAdder
                    ingredients={ingredients}
                    setIngredients={setIngredients}
                    disabled={!isAllIngredientsValid()}
                  />
                </DropdownWrapper>
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
      </Card>
    </Modal>
  );
};

export default CreateNewRecipieModal;
