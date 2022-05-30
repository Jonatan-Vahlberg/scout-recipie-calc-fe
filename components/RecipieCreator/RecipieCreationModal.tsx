import { Modal } from "reactstrap";
import Card from "../Card";
import { SubHeader } from "../Styled/Text";
import { Formik, Form } from "formik";
import styled, { css } from "styled-components";
import DropdownWrapper from "../Dropdown/DropdownWrapper";
import { Button } from "../PortionSelector/PortionIncrementer";
import React, { useState } from "react";
import { FormButton, Label, StyledField } from "../Styled/Form";
import { useList } from "../../utils/context/ListContext";
import NewIngrdientPopup from "./components/NewIngrdientPopup";
import FullIngredient from "./components/FullIngredient";
import RecipieModalContent from "./components/RecipieModalContent";

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
        <SubHeader>Skapa recept</SubHeader>
          <RecipieModalContent
            onSubmit={onSubmit}
            initialValues={{
              name: "",
              link: "",
              imageLink: "",
            }}
            posting={posting}
            ingredients={ingredients}
            setIngredients={setIngredients}
            onToggle={onToggle}
            setPopupVisible={setPopupVisible}
            submitText="Skapa"
          />
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
