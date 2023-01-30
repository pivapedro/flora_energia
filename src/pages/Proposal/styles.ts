import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  width: 100%;
  height: 100%;
  @media (max-width: 900px) {
    padding-right: 2rem;
    padding-left: 2rem;
    padding-bottom: 2rem;
  }
  & > h2 {
    margin: 3rem 0px 1rem;
    color: rgb(28, 27, 31);
    font-size: 1.5rem;
    font-weight: 500;
    text-align: center;
  }
  & > form {
    display: flex;
    flex-wrap: wrap;
    margin: 0px 3rem;
    & > button {
      width: 100%;
      max-width: 550px;
    }
    & > div {
      width: 100%;
      padding: 1.5rem 0px;
      &.border {
        border-bottom: 1px solid rgb(249, 175, 64);
      }
      & > label {
        margin-top: 1rem;
      }
    }
    & > div.wrapperButton {
      display: flex;
      gap: 1rem;
      margin-bottom: 1rem;
      max-width: 550px;
      @media (max-width: 900px) {
        flex-wrap: wrap;
      }
      & > button {
        width: 100%;
      }
    }
    & > label {
      padding: 1.5rem 0px;
    }
    & > p,
    > div > p {
      width: 100%;
      color: rgb(96, 93, 98);
      &.title {
        font-weight: 500;
        color: rgb(28, 27, 31);
        text-decoration: underline;
      }
    }
    & > label,
    & > div > label {
      display: flex;
      align-items: flex-end;
      -webkit-box-pack: justify;
      justify-content: space-between;
      width: 100%;
      font-size: 1rem;
      font-weight: 300;
      > :last-child,
      .bold {
        font-size: 1.125rem;
        font-weight: 500;
        white-space: nowrap;
        color: rgb(96, 93, 98);
        &.bold {
          color: rgb(28, 27, 31);
          font-size: 1.125rem;
          font-weight: 700;
        }
        &.large {
          font-size: 1.5rem;
        }
      }

      &.border {
        border-bottom: 1px solid rgb(249, 175, 64);
      }

      & > span.bold {
      }
      &.semiBold {
        margin-top: 0;
        font-size: 1.125rem;
        font-weight: 400;
        color: rgb(28, 27, 31);
        margin-right: 0.5rem;
      }
    }
  }
`;

export const ModalVideo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const ModalFAQ = styled.div`
  max-height: 360px;
  & > ul {
    list-style-type: none;
    & > li {
      margin-top: 0.5rem;
      & > h4,
      & > h6,
      & > p {
        margin: 0px;
        color: rgb(31, 27, 30);
      }
      & > h4 {
        font-size: 1.125rem;
        font-weight: 700;
        line-height: 1.313rem;
      }
      & > div {
        text-indent: 0.5rem;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        margin-top: 0.5rem;
        & > h6 {
          font-size: 1rem;
          font-weight: 500;
          line-height: 1.188rem;
        }
      }
    }
  }
`;
