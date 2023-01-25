import * as Style from "./styles";
import * as ITypes from "./types";

export const Form: React.FC<ITypes.IForm> = (props) => {
  return <Style.Container {...props}>{props.children}</Style.Container>;
};