import { styled } from "styled-components";

export const CalendarStyled = styled.div`
  background: ${(props) => props.theme.colors.whitePrimary};
  box-shadow: 0px 0px 10px 1px #8a8a8a;
  
  width: fit-content;

  & > div {
    display: flex;
    flex-wrap: wrap;

    
  }
  
  & .header {
    display: flex;
    align-items: center;
    justify-content: center;

    padding: .5rem;
  }

`;

export const CalendarBoxStyled = styled.div`
  display: flex;
  flex-wrap: wrap;

  & .invisible {
    opacity: 0;
  }

  & .unable {
    color: ${(props) => props.theme.colors.whiteQuartiary};
  }

  & .day {
    color: ${(props) => props.theme.colors.blueQuartiary};
    background: ${(props) => props.theme.colors.whiteSecondary};

    &:hover {
      border-color: transparent;
      color: ${(props) => props.theme.colors.blueQuartiary};
      background: ${(props) => props.theme.colors.whiteSecondary};
    }
  }

  & > div {
    max-width: 3rem;
    min-width: 3rem;

    padding: .5rem 0;

    display: flex;
    align-items: center;
    justify-content: center;

    border: 1px solid transparent;

    transition: all .2s;

    &:hover {
      color: ${(props) => props.theme.colors.bluePrimary};
      border-color: ${(props) => props.theme.colors.bluePrimary};
    }
  }
`;