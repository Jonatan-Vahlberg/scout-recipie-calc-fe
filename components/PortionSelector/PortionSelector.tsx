import { useState } from "react";
import styled from "styled-components";
import { usePortions } from "../../utils/context/PortionContext";
import { anyAdvancedSelected } from "../../utils/helpers";
import Card from "../Card";
import DropdownWrapper from "../Dropdown/DropdownWrapper";
import { Label } from "../Styled/Form";
import { SubHeader, Text } from "../Styled/Text";
import PortionIncrementer from "./PortionIncrementer";

const PortionIncrementerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px 0;
`;

const incrementers: [PortionKey, string][] = [
  ["xs", "Spårare"],
  ["sm", "Upptäckare"],
  ["md", "Äventyrare"],
  ["lg", "Utmanare"],
  ["xl", "Ledare"],
];

const advancedIncrementers: [PortionKey, string][] = [
  ["VEGITARIAN", "Veg"],
  ["VEGAN", "Vegan"],
  ["DAIRY", "Laktos"],
  ["MP_ALLERGIES", "Mjölkprotein"],
  ["LEGUMINOUS", "Balj"],
  ["GLUTEN", "Gluten"],
];

const PortionSelector = () => {
  const portions = usePortions();

  const [showAdvanced, setShowAdvanced] = useState(anyAdvancedSelected(portions.portions));

  return (
    <Card offColor className="mb-3">
      <DropdownWrapper title="Portioner" defaultState={true}>
        <PortionIncrementerWrapper className="mt-3">
          {incrementers.map(([key, name]) => (
            <PortionIncrementer
              key={`INCREMENTER_${key}`}
              portionKey={key}
              name={name}
            />
          ))}
        </PortionIncrementerWrapper>
        <Label className="mr-2 mt-3">
          <strong>Avancerad?&nbsp;</strong>
        </Label>
        <input
          checked={showAdvanced}
          onChange={(e) => setShowAdvanced(e.target.checked)}
          type="checkbox"
        />

        {showAdvanced && (
          <PortionIncrementerWrapper className="mt-3">
            {advancedIncrementers.map(([key, name]) => (
              <PortionIncrementer
                advanced
                key={`INCREMENTER_${key}`}
                portionKey={key}
                name={name}
              />
            ))}
          </PortionIncrementerWrapper>
        )}
      </DropdownWrapper>
      <Text className="mb-0 mt-3">
        <strong>Totalt ≈ {Math.round(portions.getPortions())} portioner</strong>
      </Text>
    </Card>
  );
};

export default PortionSelector;
