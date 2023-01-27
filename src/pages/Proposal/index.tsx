import { Button, Divider } from "@mui/material";
import { Form } from "../../components/Form";
import { Input } from "../../components/Input";
import * as Style from "./styles";
import { NumericFormat } from "react-number-format";
import { useEffect, useState } from "react";
import { ApplicationState } from "../../store";
import { useSelector } from "react-redux";
import { IUser } from "../../store/ducks/User/types";
export const Proposal = () => {
  const OnChageValue = (name: string, value: string | boolean | number) => {
    if (value !== undefined || value !== "") {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
  const [autoFocus, setAutoFocus] = useState<boolean>(false);
  const { user } = useSelector((state: ApplicationState) => state);
  const [formData, setFormData] = useState<IUser>({});
  useEffect(() => {
    setFormData(user);
  }, [user]);
  return (
    <Style.Container>
      <h2> Aqui está sua proposta!</h2>
      <Form>
        <label className="border">
          Quanto você paga atualmente
          <NumericFormat
            valueIsNumericString={true}
            autoFocus={autoFocus}
            value={formData?.invoiceAmount}
            onFocus={() => setAutoFocus(true)}
            onBlur={() => {
              setAutoFocus(false);
            }}
            customInput={(props: any) => (
              <Input variant="standard" color={"success"} {...props} />
            )}
            onValueChange={(values, sourceInfo) => {
              if (values.floatValue)
                OnChageValue("invoiceAmount", values.floatValue);
            }}
            decimalScale={2}
            thousandSeparator={"."}
            prefix={"R$ "}
            decimalSeparator={","}
          />
        </label>
        <div className="border">
          <label className="semiBold">
            <span>Quanto você passará a pagar</span>
            <span className="bold">
              R${" "}
              {typeof formData?.invoiceAmount === "number" &&
                (
                  (formData?.invoiceAmount * 50.56) / 100 +
                  (formData?.invoiceAmount * 43.02) / 100
                ).toFixed(2)}
            </span>
          </label>

          <label>
            <span>Conta de luz da CPFL Paulista</span>
            <span>
              R${" "}
              {typeof formData?.invoiceAmount === "number" &&
                ((formData?.invoiceAmount * 50.56) / 100)?.toFixed(2)}
            </span>
          </label>
          <label>
            <span>Fatura Flora </span>
            <span>
              R${" "}
              {typeof formData?.invoiceAmount === "number" &&
                ((formData?.invoiceAmount * 43.02) / 100)?.toFixed(2)}
            </span>
          </label>
        </div>
        <label className="border bold">
          <span className="bold">Economia mensal</span>
          <span className="bold large">R$ 93,58</span>
        </label>
        <label className="bold">
          <span className="bold">Economia anual</span>
          <span className="bold large">R$ 93,58</span>
        </label>

        <p className="title">Garantia de economia</p>
        <p>
          Sua conta de luz com a distribuidora somada a fatura Flora, será{" "}
          <b>sempre menor</b> do que a sua conta de luz atual.
        </p>
        <div>
          <p className="title">Sem prazo ou multa contratual</p>
          <p>
            Basta solicitar seu desligamento com um aviso prévio de 90 dias.
          </p>
        </div>
        <Button color="primary" size="large" variant="contained">
          Avançar
        </Button>
      </Form>
    </Style.Container>
  );
};
