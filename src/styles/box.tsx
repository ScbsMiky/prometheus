import styled, { css } from "styled-components";

export type BoxStyledVariants = "light" | "blue" | "red";

export const BoxStyled = styled.div<{ ["data-variant"]?: BoxStyledVariants, ["data-center"]?: "true" | "false", ["data-full"]?: "true" | "false" }>`
  ${(props) => (props["data-center"] == "true") ? css`display: flex; align-items: center; justify-content: center;` : ""}

  width: ${(props) => (props["data-full"] == "true") ? "calc(100% - 1.25rem)" : "fit-content"};

  margin: .5rem;
  padding: .5rem .75rem;

  border-radius: .5rem;

  box-shadow: 3px 3px 2px 1px #c4c4c4;

  color: ${(props) => props["data-variant"] == "blue" ? props.theme.colors.whitePrimary : props["data-variant"] == "red" ? props.theme.colors.whitePrimary : props.theme.colors.blueTertiary};
  background: ${(props) => props["data-variant"] == "blue" ? props.theme.colors.blueTertiary : props["data-variant"] == "red" ? "#ff4444" : props.theme.colors.whitePrimary};
`;