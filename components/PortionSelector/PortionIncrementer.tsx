import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import styled from "styled-components";
import { usePortions } from "../../utils/context/PortionContext";
import { ButtonStyle } from "../Styled/Button";

const IncrementerWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const Button = styled.button<{noShadow?: boolean}>`
  width: 28px;
  height: 28px;
  border-radius: 14px;
  -webkit-box-shadow: ${({noShadow}) => noShadow ? "" : " -2px 2px 7px 1px rgba(0, 0, 0, 0.25)"};
  box-shadow: ${({noShadow}) => noShadow ? "" : " -2px 2px 7px 1px rgba(0, 0, 0, 0.25)"};
  ${ButtonStyle};
`;

const Span = styled.span<{advanced?: boolean}>`
  min-width: ${({advanced}) => advanced ? "110px" : "100px"};
  font-weight: 600;
`;

const Input = styled.input`
  width: 55px;
  border: none;
`;

type PortionsIncrementerInterface = {
  portionKey: PortionKey;
  name: string;
  advanced?: boolean;
};

const PortionIncrementer: React.FC<PortionsIncrementerInterface> = ({
  portionKey,
  name,
  advanced,
}) => {
  const { portions, incrementPortion, decrementPortion, alterPortionValue } =
    usePortions();
  
  return (
    <IncrementerWrapper>
      <Button onClick={() => decrementPortion(portionKey)}>
        <AiOutlineMinus />
      </Button>
      <Span advanced={advanced}>{name}</Span>
      <Input
        type="number"
        value={portions[portionKey]}
        onChange={(e) => alterPortionValue(portionKey, Number(e.target.value))}
      />
      <Button onClick={() => incrementPortion(portionKey)}>
        <AiOutlinePlus />
      </Button>
    </IncrementerWrapper>
  );
};

export default PortionIncrementer;
