import React from "react";
import styled, { FlattenSimpleInterpolation } from "styled-components";

const FloatingActionButton = styled.button<{ css: FlattenSimpleInterpolation }>`
  position: fixed;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: none;
  background-color: ${({ theme }) => theme.colors.primary[300]};
  color: ${({ theme }) => theme.colors.white};
  &:hover {
    background-color: ${({ theme }) => theme.colors.primary[500]};
  }
  right: 16px;
  bottom: 16px;
  ${({css}) => css};
`;

type FAB_Props = {
  position?: FlattenSimpleInterpolation;
  onClick?: VoidFunction;
  disabled?: boolean;
};

const FAB: React.FC<FAB_Props> = ({ children, onClick, disabled, position }) => {
  return (
    <FloatingActionButton css={position} onClick={onClick} disabled={disabled}>
      {children}
    </FloatingActionButton>
  );
};

export default FAB;
