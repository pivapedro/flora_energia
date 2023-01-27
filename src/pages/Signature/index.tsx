import * as Style from "./style";
import { Document, Page, pdfjs } from "react-pdf/dist/esm/entry.webpack5";
import { useSelector } from "react-redux";
import { ApplicationState } from "../../store";
import { useEffect } from "react";

export const Signature = () => {
  const { user } = useSelector((state: ApplicationState) => state);

  console.log(user);
/* 
  useEffect(() => {
    pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  }, []); */
  return (
    <Style.Container>
      {" "}
      <Document file={`/termo.pdf`}>
        <Page pageNumber={1}  width={600}  />
        <Page pageNumber={2}  width={600} />
       </Document>
    </Style.Container>
  );
};
