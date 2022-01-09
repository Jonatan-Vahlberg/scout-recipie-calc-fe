import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import styled from "styled-components";
import { SubHeader } from "../Styled/Text";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Dropdown = styled.div<{ isOpen: boolean }>`
  display: ${({ isOpen }) => (isOpen ? "initial" : "none")};
  transition: 0.2s;
  width: 100%;
`;

type DropdownProps = {
  title: string;
  defaultState?: boolean;
};

const DropdownWrapper: React.FC<DropdownProps> = ({ title, defaultState, children }) => {
  const [isOpen, setIsOpen] = useState(defaultState || false);
  const toggle = () => setIsOpen(!isOpen);

  const Icon = isOpen ? FaChevronUp : FaChevronDown;
  return (
    <Wrapper>
      <Header>
        <SubHeader className="mb-0">{title}</SubHeader>{" "}
        <SubHeader className="mb-0" onClick={toggle}>{<Icon/>}</SubHeader>
      </Header>
      <Dropdown isOpen={isOpen}>{children}</Dropdown>
    </Wrapper>
  );
};

export default DropdownWrapper;
