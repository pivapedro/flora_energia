import { useState } from "react";
import { useSelector } from "react-redux";
import { ApplicationState } from "../../store";
import { Navbar } from "../Navbar";
import * as Style from "./style";
export const Header: React.FC<{}> = () => {
  const goToHomePage = () => {
    window.location.href = "https://floraenergia.com.br/";
  };
  const { navBar } = useSelector((state: ApplicationState) => state);

  return (
    <Style.Container>
      <div className="ContainerImage">
        <img
          onClick={goToHomePage}
          src={
            "https://staging.floraenergia.com.br/assets/Logo-Flora-White-080f3ab2.svg"
          }
          alt="logotipo flora"
        />
      </div>
      <div className="ContainerNav">
        <Navbar disabled={navBar.active === 0}>1 - Sobre você</Navbar>
        <Navbar disabled={navBar.active === 1}>2 - Proposta</Navbar>
        <Navbar disabled={navBar.active === 2}>3 - Assinatura</Navbar>
      </div>
    </Style.Container>
  );
};
