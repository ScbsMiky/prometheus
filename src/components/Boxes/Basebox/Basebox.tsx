import { IBasebox, ISection } from "./types";
import { BaseboxStyled } from "./styles";

function render(props: ISection[ ]) {
  return props.map((section, index) => (
    <div key={index}>
      {section.icon}
      <span>{section.title}</span>
    </div>
  ));
};

export default function Basebox(props: IBasebox) {
  return (
    <BaseboxStyled>
      <div className="header">
        <span>{props.header.title}</span>
        {props.header.icon}
      </div>

      <div className="body">
        <div className="left">
          {render(props.left)}
        </div>
        
        <div className="right">
          {render(props.left)}
        </div>
      </div>
    </BaseboxStyled>
  );
};