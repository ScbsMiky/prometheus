import { styled } from "styled-components";

export const SliderStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;

  overflow: auto;

  & > div {
    width: 100%;
    min-width: 8rem;

    span {
      display: block;
      font-size: 1.2rem;
    }

    span:first-child {
      font-size: 1.8rem;
      margin-bottom: 1rem;
    }

    &.disabled {
      color: ${(props) => props.theme.colors.whiteSecondary};
    }
  }
`;