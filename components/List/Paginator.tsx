import styled from "styled-components"
import { useList } from "../../utils/context/ListContext"
import {Button} from "../PortionSelector/PortionIncrementer"
import {AiOutlineArrowLeft, AiOutlineArrowRight} from 'react-icons/ai'
import { Text } from "../Styled/Text"
const PaginationWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
`

const PagerButton = styled(Button)`
  width: 80px;
  height: 40px;
  border-radius: 0;
`

const Paginator = () => {

  const {options, setOptions, recipies} = useList()

  return (
    <PaginationWrapper>
      <PagerButton>
        <AiOutlineArrowLeft/>
      </PagerButton>
      <Text><strong>{options.page}</strong></Text>
      <PagerButton>
        <AiOutlineArrowRight/>
      </PagerButton>
    </PaginationWrapper>
  )
}

export default Paginator