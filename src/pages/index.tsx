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
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import cep from "cep-promise";
import PostAddIcon from "@mui/icons-material/PostAdd";
export const Home = () => {
  const [formData, setFormData] = useState<{
    [x: string]: string | boolean | number;
  }>({
    hasPDF: true,
    invoiceAmount: 0,
  });
  const [adress, setAdress] = useState<{ street?: string }>({});
  const [errors, setErrors] = useState<{ [x: string]: boolean }>({});
  const [value, setValue] = useState();
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

  const convertBase64 = async (file: File) => {
    const data: Promise<string | ArrayBuffer | null> = new Promise(
      (resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);

        fileReader.onload = () => {
          resolve(fileReader.result);
        };

        fileReader.onerror = (error) => {
          reject(error);
        };
      }
    );
    const base = await data;
    return String(base).split("base64,")[1];
  };

  const setDocument = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e?.target && e?.target?.files?.length) {
      const data: string = await convertBase64(e.target.files[0]);
      setFormData({
        ...formData,
        document: data,
        documentName: e?.target?.files[0].name,
        documentSize: e?.target?.files[0].size,
      });
    }
  };
  const sucessObject: { color: "success"; error?: boolean; InputProps: any } = {
    error: false,
    color: "success",
    InputProps: {
      endAdornment: (
        <InputAdornment position="end">
          <CheckCircleOutlineIcon color="success" />
        </InputAdornment>
      ),
    },
  };

  const OnChageValue = (name: string, value: string | boolean | number) => {
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
    var regex = new RegExp("^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$");
    return regex.test(name);
  };
  const emailValidator = (email: string) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };
  const cepValidator = (cep: string) => {
    return cep.match(/^[0-9]{5}-[0-9]{3}$/);
  };
  const getCep = async (value: string) => {
    try {
      const data = await cep(value);
      if (data.street) setAdress(data);
    } catch (error) {
      console.log(error);
    }
  };
  const ValidateInput = (name: string, value: string | boolean | number) => {
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
    } else if (name === "CEP") {
      if (cepValidator(String(value))) {
        const { CEP, ...rest } = errors;
        setErrors({
          ...rest,
        });
        getCep(String(value).replace(/[^0-9]/g, ""));
        return;
      }
    }

    setErrors({
      ...errors,
      [name]: true,
    });
  };
  const formatBytes = (bytes, decimals = 2) => {
    if (!+bytes) return "0 Bytes";

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
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
              helperText={
                errors.name && String(formData.name).length === 0
                  ? "Nome é obrigátorio"
                  : errors.name && "Insira um nome valido"
              }
              {...(errors.name ? errorObject : {})}
              {...(!errors?.name && formData?.name ? sucessObject : {})}
            />

            <InputMask
              mask="(99) 9 9999-9999"
              maskChar=" "
              onChange={(e) =>
                OnChageValue("tel", e.target.value.replace(/[^0-9]/g, ""))
              }
              name="tel"
              label="Celular *"
              variant="standard"
              fullWidth
              onBlur={() => enableValidation("tel")}
              helperText={
                errors.tel && String(formData.tel).length === 0
                  ? "Celular é obrigátorio"
                  : errors.tel && "Por favor digite um celular válido"
              }
              {...(errors.tel ? errorObject : {})}
              {...(!errors?.tel && formData?.tel ? sucessObject : {})}
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
              helperText={
                errors.email && String(formData.email).length === 0
                  ? "E-mail é obrigátorio"
                  : errors.email && "Por favor digite um e-mail válido"
              }
              {...(errors.email ? errorObject : {})}
              {...(!errors?.email && formData?.email ? sucessObject : {})}
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
                    onChange={(e) => OnChageValue("hasPDF", !e.target.checked)}
                  />
                }
                label="Não possuo a conta de luz em PDF"
              />
            </div>
            {formData.hasPDF ? (
              <>
                <Button
                  variant="outlined"
                  color="primary"
                  size="large"
                  component="label"
                >
                  <input
                    type="file"
                    hidden
                    accept="application/pdf"
                    onChange={(e) => setDocument(e)}
                  />
                  Enviar conta de luz
                </Button>
              </>
            ) : (
              <>
                <Input
                  onChange={(e) =>
                    OnChageValue(
                      "invoiceAmount",
                      e.target.value.replace(/[^0-9]/g, "")
                    )
                  }
                  type="number"
                  name="invoiceAmount"
                  label="Valor médio da conta de luz *"
                  variant="standard"
                  fullWidth
                />
                <InputMask
                  mask="99999-999"
                  maskChar=" "
                  onChange={(e) => OnChageValue("CEP", e.target.value)}
                  value={String(formData.CEP)}
                  name="CEP"
                  label="CEP *"
                  fullWidth={!Boolean(!errors?.CEP && formData?.CEP)}
                  variant="standard"
                  onBlur={() => enableValidation("CEP")}
                  helperText={
                    errors.CEP && String(formData.CEP).length === 0
                      ? "CEP é obrigátorio"
                      : errors.CEP && "Por favor digite um CEP válido"
                  }
                  {...(errors.CEP ? errorObject : {})}
                  {...(!errors?.CEP && formData?.CEP ? sucessObject : {})}
                >
                  {
                    //@ts-ignore
                    (props) => <Input {...props}></Input>
                  }
                </InputMask>
                <Input
                  name="street"
                  value={adress.street}
                  disabled
                  variant="standard"
                  fullWidth
                />
                <Input
                  onChange={(e) => OnChageValue("number", e.target.value)}
                  name="number"
                  label="Número *"
                  variant="standard"
                  fullWidth
                />
                <Input
                  onChange={(e) => OnChageValue("complement", e.target.value)}
                  name="complement"
                  label="Complemento"
                  variant="standard"
                  fullWidth
                />
              </>
            )}

            <p className="description">
              Arquivo suportado: <strong>PDF</strong>
            </p>
            {!formData?.document ? (
              <p className="description">
                Fique tranquilo(a), você pode enviar sua conta de luz após o
                cadastro.
              </p>
            ) : (
              <div className="card">
                <PostAddIcon />
                <p className="name">
                  {`${formData.documentName}`}
                  <br />
                  <span>{` ${formatBytes(formData.documentSize)}`}</span>
                </p>
              </div>
            )}

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
