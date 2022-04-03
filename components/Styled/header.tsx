import styled from "styled-components";

export const HeaderButton = styled.button<{ length?: string }>`
position: relative;
background-color: transparent;
border: none;
height: 32px;
width: 32px;
border-radius: 50%;
font-size: 28px;
display: flex;
align-items: center;
justify-content: center;

&::after {
  position: absolute;
  right: -10px;
  top: -10px;
  content: ${({ length }) => length || "none"};
  width: 24px;
  height: 24px;
  font-size: 11px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.primary[200]};
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
}
`;