import styled, { createGlobalStyle, keyframes } from "styled-components";

export const spinnerKeyFrames = keyframes`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`;

export const AppStyled = styled.div`
  width: 100vw;
  height: 100vh;

  background: ${(props) => props.theme.colors.bg};
`;

export const GlobalStyled = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;

    font-family: sans-serif;

    outline: none;
    box-sizing: border-box;

    svg {
      width: 1rem;
      height: 1rem;
    }
  }

  *::-webkit-scrollbar {
    width: .5rem;
    height: .5rem;

    scroll-margin: 1rem;
    scroll-padding: 1rem;

    background: transparent;
  }

  *::-webkit-scrollbar-thumb {
    border-radius: .5rem;

    background: ${(props) => props.theme.colors.blueSecondary};
  }

  .spinner {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    & > div {
      width: fit-content;
      height: fit-content;

      padding: 1rem;

      border-radius: 100%;

      border: .2rem solid ${(props) => props.theme.colors.bluePrimary};
      border-left-color: transparent;

      animation: 1s infinite linear ${spinnerKeyFrames};
    }
  }
`;