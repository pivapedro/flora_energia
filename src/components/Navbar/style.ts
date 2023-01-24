import styled from "styled-components";
import { Nav } from "./types";

export const Container = styled.button<Nav>`
  flex: 1 1 0%;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  height: 1.9rem;
  border: 0px;
  color: rgb(28, 27, 31);
  font-size: 1rem;
  background: ${({ disabled }) =>
    disabled ? "rgb(249, 175, 64)" : "rgb(230, 225, 229)"};
  font-weight: ${({ disabled }) => (disabled ? "700" : "300")};
  cursor: ${({ disabled }) => (disabled ? "pointer" : "not-allowed")};
`;
