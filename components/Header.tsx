import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
import Card from "./Card";
import CartComponent from "./Cart/CartComponent";
import { Text } from "./Styled/Text";

const HeaderBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Header = styled(Text)`
  color: ${({ theme }) => theme.colors.gray["900"]};
  font-weight: 900;
  font-size: 40px;
  line-height: 38px;
  margin-bottom: 0px;
  margin-left: 8px;
  flex-shrink: 1;
`;

export const HeaderWrapper = styled.div`
  cursor: pointer;

  &:hover {
    & p {
      color: ${({ theme }) => theme.colors.primary[200]};
    }
  }
`;

const Unclickable = styled.div`
  pointer-events: none;
`;

const NavHeader: React.FC = () => {
  const router = useRouter();
  const Wrapper = router.pathname === "/" ? Unclickable : Link;
  return (
    <Card>
      <HeaderBar>
        <Wrapper href="/">
          <HeaderWrapper className="d-flex align-items-center cursor-pointer">
            <Image src="/scout.png" alt="header-image" width={48} height={48} />
            <Header>Scoutrecpt kalkylator</Header>
          </HeaderWrapper>
        </Wrapper>
        <CartComponent />
      </HeaderBar>
    </Card>
  );
};

export default NavHeader;
