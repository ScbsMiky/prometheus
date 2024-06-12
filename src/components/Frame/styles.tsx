import { styled } from "styled-components";

export const FrameStyled = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;

  & > .header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    width: 100%;
    height: 3.6rem;

    background: ${(props) => props.theme.colors.whitePrimary};
    box-shadow: 0px 0px 10px 1px #8a8a8a;

    border-bottom-left-radius: .5rem;
    border-bottom-right-radius: .5rem;

    z-index: 1;

    & > div {
      display: flex;
      align-items: center;
      
      width: 100%;
      height: 100%;
      
      padding: .5rem;
    }

    & > .middle {
      justify-content: center;

      span {
        font-weight: bold;
      }
    }

    & > .right > .icon {
      margin-left: auto;
    }

    .icon {
      display: flex;
      align-items: center;
      
      padding: .5rem;

      svg {
        color: ${(props) => props.theme.colors.blueQuartiary};;

        width: 1.4rem;
        height: 1.4rem;
      }
    }

    & > .header-menu {
      position: fixed;
      
      padding: 0;
      display: unset;

      margin-top: .1rem;
      margin-right: .3rem;

      border-radius: .5rem;

      right: -100%;
      top: 3.6rem;

      width: fit-content;
      height: fit-content;

      min-width: 10rem;

      background: ${(props) => props.theme.colors.whitePrimary};
      box-shadow: 2px 2px 10px 1px #8a8a8a;

      transition: .2s all;
    }
    
    & > .header-menu.focus {
      right: 0;
    }
  }

  & > .footer .item-frame.selected,
  & > .header .item-frame.selected {
    color: ${(props) => props.theme.colors.blueQuartiary};
  }

  & > .footer .item-frame:first-child svg,
  & > .header .item-frame:first-child svg {
    width: 1.4rem;
    height: 1.4rem;
  }

  & > .footer .item-frame,
  & > .header .item-frame {
    color: ${(props) => props.theme.colors.whiteQuartiary};

    display: flex;
    align-items: center;

    border-radius: .5rem;
    
    padding: .5rem;
    text-decoration: none;

    span {
      margin-left: .5rem;
    }

    svg {
      width: 1.2rem;
      height: 1.2rem;
    }
  }

  & > .content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    overflow: auto;

    width: 100%;
    height: 100%;

    margin-top: 1.8rem;
  }

  & > .footer {
    display: flex;
    align-items: center;
    justify-content: space-around;

    width: 100%;
    height: 4.4rem;

    background: ${(props) => props.theme.colors.whitePrimary};
    box-shadow: 0px 0px 10px 1px #8a8a8a;

    border-top-left-radius: .5rem;
    border-top-right-radius: .5rem;

    & .item-frame {
      padding: .5rem;

      span {
        display: none;
      }
    }
  }
`;

export const SubHeaderStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: .5rem;

  font-weight: bold;
  font-size: 1.4rem;

  color: ${(props) => props.theme.colors.blueSecondary};
`;