import styled, { css } from "styled-components";
import { useList } from "../../utils/context/ListContext";
import Card from "../Card";
import FAB from "../Styled/FAB";
import ListItem, { Divider } from "./LIstItem";
import Paginator from "./Paginator";
import { FaPlus } from "react-icons/fa";
import { useEffect, useState } from "react";
import ListHeader from "./ListHeader";
import RecipieModal from "../RecipieCreator/RecipieCreationModal";

const ListBox = styled(Card)`
  height: calc(100vh - 170px);
  display: flex;
  flex-direction: column;
`;

const List = styled.div`
  overflow: auto;
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
  flex-grow: 1;
  width: 100%;
`;

const bottomLeft = css`
  bottom: 16px;
  right: 16px;
`;

const ListView = ({}) => {
  const list = useList();

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  

  useEffect(() => {
    list.getRecipies();
  }, [list.options]);

  return (
    <ListBox className="mt-3 ht-100">
      <ListHeader />
      <List>
        {list.recipies.results.map((recipie) => (
          <ListItem
            key={`LIST_ITEM${recipie.name}${recipie.id}`}
            recipie={recipie}
          />
        ))}
      </List>
      <Divider></Divider>
      <Paginator />
      <FAB position={bottomLeft} onClick={toggle}>
        <FaPlus />
      </FAB>
      <RecipieModal isOpen={isOpen} toggle={toggle} />
    </ListBox>
  );
};

export default ListView;
