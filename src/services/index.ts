import axios, { AxiosRequestHeaders } from "axios";
// CABEÇALHO DA CHAMADAS
var headers = {
  "access-control-allow-origin": "*",
  "content-type": "application/json;charset=utf-8",
  "cache-control": "no-cache",
  crossDomain: "true",
};
const apiCEP = axios.create({
  baseURL: `https://viacep.com.br/`,
  headers,
});
export const apis = {
  getCep: (cep: string) => apiCEP.get(`ws/${cep}/json`),
};
