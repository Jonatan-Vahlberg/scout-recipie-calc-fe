import styled from "styled-components";

export const Text = styled.p`
  color: ${({ theme }) => theme.colors.black};
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  margin-bottom: 8px;
  margin-top: 0px;
`;

export const Header = styled(Text)`
  color: ${({ theme }) => theme.colors.gray["900"]};
  font-weight: 900;
  font-size: 38px;
  margin-bottom: 16px;
`;

export const SubHeader = styled(Text)`
  color: ${({ theme }) => theme.colors.gray["900"]};
  font-weight: 700;
  font-size: 20px;
  margin-bottom: 16px;
`;
