import { useEffect, useState } from "react";
import styled from "styled-components";
import { useDebounce } from "use-hooks";
import apiKit from "../../../utils/ApiKit";
import { categories, reasons, translatedReasons, units } from "../../../utils/helpers";
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
  color: ${({ theme }) => theme.colors.primary[500]};
`;

const defaultIngredient: BaseIngredient = {
  name: "default",
  unit: "-1",
  id: "-1",
};

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
  const [newIngredient, setNewIngredient] =
    useState<BaseIngredient>(defaultIngredient);

  const [amount, setAmount] = useState<number>();
  const [replaces, setReplaces] = useState<string>("");
  const [replacesReason, setReplacesReason] = useState<Reason>();
  const [error, setError] = useState("");
  const [mode, setMode] = useState<IngredientMode>("PREEXISTING");
  const [creating, setCreating] = useState(false)
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

  useEffect(() => {
    setNewIngredient((state) => ({
      ...state,
      name: search,
    }));
  }, [search]);

  useEffect(() => {
    if (selectedIngredient && mode === "NEW") {
      setMode("PREEXISTING");
    }
  }, [selectedIngredient]);

  const resetIngredient = () => {
    setSelectedIngredient(undefined);
    setSearch("");
    setAmount(undefined);
    setReplaces("");
    setReplacesReason(undefined);
    setMode("PREEXISTING"),
    setCreating(false)
    setNewIngredient(defaultIngredient)
  };

  const changeNewIngredient = (key: keyof BaseIngredient, value: any) => {
    setNewIngredient((state) => ({
      ...state,
      [key]: value,
    }));
  }

  const _dismiss = () => {
    resetIngredient();
    dismiss();
  };

  const validateIngredient = (ingredient: BaseIngredient = selectedIngredient) => {
    if (ingredient) {
      if (!replaces || (replaces && replacesReason)) {
        setError("");

        return true;
      }
    }
    setError("Vänligen kolla igenom så att alla upgifter är korekta");
    return false;
  };

  const onAdding = () => {
    if (!validateIngredient(mode === "NEW" ? newIngredient : selectedIngredient)) {
      return
    }
    const _addIngredient = (ingredient: BaseIngredient) => {
      addIngredient({
        name: ingredient.name,
        unit: ingredient.unit !== "-1" ? ingredient.unit : undefined,
        category: ingredient.category !== "-1" ? ingredient.category : undefined,
        ingredient_id: ingredient.id,
        amount: amount || null,
        replaces: replaces ? replaces : null,
        replaces_reason: replacesReason,
        id: undefined,
      });
      _dismiss();
    }
    if(mode === "NEW"){
      setCreating(true);
      apiKit.createIngredient({
        name: newIngredient.name,
        unit: newIngredient.unit !== "-1" ? newIngredient.unit : undefined,
        //@
        category: newIngredient.category !== "-1" ? newIngredient.category : undefined,
        id: undefined,
      })
      .then((response) => {
        
        _addIngredient(response.data)
      })
      .catch(error => {
        setError("Ett problem upstod under skapandet försök igen.")
      })
      .finally(() => setCreating(false));
      return 
    }
    _addIngredient(selectedIngredient)
    
  };

  const disabled = mode === "PREEXISTING" && !selectedIngredient || mode === "NEW" && newIngredient.name === ""; 

  if (!visible) return null;
  return (
    <>
      <Backdrop />
      <Popup className="shadow-sm">
        <Card offColor>
          <Label className="mb-3">
            <strong>Lägg till ingrediens (baserat på 4 portioner)</strong>
          </Label>
          <IngredientSearch
            search={search}
            setSearch={setSearch}
            changeMode={setMode}
            mode={mode}
            ingredients={ingredients.filter(
              (i) =>
                !addedIngredients
                  .map(({ ingredient_id }) => ingredient_id)
                  .includes(i.id)
            )}
            onSelect={setSelectedIngredient}
            selected={selectedIngredient}
          />
        
           
          {mode === "NEW" && (
            <div>
              <SmallLabel className="my-2">
                <strong>Ny ingrediens</strong>
              </SmallLabel>
              <br />

              <SmallLabel className="my-2">Namn</SmallLabel>
              <StyledInput
                type="text"
                placeholder="Namn"
                className=""
                value={newIngredient.name}
                onChange={(e) =>changeNewIngredient("name", e.target.value)}
              />
              <div>
                <div>
                  <SmallLabel className="my-2">Enhet</SmallLabel>
                  <StyledInput
                    as="select"
                    placeholder="Namn"
                    className=""
                    value={newIngredient.unit}
                    onChange={(e) =>changeNewIngredient("unit", e.target.value)}
                  >
                    {units.map(unit => (
                      <option key={`UNIT_45_${unit.value}`} value={unit.value}>{unit.title}</option>
                    ))}
                  </StyledInput>
                </div>
                <div>
                  <SmallLabel className="my-2">Kategori</SmallLabel>
                  <StyledInput
                    as="select"
                    placeholder="Namn"
                    className=""
                    value={newIngredient.category || "-1"}
                    onChange={(e) =>changeNewIngredient("category", e.target.value)}
                    >
                    {categories.map(category => (
                      <option key={`CATEGORGY_${category.value}`} value={category.value}>{category.title}</option>
                    ))}
                  </StyledInput>
                </div>
              </div>
            </div>
          )}
           <div>
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
                      <option
                      key={`SELECTABLE_REPLACEABLE_ING${ingredient.ingredient_id}`}
                      
                      value={ingredient.ingredient_id}>
                        {ingredient.name}
                      </option>
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
                        <div
                        key={`SELECTABLE_REASONS_REASON${reason}`}>
                          <input
                            type="radio"
                            name="reason"
                            value={reason}
                            onChange={(e) =>
                              setReplacesReason(e.target.value as Reason)
                            }
                          />
                          &nbsp;&nbsp;
                          {translatedReasons[reason]}
                        </div>
                      ))}
                    </ReasonWrapper>
                  )}
                </div>
              )}
            </div>
          
          {error && <Error>{error}</Error>}
          <ActionBar>
            <FormButton cancel type="button" onClick={_dismiss}>
              Avbryt
            </FormButton>
            <FormButton onClick={onAdding} disabled={disabled || creating} type="button">
              {mode === "NEW" ? "Skapa" : "Lägg till"}
            </FormButton>
          </ActionBar>
        </Card>
      </Popup>
    </>
  );
};

export default NewIngrdientPopup;
