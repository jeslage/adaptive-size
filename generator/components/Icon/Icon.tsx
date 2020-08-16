import React, { FC } from "react";
import * as icons from "./icons";

export type IconTypes = keyof typeof icons;

export interface IconProps {
  type: IconTypes;
}

const getIcon = (type: IconTypes) => icons[type];

const Icon: FC<IconProps> = ({ type }) => <>{getIcon(type)}</>;

export default Icon;
