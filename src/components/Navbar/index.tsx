import * as Style from "./style";
import * as Types from "./types";
export const Navbar: React.FC<Types.Nav> = (props) => (
  <Style.Container {...props}>{props.children}</Style.Container>
);
