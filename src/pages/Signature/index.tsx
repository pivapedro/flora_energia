import * as Style from "./style";
import { Document, Page, pdfjs } from "react-pdf/dist/esm/entry.webpack5";
import { useSelector } from "react-redux";
import { ApplicationState } from "../../store";
import { useEffect, useState } from "react";
import { Input } from "../../components/Input";
import { Form } from "../../components/Form";

export const Signature = () => {
  const { user } = useSelector((state: ApplicationState) => state);
  const [page, setPage] = useState(1);

  console.log(user);
  const [width, setWidth] = useState<number>(window.innerWidth);

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }
  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  const isMobile = width <= 768;
  if (page === 0) {
    return (
      <Style.Container>
        <Form>
          <div>
            <h2>Quase lá!</h2>
            <Input
              variant="standard"
              color={"success"}
              label="CPF / CNPJ do titular"
            />
          </div>
        </Form>
      </Style.Container>
    );
  }
  return (
    <Style.Container>
      {" "}
      <Document file={`/termo.pdf`}>
        <Page pageNumber={1} width={isMobile ? 300 : 600} />
        <Page pageNumber={2} width={isMobile ? 300 : 600} />
      </Document>
    </Style.Container>
  );
};
