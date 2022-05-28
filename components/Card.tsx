import styled from "styled-components";

const Wrapper = styled.div<{
  rounded?: boolean;
  offColor?: boolean;
  theme: object;
}>`
  padding: 16px;
  background: ${({ theme, offColor }) =>
    offColor ? theme.colors.gray[300] : theme.colors.white};
  corner-radius: ${({ rounded }) => (rounded ? "3px" : "0px")};
`;

type CardProps = {
  rounded?: boolean;
  offColor?: boolean;
  [key: string]: any;
};

const Card: React.FC<CardProps> = ({ children, ...props }) => {
  return <Wrapper {...props}>{children}</Wrapper>;
};

export default Card;
