import styled, { css } from "styled-components"
import { useList } from "../../utils/context/ListContext"
import Card from "../Card"
import FAB from "../Styled/FAB"
import ListItem, { Divider } from "./LIstItem"
import Paginator from "./Paginator"
import {FaPlus} from "react-icons/fa"
import { useState } from "react"
import CreateNewRecipieModal from "./CreateNewRecipieModal"

const ListBox = styled(Card)`
    height: calc(100vh - 170px);
    display: flex;
    flex-direction: column;
`

const List = styled.div`
  overflow: auto;
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
  flex-grow: 1;
  width: 100%;
`

const bottomLeft = css`
  bottom: 16px;
  right: 16px;
`

const ListView = ({}) => {

  const recipieList = useList()
  
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen)

  return <ListBox className="mt-3 ht-100">
      <p>Search</p>
      <List>
        {recipieList.recipies.results.map((recipie) => (
         <ListItem recipie={recipie}/>
        ))}
      </List>
      <Divider></Divider>
      <Paginator/>
      <FAB position={bottomLeft} onClick={toggle}>
        <FaPlus/>
      </FAB>
      <CreateNewRecipieModal
        isOpen={isOpen}
        toggle={toggle}
      />
  </ListBox>
}


export default ListView