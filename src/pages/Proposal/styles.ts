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
