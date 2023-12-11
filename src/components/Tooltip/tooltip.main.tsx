import React from "react";
import { Tooltip as ReactTooltip, PlacesType } from "react-tooltip";

const ToolTip = ({
  id,
  position = "bottom",
}: {
  id: string;
  position?: PlacesType;
}) => {
  // console.log("tooltip");
  return (
    <ReactTooltip
      place={position}
      id={id}
      noArrow
      className="!text-sm !bg-dark !px-3 !py-1 !rounded-lg transition-all duration-300"
    />
  );
};

export default ToolTip;
