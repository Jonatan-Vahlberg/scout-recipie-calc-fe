import { Form, Formik } from "formik";
import React from "react";
import styled from "styled-components";
import Card from "../../Card";
import DropdownWrapper from "../../Dropdown/DropdownWrapper";
import { FormButton, Label, StyledError, StyledField } from "../../Styled/Form";
import FullIngredient from "./FullIngredient";
import { object, string as yupString } from "yup";

type ContentProps = {
  onSubmit: (values: any) => void;
  initialValues: any;
  enableReinitialize?: boolean;
  posting: boolean;
  ingredients: Ingredient[];
  setIngredients: React.Dispatch<React.SetStateAction<Ingredient[]>>;
  onToggle: VoidFunction;
  setPopupVisible: React.Dispatch<React.SetStateAction<boolean>>;
  submitText: string;
  setSelectedIngredient: React.Dispatch<React.SetStateAction<Ingredient>>;
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

const validationSchema = object({
    name: yupString().required("Namn krävs"),
})

const RecipieModalContent = (props: ContentProps) => {
  const isAllIngredientsValid = () => {
    return props.ingredients.every(
      (ingredient) => ingredient.ingredient.name !== ""
    );
  };

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={props.initialValues}
        onSubmit={props.onSubmit}
        validationSchema={validationSchema}
      >
        {({touched, errors}) => (
          <Form>
            <fieldset disabled={props.posting}></fieldset>
            <Card className="mb-3" offColor>
              <Label htmlFor="name" className="required">
                Titel
              </Label>
              <StyledField name="name" placeholder="Recpt Titel" className={errors.name ?"mb-0" : ""} />
              {errors.name && <StyledError className="mb-1" touched={!!touched.name}>
            {errors.name}
          </StyledError>}
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
                  {props.ingredients.map((ingredient, index) => (
                    <FullIngredient
                      key={`FULL_INGREDIENT_${ingredient.ingredient?.id}${index}`}
                      ingredient={ingredient}
                      removeIngredient={() => {
                        props.setIngredients((state) => {
                          let newState = [...state];
                          newState.splice(index, 1);
                          return newState;
                        });
                      }}
                      editIngredient={() => {
                        props.setSelectedIngredient(ingredient);
                        props.setPopupVisible(true);
                      }}
                    />
                  ))}
                </IngredientWrapper>
              </DropdownWrapper>
              <FormButton
                type="button"
                onClick={() => props.setPopupVisible(true)}
              >
                Lägg till ingrediens
              </FormButton>
            </Card>
            <ActionBar>
              <FormButton
                disabled={props.posting}
                cancel
                type="reset"
                onClick={props.onToggle}
              >
                Avbryt
              </FormButton>
              <FormButton
                disabled={
                  props.posting ||
                  props.ingredients.length === 0 ||
                  !isAllIngredientsValid()
                }
                type="submit"
              >
                {props.submitText}
              </FormButton>
            </ActionBar>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default RecipieModalContent;
