import styled from "styled-components";
import {
  GiMilkCarton,
  GiSaltShaker,
  GiCarrot,
  GiOrangeSlice,
  GiFlour,
} from "react-icons/gi";
import React from "react";
import { IconType } from "react-icons";

const Indicator = styled.div<{small?: boolean}>`

  width: ${({ small }) =>  small ? "22px" : "28px"};
  height: ${({ small }) =>  small ? "22px" : "28px"};
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ color }) => color};
  color: white;

  & svg {
    width: 18px;
    height: 18px;
  }
`;
type CategoryInfo = [IconType, string];

const categoryStyles: {
  FRUIT: CategoryInfo;
  VEGETABLE: CategoryInfo;
  REFRIGERATED: CategoryInfo;
  DRY_GOOD: CategoryInfo;
  SPICE: CategoryInfo;
} = {
  FRUIT: [GiOrangeSlice, "#ed9121"],
  VEGETABLE: [GiCarrot, "#059033"],
  REFRIGERATED: [GiMilkCarton, "#1865ba"],
  SPICE: [GiSaltShaker, "#8c4733"],
  DRY_GOOD: [GiFlour, "#C74E5A"],
};

const CategoryIndicator: React.FC<{ category: Category, small?: boolean }> = ({ category, small }) => {
  const [Icon, color] = categoryStyles[category];
  return (
    <Indicator color={color} small={small}>
      <Icon />
    </Indicator>
  );
};

export default CategoryIndicator;
