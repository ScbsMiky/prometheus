import styled, { css } from "styled-components";

export type BoxStyledVariants = "light" | "blue" | "red";

export const BoxStyled = styled.div<{ variant?: BoxStyledVariants, center?: "true" | "false", full?: "true" | "false" }>`
  ${(props) => (props.center == "true") ? css`display: flex; align-items: center; justify-content: center;` : ""}

  width: ${(props) => (props.full == "true") ? "calc(100% - 1.25rem)" : "fit-content"};

  margin: .5rem;
  padding: .5rem .75rem;

  border-radius: .5rem;

  box-shadow: 3px 3px 2px 1px #c4c4c4;

  color: ${(props) => props.variant == "blue" ? props.theme.colors.whitePrimary : props.variant == "red" ? props.theme.colors.whitePrimary : props.theme.colors.blueTertiary};
  background: ${(props) => props.variant == "blue" ? props.theme.colors.blueTertiary : props.variant == "red" ? "#ff4444" : props.theme.colors.whitePrimary};
`;