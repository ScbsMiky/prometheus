import styled from "styled-components";

export const InputStyled = styled.input`
  display: block;
  
  width: calc(100% - 1.25rem);
  margin: .5rem;
  padding: .5rem .75rem;
  box-shadow: 3px 3px 2px 1px #c4c4c4;
  border-radius: .5rem;

  background: ${(props) => props.theme.colors.whitePrimary};
  border: 1px solid ${(props) => props.theme.colors.whiteQuartiary};
`;