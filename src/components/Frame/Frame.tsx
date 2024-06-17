import { Link } from "react-router-dom";

import { FrameScreens, IFrame } from "./types";
import { FrameStyled, SubHeaderStyled } from "./styles";

export function FrameActions(props: { isCustumer?: boolean; selected?: FrameScreens }) {
  if(props.isCustumer) {
    return (
      <>
        <Link to="/" onClick={( ) => window.localStorage.removeItem("token")} className={`item-frame`}>
          <svg viewBox="0 0 24 24"><path fill="currentColor" d="M17 7L15.59 8.41L18.17 11H8V13H18.17L15.59 15.58L17 17L22 12M4 5H12V3H4C2.9 3 2 3.9 2 5V19C2 20.1 2.9 21 4 21H12V19H4V5Z" /></svg>
          <span>Sair</span>
        </Link>
      </>
    );
  };

  return (
    <>
      <Link to="/" className={`item-frame ${props.selected == "Order" ? "selected" : ""}`}>
        <svg viewBox="0 0 24 24"><path fill="currentColor" d="M12 5.69L17 10.19V18H15V12H9V18H7V10.19L12 5.69M12 3L2 12H5V20H11V14H13V20H19V12H22" /></svg>
        <span>Pedidos</span>
      </Link>
      
      <Link to="/services" className={`item-frame ${props.selected == "Services" ? "selected" : ""}`}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M20,6C20.58,6 21.05,6.2 21.42,6.59C21.8,7 22,7.45 22,8V19C22,19.55 21.8,20 21.42,20.41C21.05,20.8 20.58,21 20,21H4C3.42,21 2.95,20.8 2.58,20.41C2.2,20 2,19.55 2,19V8C2,7.45 2.2,7 2.58,6.59C2.95,6.2 3.42,6 4,6H8V4C8,3.42 8.2,2.95 8.58,2.58C8.95,2.2 9.42,2 10,2H14C14.58,2 15.05,2.2 15.42,2.58C15.8,2.95 16,3.42 16,4V6H20M4,8V19H20V8H4M14,6V4H10V6H14Z" /></svg>
        <span>Serviços</span>
      </Link>

      <Link to="/diary" className={`item-frame ${props.selected == "Diary" ? "selected" : ""}`}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M19,19H5V8H19M16,1V3H8V1H6V3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3H18V1" /></svg>
        <span>Agenda</span>
      </Link>

      <Link to="/" onClick={( ) => { window.localStorage.removeItem("token"); window.location.reload( ); }} className={`item-frame`}>
        <svg viewBox="0 0 24 24"><path fill="currentColor" d="M17 7L15.59 8.41L18.17 11H8V13H18.17L15.59 15.58L17 17L22 12M4 5H12V3H4C2.9 3 2 3.9 2 5V19C2 20.1 2.9 21 4 21H12V19H4V5Z" /></svg>
        <span>Sair</span>
      </Link>
    </>
  );
};

Frame.SubHeader = function(props: { onClick?( ): void; children?: JSX.Element[ ] | JSX.Element }) {
  return (
    <SubHeaderStyled onClick={props.onClick}>
      {props.children}
    </SubHeaderStyled>
  );
};
 
export default function Frame(props: IFrame) {
  const handleHeader = (event: React.FocusEvent<HTMLDivElement, Element>, isFocus: boolean) => {
    if(!event.target.parentElement) return;

    const headerMenu = event.target.parentElement.querySelector(".header-menu");

    if(!headerMenu) return;

    headerMenu.classList[isFocus ? "add" : "remove"]("focus");
  };
  
  return (
    <FrameStyled>
      <div tabIndex={0} onBlur={(event) => handleHeader(event, false)} onFocus={(event) => handleHeader(event, true)} className="header">
        <div className="left">
          <div>

          </div>
        </div>
        
        <div className="middle">
          <span>{props.title}</span>
        </div>

        <div className="right">
          <div className="icon">
            <svg viewBox="0 0 24 24">
              <path fill="currentColor" d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" />
            </svg>
          </div>
        </div>

        <div className="header-menu">
          <FrameActions isCustumer={props.isCustumer} selected={props.screen} />
        </div>  
      </div>

      <div className="content">
        {props.children}
      </div>

      {
        props.isCustumer
        ? <></>
        : <div className="footer"><FrameActions selected={props.screen} /></div>  
      }
    </FrameStyled>
  );
};
