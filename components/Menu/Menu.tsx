import { useDrawer } from "../../utils/context/DrawerContext"
import { HeaderButton } from "../Styled/header"
import UnauthenticatedDrawerContent from "./components/UnauthenticatedDrawerContent"



const Menu = () => {
   
    const drawer = useDrawer()
    
    const setDrawer = () => {
        drawer.actions.setTitle("Logga in")
        drawer.actions.setContent(<UnauthenticatedDrawerContent/>)
        drawer.actions.setIsOpen(true)
    }

    return (
        <HeaderButton onClick={setDrawer}>
        <i className="fas fa-sign-in"></i>
      </HeaderButton>
    )
}

export default Menu;