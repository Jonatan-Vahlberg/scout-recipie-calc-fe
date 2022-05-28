import { Field } from "formik";
import styled, { css } from "styled-components";
import { ButtonStyle, ColorGray } from "./Button";

export const FieldStyle = css`
  border: none;
  padding: 4px 8px;
  width: 100%;
  margin-bottom: 16px;
`;

export const StyledField = styled(Field)`
  ${FieldStyle}
`;

export const StyledError = styled.p<{ touched?: boolean }>`
  display: ${({ touched}) =>  touched ? "block" : "none"};
  color: ${({theme}) => theme.colors.error}
`

export const FormButton = styled.button<{ cancel?: boolean }>`
  width: 100%;
  height: 40px;
  border-radius: 0;
  font-weight: 700;
  ${ButtonStyle};
  margin: 16px 0px 0px;

  ${({cancel}) => cancel ? ColorGray : ''}
`;

export const TertiaryFormButton = styled.button`
  border: 0;
  background-color: transparent;
  color: ${({theme}) => theme.colors.primary[300]};
  width: 100%;
  text-align: center;
  padding: 8px;
  margin-top: 16px;
  transition: all 0.3s;
  &:hover {
    color: ${({theme}) => theme.colors.primary[500]};
  }
`

export const StyledInput = styled.input`
  ${FieldStyle}
`;

export const Label = styled.label`
  &.required {
    font-weight: 700;
  }
  &.required:after {
    content: "*";
    font-size: 16px;
    color: ${({ theme }) => theme.colors.primary[500]};
  }
`;
