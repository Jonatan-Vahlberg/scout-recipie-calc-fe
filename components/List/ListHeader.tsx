import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useDebounce } from "use-hooks";
import { useList } from "../../utils/context/ListContext";
import Card from "../Card";
import { StyledInput } from "../Styled/Form";

const Wrapper = styled(Card)`
  display: flex;
  width: (100% + 32px);
  padding: 16px 16px;
  margin: -16px -16px 0;
  align-items: center;
  gap: 8px;
`;

const SearchBar = styled(StyledInput)`
  width: 100%;
  margin-bottom: 0;
`;

const ListHeader = () => {
  const list = useList();
  const [value, setValue] = useState(list.options.search || "");

  const debouncedValue = useDebounce(value, 300);
  const firstUpdate = useRef(false);
  useEffect(() => {
    if (firstUpdate.current) {
      if (debouncedValue === "") {
        list.setOptions((options) => {
          delete options.search;
          
          return {
            page: 1,
          };
        });
        return;
      }

      list.setOptions((options) => ({
        ...options,
        search: debouncedValue,
        page: 1,
      }));
    }
    firstUpdate.current = true;
  }, [debouncedValue]);

  return (
    <Wrapper offColor>
      <i className="fa fa-search"></i>
      <SearchBar
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type="search"
        placeholder="Sök..."
      />
    </Wrapper>
  );
};

export default ListHeader;
