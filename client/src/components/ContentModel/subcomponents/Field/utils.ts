import { IconType } from "react-icons";
import { VscJson } from "react-icons/vsc";
import { ImListNumbered } from "react-icons/im";
import { GrTextAlignLeft } from "react-icons/gr";
import { AiFillFileUnknown } from "react-icons/ai";

export const getFieldIcon = (type: string) => {
  let Icon: IconType;
  switch (type) {
    case "json":
      Icon = VscJson;
      break;
    case "number":
      Icon = ImListNumbered;
      break;
    case "text":
      Icon = GrTextAlignLeft;
      break;
    default:
      Icon = AiFillFileUnknown;
      break;
  }
  return Icon;
};
