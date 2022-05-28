import { useDrawer } from "../../utils/context/DrawerContext";
import { useUser } from "../../utils/context/UserContext";
import { HeaderButton } from "../Styled/header";
import UnauthenticatedDrawerContent from "./components/UnauthenticatedDrawerContent";

const Menu = () => {
  const drawer = useDrawer();
  const user = useUser();

  const setDrawer = () => {
    drawer.actions.setTitle("Logga in");
    drawer.actions.setContent(<UnauthenticatedDrawerContent />);
    drawer.actions.setIsOpen(true);
  };
  
  return (
    <>
      {!user.user && (
        <HeaderButton onClick={setDrawer}>
          <i className="fas fa-user-alt"></i>
        </HeaderButton>
      )}
      {user.user && (
        <HeaderButton onClick={user.actions.logout}>
          <i className="fas fa-door-closed"></i>
        </HeaderButton>
      )}
    </>
  );
};

export default Menu;
