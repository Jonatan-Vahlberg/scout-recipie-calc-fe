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
  console.log(user, user.token?.access);
  return (
    <>
      {!user.token?.access && (
        <HeaderButton onClick={setDrawer}>
          <i className="fas fa-sign-in"></i>
        </HeaderButton>
      )}
      {user.token?.access && (
        <HeaderButton onClick={user.actions.logout}>
          <i className="fas fa-sign-out"></i>
        </HeaderButton>
      )}
    </>
  );
};

export default Menu;
