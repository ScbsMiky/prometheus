import styled from "styled-components";

export const SelectStyled = styled.select`
  display: block;

  width: 100%;

  padding: .5rem .75rem;
  box-shadow: 3px 3px 2px 1px #c4c4c4;
  
  border-radius: .5rem;
  margin-bottom: .5rem;

  background: ${(props) => props.theme.colors.whitePrimary};
  border: 1px solid ${(props) => props.theme.colors.whiteQuartiary};
`;