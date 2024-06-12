import { styled } from "styled-components";

export const LoginStyled = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;

  align-items: center;
  justify-content: center;

  & > span {
    font-weight: bold;
    font-size: 1.4rem;

    padding: .5rem;
  }

  & > .content {
    width: 60vw;

    a {
      display: block;
      text-align: center;
      text-decoration: none;
      font-weight: bold;
      color: ${(props) => props.theme.colors.bluePrimary}
    }
  }
`;