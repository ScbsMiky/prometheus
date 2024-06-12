import { styled } from "styled-components";

export const OrderBoxStyled = styled.div`
  width: calc(100% - 1rem);

  margin: .5rem;
  padding: .5rem .75rem;

  border-radius: .5rem;

  box-shadow: 3px 3px 2px 1px #c4c4c4;

  color: ${(props) => props.variant == "blue" ? props.theme.colors.whitePrimary : props.variant == "red" ? props.theme.colors.whitePrimary : props.theme.colors.blueTertiary};
  background: ${(props) => props.variant == "blue" ? props.theme.colors.blueTertiary : props.variant == "red" ? "#ff4444" : props.theme.colors.whitePrimary};

  .title {
    display: flex;
    align-items: baseline;
    justify-content: space-between;

    margin-bottom: .5rem;

    font-size: 1.2rem;

    span:last-child {
      font-size: 1rem;
      margin-left: .5rem;
      white-space: nowrap;
      color: ${(props) => props.theme.colors.blueSecondary};
    }
  }

  .content {
    display: flex;

    & > div {
      width: 100%;

      & > div {
        display: flex;
        align-items: center;

        margin: .25rem 0;

        span {
          margin-left: .35rem;
        }

        svg {
          min-width: 1.2rem;
          min-height: 1.2rem;
        }
      }
    }
    
    & > div:last-child {
      width: fit-content;

      span {
        white-space: nowrap;
      }
    }
  }
`;