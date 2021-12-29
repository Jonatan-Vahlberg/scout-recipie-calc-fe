import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import styled from "styled-components";
import { usePortions } from "../../utils/context/PortionContext";

const IncrementerWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const Button = styled.button`
  border: none;
  width: 28px;
  height: 28px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  -webkit-box-shadow: -2px 2px 7px 1px rgba(0, 0, 0, 0.25);
  box-shadow: -2px 2px 7px 1px rgba(0, 0, 0, 0.25);

  background-color: ${({ theme }) => theme.colors.primary[200]};
  color: ${({ theme }) => theme.colors.white};
  transition: all 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary[300]};
  }
`;

const Span = styled.span`
  min-width: 90px;
  font-weight: 600;
`;

const Input = styled.input`
  width: 55px;
  border: none;
`;

type PortionsIncrementerInterface = {
  portionKey: PortionKey;
  name: string;
};

const PortionIncrementer: React.FC<PortionsIncrementerInterface> = ({
  portionKey,
  name,
}) => {
  const { portions, incrementPortion, decrementPortion, alterPortionValue } =
    usePortions();

  return (
    <IncrementerWrapper>
      <Button onClick={() => decrementPortion(portionKey)}>
        <AiOutlineMinus />
      </Button>
      <Span>{name}</Span>
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
