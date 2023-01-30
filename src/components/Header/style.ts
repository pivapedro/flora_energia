import styled from "styled-components";

export const Container = styled.header`
  display: flex;
  background-color: rgb(136, 170, 171);
  display: flex;
  -webkit-box-align: center;
  align-items: top;
  height: 83px;
  width: 100%;
  flex-wrap: wrap;
  & > div {
    & > img {
      cursor: pointer;
      width: 100px;
      height: 32px;
    }
    width: 100%;
  }
  & > div.ContainerImage {
    padding: 8px 1.625rem;
    @media (max-width: 900px) {
      display: none;
    }
  }
  & > div.ContainerIcons {
    display: flex;
    justify-content: space-between;
    padding: 15px 15px 5px 15px;
    height: 53px;
    @media (min-width: 900px) {
      display: none;
    }
  }

  & > div.ContainerNav {
    display: flex;
    gap: 0.25rem;
  }
`;
