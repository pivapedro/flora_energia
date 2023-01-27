import * as Style from "./style";
export const Loading = () => {
  return (
    <Style.Container>
      <img
        className=""
        src="https://staging.floraenergia.com.br/assets/Loading1-09ca41a7.svg"
        alt="Logo flora carregamento um"
      />
      <img
        src="https://staging.floraenergia.com.br/assets/Loading2-7e874aea.svg"
        alt="Logo flora carregamento dois"
        className=""
      />
      <img
        src="https://staging.floraenergia.com.br/assets/Loading3-9137172f.svg"
        alt="Logo flora carregamento três"
        className="selected"
      />
      <img
        src="https://staging.floraenergia.com.br/assets/Loading4-3ffa8cea.svg"
        alt="Logo flora carregamento quatro"
      />
    </Style.Container>
  );
};
