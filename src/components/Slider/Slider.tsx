import { useEffect, useState } from "react";

import { ISlider } from "./types";
import { SliderStyled } from "./styles";
import { BoxStyled } from "../../styles/box";
import { dayNames } from "../Calendar/Calendar";

function getDayList(date: Date, unableDays: number[ ] = [ ]) {
  const days: { date: number; day: number; disabled: boolean; }[ ] = [ ];

  let start = new Date(date.getFullYear( ), date.getMonth( ), 1).getDay( );
  let finish = new Date(date.getFullYear( ), date.getMonth( ) + 1, 0).getDate( );;

  for(let i = 0; i < finish; i ++) {
    days.push({ date: (start + (i)) % 7, day: (i + 1), disabled: unableDays.includes(i) });
  };

  return days;
};

function DayComponent(props: { onClick?( ): void; selected?: boolean; disabled?: boolean; day: number; date: number }) {
  return (
    <BoxStyled onClick={props.onClick} data-variant={props.selected ? "blue" : "light"} className={`${props.disabled ? "disabled" : ""}`}>
      <span>{props.day.toString( ).padStart(2, "0")}</span>
      <span>{dayNames[props.date]}</span>
    </BoxStyled>
  );
};

export default function Slider(props: ISlider) {
  const [list, setList] = useState<ReturnType<typeof getDayList>>([ ]);

  useEffect(( ) => {
    setList(getDayList(props.date, props.disabled || [ ]));
  }, [props]);

  return (
    <SliderStyled>
      {list.map((day) => <DayComponent onClick={( ) => props.onClick ? props.onClick(day.day) : undefined} key={day.day} date={day.date} day={day.day} selected={day.day == props.date.getDate( )} />)}
    </SliderStyled>
  );
};