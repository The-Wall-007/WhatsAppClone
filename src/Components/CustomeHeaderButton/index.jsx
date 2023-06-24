import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { HeaderButton } from "react-navigation-header-buttons";

import colors from "../../Constant/colors";

const CustomeHeaderButton = (props) => {
  return (
    <HeaderButton
      {...props}
      IconComponent={Ionicons}
      iconSize={23}
      color={props.color ?? colors.blue}
    />
  );
};

export default CustomeHeaderButton;
