import { useState } from "react";
import { useCart } from "../../utils/context/CartContext";
import { usePortions } from "../../utils/context/PortionContext";
import { Button } from "../Styled/Button";

const texts = {
  NONE: "Lägg till i kundvangn",
  PENDING: "Lägger till...",
  DONE: "Tillagd!",
};

const AddToCartButton: React.FC<{ recipie?: Recipie }> = ({ recipie }) => {
  const [state, setState] = useState<"NONE" | "PENDING" | "DONE">("NONE");
  const { addToCart, generateAlias } = useCart();
  const portions = usePortions();
  const onClick = () => {
    setState("PENDING");
    addToCart(
      {
        recipie,
        portions: portions.portions,
        alias: generateAlias(),
      },
      () => {
        setState("DONE");
        setTimeout(() => {
          setState("NONE");
        }, 2500);
      },
      () => {
        setState("NONE");
      }
    );
  };

  return (
    <Button onClick={onClick} disabled={state !== "NONE"} className="py-2">
      {texts[state]}
    </Button>
  );
};

export default AddToCartButton;
