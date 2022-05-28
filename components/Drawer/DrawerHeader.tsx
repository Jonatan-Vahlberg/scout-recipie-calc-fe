import styled from "styled-components";
import { useDrawer } from "../../utils/context/DrawerContext";
import { Header } from "../Styled/Text";

const CloseIcon = styled.i.attrs({ className: "fa fa-times" })`
color: ${({ theme }) => theme.colors.primary[500]};
position: absolute;
right: 16px;
top: 25px;
`;

const DrawerHeader = () => {
    const drawer = useDrawer()
    return (
        <div>
            <Header>{drawer?.title}</Header>
            <CloseIcon onClick={() => drawer.actions.setIsOpen(false)} />
        </div>
    )
}

export default DrawerHeader;