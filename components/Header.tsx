import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import Card from "./Card";
import { Text } from "./Styled/Text";

export const Header = styled(Text)`
  color: ${({ theme }) => theme.colors.gray["900"]};
  font-weight: 900;
  font-size: 40px;
  line-height: 38px;
  margin-bottom: 0px;
  margin-left: 8px;
`;

export const HeaderWrapper = styled.div`
  cursor: pointer;

  &:hover {
    & p {
      color : ${({ theme }) => theme.colors.primary[200]};
    }
  }
`


const NavHeader: React.FC = () => {
  return (
    <Card>
      <Link href="/">
        <HeaderWrapper  className="d-flex align-items-center cursor-pointer">
        <Image src="/scout.png" alt="header-image" width={48} height={48} />
        <Header>Scoutrecpt kalkylator</Header>
        </HeaderWrapper>
      </Link>
    </Card>
  );
};

export default NavHeader;
