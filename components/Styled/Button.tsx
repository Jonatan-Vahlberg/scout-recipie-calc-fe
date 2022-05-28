import styled, { css } from "styled-components";

export const ColorPrimary = css`
  background-color: ${({ theme }) => theme.colors.primary[300]};
  color: ${({ theme }) => theme.colors.white};
  transition: all 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary[500]};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.primary[100]};
    cursor: not-allowed;
    &:hover {
      background-color: ${({ theme }) => theme.colors.primary[100]};
    }
  }
`;

export const ColorGray = css`
  background-color: ${({ theme }) => theme.colors.gray[300]};
  color: ${({ theme }) => theme.colors.gray[900]};

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray[500]};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.gray[300]};
    cursor: not-allowed;
    &:hover {
      background-color: ${({ theme }) => theme.colors.gray[300]};
    }
  }
`;

export const ButtonStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  font-size: 16px;
  line-height: 19px;
  padding: 4px 8px;
  transition: all 0.3s;
  ${ColorPrimary}
`;

export const Button = styled.button<{gray?: boolean}>`
  ${ButtonStyle}
  ${({gray}) => gray ? ColorGray : ""}
`
