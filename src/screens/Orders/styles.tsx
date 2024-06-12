import { styled } from "styled-components";

export const OrdersStyled = styled.div`
  & > .days {
    display: flex;

    & > div {
      width: 100%;

      span {
        display: block;
        font-size: 1.2rem;
      }

      span:first-child {
        font-size: 1.8rem;
        margin-bottom: 1rem;
      }
    }

    & > div.selected {
      color: ${(props) => props.theme.colors.whitePrimary};
      border-color: ${(props) => props.theme.colors.blueSecondary};
      background: ${(props) => props.theme.colors.blueSecondary};
    }
  }

  & > .orders > div {
    
  }

  .spinner {
    padding: 1rem;
  }
`;