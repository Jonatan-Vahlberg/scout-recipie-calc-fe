import styled from "styled-components";
import { useCart } from "../../utils/context/CartContext";
import { usePortions } from "../../utils/context/PortionContext";
import Card from "../Card";
import { Text } from "../Styled/Text";

const RecipieCard = styled(Card)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const DeletionIcon = styled.i`
  font-size: 18px;
  cursor: pointer;
  padding: 4px;
  color: ${({ theme }) => theme.colors.primary[600]};
  transition: all 0.3s;
  &: hover {
    color: ${({ theme }) => theme.colors.primary[200]};
  }
`;

const RecipieItem: React.FC<{ item: CartItem }> = ({ item }) => {
  const { getPortions } = usePortions();
  const {removeFromCart} = useCart()
  return (
    <RecipieCard>
      <Text className="mb-0">
        <strong>
          {item.recipie.name} x{Math.round(getPortions(item.portions))}
        </strong>
      </Text>{" "}
      <DeletionIcon onClick={() => removeFromCart(item)} className="fa fa-trash-alt"></DeletionIcon>
    </RecipieCard>
  );
};

export default RecipieItem;
