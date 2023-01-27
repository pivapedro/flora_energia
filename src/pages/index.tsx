import { useSelector } from "react-redux";
import { Header } from "../components/Header";
import { ApplicationState } from "../store";
import { About } from "./About";
import { Proposal } from "./Proposal";

export const Home = () => {
  const { navBar } = useSelector((state: ApplicationState) => state);
  return (
    <>
      <Header />
      {navBar.active === 0 && <About />}
      {navBar.active === 1 && <Proposal />}
    </>
  );
};
