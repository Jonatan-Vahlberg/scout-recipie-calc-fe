import styled from "styled-components";
import { usePortions } from "../../utils/context/PortionContext";
import Card from "../Card";
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

const PortionSelector = () => {
  const portions = usePortions();

  return (
    <Card offColor className="mb-3">
      <SubHeader>Portioner</SubHeader>

      <PortionIncrementerWrapper>
        {incrementers.map(([key, name]) => (
          <PortionIncrementer
            key={`INCREMENTER_${key}`}
            portionKey={key}
            name={name}
          />
        ))}
      </PortionIncrementerWrapper>
      <Text className="mb-0 mt-3"><strong>Totalt ≈ {Math.round(portions.getPortions())} portioner</strong></Text>
    </Card>
  );
};

export default PortionSelector;
