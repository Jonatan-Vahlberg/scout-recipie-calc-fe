import { useEffect, useState } from "react";
import styled from "styled-components";
import { useDebounce } from "use-hooks";
import apiKit from "../../../utils/ApiKit";
import { reasons, translatedReasons } from "../../../utils/helpers";
import Card from "../../Card";
import { FormButton, Label, StyledInput } from "../../Styled/Form";
import { ActionBar } from "../RecipieCreationModal";
import IngredientSearch from "./IngredientSearch";

const Backdrop = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  inset: 0;
`;

const Popup = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
`;

const ReasonWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 4px 8px;
`;

const SmallLabel = styled(Label)`
  font-size: 14px;
`;

const Error = styled.p`
  color: ${({ theme }) => theme.colors.primary[600]};
`;

type NewIngrdientPopupProps = {
  visible: boolean;
  ingredient?: Ingredient;
  update?: false;
  addedIngredients: Ingredient[];
  addIngredient: (ingredient: Ingredient) => void;
  dismiss: () => void;
};

const NewIngrdientPopup: React.FC<NewIngrdientPopupProps> = ({
  addedIngredients,
  dismiss,
  addIngredient,
  visible,
}) => {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);

  const [ingredients, setIngredients] = useState<BaseIngredient[]>([]);
  const [selectedIngredient, setSelectedIngredient] =
    useState<BaseIngredient>();

  const [amount, setAmount] = useState<number>();
  const [replaces, setReplaces] = useState<string>("");
  const [replacesReason, setReplacesReason] = useState<Reason>();
  const [error, setError] = useState("");

  useEffect(() => {
    apiKit
      .getIngredients({
        page: 1,
        search: debouncedSearch || null,
      })
      .then((response) => {
        setIngredients(response.data.results);
      })
      .catch((error) => {});
  }, [debouncedSearch]);

  const resetIngredient = () => {
    setSelectedIngredient(undefined);
    setSearch("");
    setAmount(undefined);
    setReplaces("");
    setReplacesReason(undefined);
  };

  const _dismiss = () => {
    resetIngredient();
    dismiss();
  };

  const validateIngredient = () => {
    if (selectedIngredient) {
      if (!replaces || (replaces && replacesReason)) {
        setError("");

        return true;
      }
    }
    setError("Vänligen kolla igenom så att alla upgifter är korekta");
    return false;
  };

  const onAdding = () => {
    addIngredient({
      name: selectedIngredient.name,
      unit: selectedIngredient.unit,
      category: selectedIngredient.category,
      ingredient_id: selectedIngredient.id,
      amount,
      replaces: replaces ? replaces : null,
      replaces_reason: replacesReason,
      id: undefined,
    });
    _dismiss();
  };

  if (!visible) return null;
  return (
    <>
      <Backdrop />
      <Popup className="shadow-sm">
        <Card offColor>
          <Label className="mb-3">
            <strong>Ny ingrediens (baserat på 4 portioner)</strong>
          </Label>
          <IngredientSearch
            search={search}
            setSearch={setSearch}
            ingredients={ingredients.filter(
              (i) =>
                !addedIngredients
                  .map(({ ingredient_id }) => ingredient_id)
                  .includes(i.id)
            )}
            onSelect={setSelectedIngredient}
            selected={selectedIngredient}
          />
          <SmallLabel className="my-2">
            <strong>Extra detaljer</strong>
          </SmallLabel>

          <SmallLabel className="mb-2 w-100">Mängd?</SmallLabel>
          <StyledInput
            type="number"
            placeholder="#"
            className="w-25"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
          />

          {addedIngredients.length !== 0 && (
            <div>
              <SmallLabel className="mb-2 w-100">Ersätter</SmallLabel>
              <StyledInput
                as="select"
                value={replaces}
                onChange={(e) => setReplaces(e.target.value)}
                placeholder="#"
                className="w-100"
              >
                <option value="">Inget val</option>
                {addedIngredients.map((ingredient) => (
                  <option value={ingredient.id}>{ingredient.name}</option>
                ))}
              </StyledInput>
              {replaces && (
                <SmallLabel className="mb-2 w-100">
                  <strong>Anledning</strong>
                </SmallLabel>
              )}

              {replaces && (
                <ReasonWrapper>
                  {reasons.map((reason) => (
                    <div>
                      <input type="radio" name="reason" value={reason} onChange={(e) => setReplacesReason(e.target.value as Reason)} />
                      &nbsp;&nbsp;
                      {translatedReasons[reason]}
                    </div>
                  ))}
                </ReasonWrapper>
              )}
            </div>
          )}
          {error && <Error>{error}</Error>}
          <ActionBar>
            <FormButton cancel type="button" onClick={_dismiss}>
              Avbryt
            </FormButton>
            <FormButton
              onClick={onAdding}
              disabled={!validateIngredient}
              type="button"
            >
              Lägg till
            </FormButton>
          </ActionBar>
        </Card>
      </Popup>
    </>
  );
};

export default NewIngrdientPopup;
