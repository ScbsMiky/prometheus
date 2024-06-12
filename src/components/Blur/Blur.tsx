import { IBlur } from "./types";
import { BlurStyled } from "./styles";
import { useEffect, useRef } from "react";

export default function Blur(props: IBlur) {
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(( ) => {
    if(!divRef.current) return;
    
    divRef.current.onclick = function(event) {
      if(!(event.target as any).offsetParent) {
        if(props.onClose) props.onClose( );

        divRef.current?.classList.remove("activated");
        
        return;
      };
    };
  }, [props]);

  return (
    <BlurStyled ref={divRef} className={props.activated ? "activated" : ""}>
      <div>
        {props.children}
      </div>
    </BlurStyled>
  );
};