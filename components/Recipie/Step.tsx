import styled from "styled-components";
import Card from "../Card";
import { Text } from "../Styled/Text";

type StepProps = {
  step: string;
  index: number;
};

const StepIndex = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 14px;
  background-color: ${({ theme }) => theme.colors.primary[200]};
  color: ${({ theme }) => theme.colors.white};

  display: flex;
  align-items: center;
  justify-content: center;
`;

const StepWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;

  & p {
    margin-bottom: 0;
    padding-top: 4px;
  }
`;

const Step: React.FC<StepProps> = ({ step, index }) => {
  return (
    <Card className="w-100">
      <StepWrapper>
        <div>
          <StepIndex>{index}</StepIndex>
        </div>
        <Text className="mb-0">{step}</Text>
      </StepWrapper>
    </Card>
  );
};

export default Step;
