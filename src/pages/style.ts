import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  width: 100%;
  height: 100%;
  & > h2 {
    margin: 3rem 0px 1rem;
    color: rgb(28, 27, 31);
    font-size: 1.5rem;
    font-weight: 500;
    text-align: center;
  }
  & > form > div > div.checkbox {
    width: 100%;
    margin: 10px 0;
  }
  & > form > div > button {
    width: 100%;
    max-width: 550px;
  }
  & > form > div {
    width: 100%;
    padding: 0px 2.5rem;
    display: flex;
    flex-direction: column;
    gap: 10px;
    & > div > label.Mui-focused,
    & > div > label.Mui-error {
      color: rgb(96, 93, 98) !important;
    }
  }
  & > form > div > p {
    margin: 10px 0;
    width: 100%;
    &.description {
      margin-top: 0.25rem;
      font-size: 0.875rem;
      font-weight: 300;
      color: rgb(96, 93, 98);
      text-align: center;
      margin-bottom: 0px;
    }
  }
`;
