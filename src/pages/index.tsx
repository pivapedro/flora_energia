import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import {
  Button,
  Checkbox,
  FormControlLabel,
  InputAdornment,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Form } from "../components/Form";
import { Header } from "../components/Header";
import { Input } from "../components/Input";
import * as Style from "./style";
import InputMask from "react-input-mask";

export const Home = () => {
  const [formData, setFormData] = useState<{ [x: string]: string | boolean }>(
    {}
  );
  const [errors, setErrors] = useState<{ [x: string]: boolean }>({});

  const errorObject = {
    error: true,
    InputProps: {
      endAdornment: (
        <InputAdornment position="end">
          <ErrorOutlineIcon color="error" />
        </InputAdornment>
      ),
    },
  };

  const OnChageValue = (name: string, value: string | boolean) => {
    if (value !== undefined || value !== "") {
      setFormData({
        ...formData,
        [name]: value,
      });
    }

    ValidateInput(name, value);
  };
  const enableValidation = (name: string) => {
    if (
      !errors[name] &&
      (formData[name] === undefined || formData[name] === "")
    ) {
      setErrors({
        ...errors,
        [name]: true,
      });
    }
  };
  const phoneValidator = (phone: string) => {
    var regex = new RegExp(
      "^((1[1-9])|([2-9][0-9]))((3[0-9]{3}[0-9]{4})|(9[0-9]{3}[0-9]{5}))$"
    );
    return regex.test(phone);
  };
  const nameValidator = (name: string) => {
    var regex = new RegExp(
      "^[A-Z][a-z]+(?:[ ][A-Z][a-z]+)*$"
    );
    return regex.test(name);
  };
  const emailValidator = (email: string) => {
    var regex = new RegExp("/^[a-z0-9.]+@[a-z0-9]+.[a-z]+.([a-z]+)?$/i");
    return regex.test(email);
  };
  const ValidateInput = (name: string, value: string | boolean) => {
    if (name === "tel") {
      if (phoneValidator(String(value))) {
        const { tel, ...rest } = errors;
        setErrors({
          ...rest,
        });
        return;
      }
    } else if (name === "name") {
      if (nameValidator(String(value))) {
        console.log('entrou')
        const { name, ...rest } = errors;
        setErrors({
          ...rest,
        });
        return;
      }
    } else if (name === "email") {
      if (emailValidator(String(value))) {
        const { email, ...rest } = errors;
        setErrors({
          ...rest,
        });
        return;
      }
    }

    setErrors({
      ...errors,
      [name]: true,
    });
  };
  useEffect(() => {
    console.log(errors);
    console.log(formData);
  }, [errors, formData]);
  return (
    <>
      <Header />
      <Style.Container>
        <h2> Nos fale mais sobre você!</h2>
        <Form>
          <div>
            <Input
              label="Nome completo *"
              variant="standard"
              onChange={(e) => OnChageValue("name", e.target.value)}
              onBlur={() => enableValidation("name")}
              name="name"
              fullWidth
              helperText={errors.name && "Nome é obrigátorio"}
              {...(errors.name ? errorObject : {})}
            />

            <InputMask
              mask="(99) 99999-9999"
              maskChar=" "
              onChange={(e) =>
                OnChageValue("tel", e.target.value.replace(/[^0-9]/g, ""))
              }
              name="tel"
              label="Celular *"
              variant="standard"
              fullWidth
              onBlur={() => enableValidation("tel")}
              helperText={errors.tel && "Celular é obrigátorio"}
              {...(errors.tel ? errorObject : {})}
            >
              {
                //@ts-ignore
                (props) => <Input {...props}></Input>
              }
            </InputMask>

            <Input
              onChange={(e) => OnChageValue("email", e.target.value)}
              name="email"
              label="E-mail *"
              variant="standard"
              fullWidth
              onBlur={() => enableValidation("email")}
              helperText={errors.name && "E-mail é obrigátorio"}
              {...(errors.email ? errorObject : {})}
            />
            <Input
              onChange={(e) => OnChageValue("code", e.target.value)}
              name="code"
              label="Código promocional"
              variant="standard"
              fullWidth
            />

            <p>Indique o imóvel para receber o desconto</p>
            <div className="checkbox">
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={(e) => OnChageValue("hasPDF", e.target.checked)}
                  />
                }
                label="Não possuo a conta de luz em PDF"
              />
            </div>
            <Button variant="outlined" color="primary" size="large">
              Enviar conta de luz
            </Button>
            <p className="description">
              Arquivo suportado: <strong>PDF</strong>
            </p>
            <p className="description">
              Fique tranquilo(a), você pode enviar sua conta de luz após o
              cadastro.{" "}
            </p>
            <div className="checkbox">
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={(e) => OnChageValue("terms", e.target.checked)}
                  />
                }
                label={
                  <>
                    {" "}
                    Concordo com as{" "}
                    <a
                      href="https://floraenergia.com.br/politica-de-privacidade/"
                      target="_blank"
                      rel="noreferrer"
                      style={{ color: "rgb(216, 144, 37)" }}
                    >
                      políticas de privacidade
                    </a>{" "}
                    e uso de cookies.
                  </>
                }
              />
            </div>
            <Button color="primary" size="large" disabled variant="contained">
              Avançar
            </Button>
          </div>
        </Form>{" "}
      </Style.Container>
    </>
  );
};
