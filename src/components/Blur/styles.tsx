import { styled } from "styled-components";

export const BlurStyled = styled.div`
  position: fixed;

  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;

  top: 0;
  left: 0;

  background: #0c0c0c50;
  backdrop-filter: blur(2px);

  z-index: 9999999999;
  pointer-events: none;

  opacity: 0;

  transition: all .2s;

  &.activated {
    opacity: 1;
    pointer-events: all;
  }
`;