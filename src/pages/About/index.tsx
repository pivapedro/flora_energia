import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import {
  Button,
  Checkbox,
  FormControlLabel,
  InputAdornment,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Form } from "../../components/Form";
import { Input } from "../../components/Input";
import * as Style from "./style";
import InputMask from "react-input-mask";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import cep from "cep-promise";
import PostAddIcon from "@mui/icons-material/PostAdd";
import { useDispatch, useSelector } from "react-redux";
import { NumericFormat } from "react-number-format";
import { ApplicationState } from "../../store";
import { IUser } from "../../store/ducks/User/types";

export const About = () => {
  const [formData, setFormData] = useState<IUser>({
    hasPDF: true,
    invoiceAmount: 0,
  });
  const [adress, setAdress] = useState<{ street?: string }>({});
  const [autoFocus, setAutoFocus] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ [x: string]: boolean }>({});
  const dispatch = useDispatch();
  const { navBar } = useSelector((state: ApplicationState) => state);

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
      const data = await cep(value)
        .then((data) => data)
        .catch((error) => {
          setErrors({
            ...errors,
            CEP: true,
          });
          setAdress({});
          return { street: "" };
        });
      if (data.street) setAdress(data);
    } catch (error) {
      console.log(error);
    }
  };
  const ValidateInput = (name: string, value: string | boolean | number) => {
    if (
      name === "hasPDF" ||
      name === "invoiceAmount" ||
      name === "terms" ||
      name === "complement" ||
      name === "code" ||
      name === "complete"
    ) {
      return;
    }
    if (name === "number") {
      if (String(value).length > 0) {
        const { number, ...rest } = errors;
        setErrors({
          ...rest,
        });
        return;
      }
    }
    if (name === "phone") {
      if (phoneValidator(String(value))) {
        const { phone, ...rest } = errors;
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
    } else if (name === "number") {
      if (typeof value === "string" && value.length) {
        const { number, ...rest } = errors;
        setErrors({
          ...rest,
        });
      }
    }

    setErrors({
      ...errors,
      [name]: true,
    });
  };
  console.log(errors)

  const formatBytes = (bytes, decimals = 2) => {
    if (!+bytes) return "0 Bytes";

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
  };
  const subimitForm = () => {
    dispatch({ type: "@nav/SET_OPTION", active: 1 });
    dispatch({ type: "@user/SET_USER", user: formData });
  };

  useEffect(() => {
    if (!formData.hasPDF) {
      const { document, documentName, documentSize, ...rest } = formData;
      setFormData({ ...rest });
    } else {
      const { CEP, number, invoiceAmount, ...rest } = formData;
      setFormData({ ...rest });
    }
  }, [formData?.hasPDF]);
  useEffect(() => {
    if (Object.keys(errors).length === 0) {
      if (
        !formData.hasPDF &&
        !!formData.CEP &&
        !!formData.email &&
        !!formData.invoiceAmount &&
        !!formData.name &&
        !!formData.number &&
        !!formData.terms &&
        !!formData.phone
      ) {
        if (!formData?.complete) {
          setFormData({
            ...formData,
            complete: true,
          });
        }
      } else if (
        formData.hasPDF &&
        !!formData.email &&
        !!formData.name &&
        !!formData.terms &&
        !!formData.document
      ) {
        if (!formData?.complete) {
          setFormData({
            ...formData,
            complete: true,
          });
        }
      } else {
        if (formData.complete)
          setFormData({
            ...formData,
            complete: false,
          });
      }
    }

    console.log(formData);
  }, [formData, errors]);

  return (
    <>
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
                OnChageValue("phone", e.target.value.replace(/[^0-9]/g, ""))
              }
              name="phone"
              label="Celular *"
              variant="standard"
              fullWidth
              onBlur={() => enableValidation("phone")}
              helperText={
                errors.phone && String(formData.phone).length === 0
                  ? "Celular é obrigátorio"
                  : errors.phone && "Por favor digite um celular válido"
              }
              {...(errors.phone ? errorObject : {})}
              {...(!errors?.phone && formData?.phone ? sucessObject : {})}
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
                <div>
                  <div>
                    <NumericFormat
                      valueIsNumericString={true}
                      name="invoiceAmount"
                      onBlur={() => {
                        enableValidation("invoiceAmount");
                        setAutoFocus(false);
                      }}
                      onFocus={() => setAutoFocus(true)}
                      autoFocus={autoFocus}
                      customInput={(props: any) => (
                        <Input
                          variant="standard"
                          label="Valor médio da conta de luz *"
                          type="number"
                          fullWidth
                          color={"success"}
                          {...props}
                        />
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
                  </div>
                </div>
                {!adress.street ? (
                  <InputMask
                    mask="99999-999"
                    maskChar=" "
                    onChange={(e) => OnChageValue("CEP", e.target.value)}
                    value={String(formData.CEP)}
                    name="CEP"
                    label="CEP *"
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
                ) : (
                  <div className="wrapperContainer">
                    <InputMask
                      mask="99999-999"
                      maskChar=" "
                      onChange={(e) => OnChageValue("CEP", e.target.value)}
                      value={String(formData.CEP)}
                      name="CEP"
                      label="CEP *"
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
                      label="Endereço"
                      name="street"
                      value={adress.street}
                      variant="standard"
                      fullWidth
                      {...sucessObject}
                    />
                    <Input
                      onChange={(e) => OnChageValue("number", e.target.value)}
                      name="number"
                      type="number"
                      helperText={
                        errors.number && String(formData.number).length === 0
                          ? "Número é obrigatório"
                          : ""
                      }
                      {...(errors.number ? errorObject : {})}
                      {...(!errors?.number && formData?.number
                        ? sucessObject
                        : {})}
                      onBlur={() => enableValidation("number")}
                      label="Número *"
                      variant="standard"
                    />
                    <Input
                      onChange={(e) =>
                        OnChageValue("complement", e.target.value)
                      }
                      name="complement"
                      label="Complemento"
                      variant="standard"
                    />
                  </div>
                )}
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
            <Button
              color="primary"
              size="large"
              disabled={!formData?.complete}
              variant="contained"
              onClick={subimitForm}
            >
              Avançar
            </Button>
          </div>
        </Form>{" "}
      </Style.Container>
    </>
  );
};
