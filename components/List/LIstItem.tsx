import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import { Text } from "../Styled/Text";

const ListItemWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 8px 0;

  & img {
    width: 100px;
    height: 100px;
  }
`;

const Fallback = styled(Image).attrs({width: 100, height: 100})`
  width: 100px;
  height: 100px;
  margin-right: 16px;
`

export const Divider = styled.hr`
margin: 0;
color: ${({ theme }) => theme.colors.gray[100]}
width: 100%;
`;

type ListItemProps = {
  recipie: Recipie;
};

const ListItem: React.FC<ListItemProps> = ({recipie}) => {
  return (
    <div>
      <Link href={`/${recipie.id}`}>
      <a>

      <ListItemWrapper>
        {recipie.image_link && <img src={recipie.image_link} />}
        {!recipie.image_link && <Fallback src='/no_img.png' />}
        <Text>
          <strong>{recipie.name}</strong>
        </Text>
      </ListItemWrapper>
      </a>
      </Link>
      <Divider></Divider>
    </div>
  );
};

export default ListItem;
