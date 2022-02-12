import styled from "styled-components";
import {
  GiMilkCarton,
  GiSaltShaker,
  GiCarrot,
  GiOrangeSlice,
  GiFlour,
  GiMeat,
  GiBigEgg,
  GiBeanstalk,
} from "react-icons/gi";
import React from "react";
import { IconType } from "react-icons";

const Indicator = styled.div<{small?: boolean}>`
  position: relative;
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

const RedBar = styled.div`
  position: absolute;
  height: 95%;
  width: 2px;
  background-color: red;
  transform: rotate(45deg);
`

type CategoryInfo = [IconType, string];

const replacementStyles: {
  VEGITARIAN: CategoryInfo;
  VEGAN: CategoryInfo;
  DAIRY: CategoryInfo;
  MP_ALLERGIES: CategoryInfo;
  GLUTEN: CategoryInfo;
  LEGUMINOUS: CategoryInfo;
} = {
  VEGITARIAN: [GiMeat, "#000"],
  VEGAN: [GiBigEgg, "#000"],
  DAIRY: [GiMilkCarton, "#000"],
  MP_ALLERGIES: [GiMilkCarton, "#000"],
  GLUTEN: [GiFlour, "#000"],
  LEGUMINOUS: [GiBeanstalk, "#000"],
};

const ReplacementIndicator: React.FC<{ reason: Reason, small?: boolean }> = ({ reason, small }) => {
  const [Icon, color] = replacementStyles[reason];
  return (
    <Indicator color={color} small={small}>
      <RedBar/>
      <Icon />
    </Indicator>
  );
};

export default ReplacementIndicator;
