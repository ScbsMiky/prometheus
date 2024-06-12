import { ICalendar } from "./types";
import { CalendarBoxStyled, CalendarStyled } from "./styles";
import { useEffect, useState } from "react";

export const dayNames = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];

export const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

export const getFormatedDateFromTimestamp = (timestamp: number) => {
  const date = new Date(timestamp);

  return `${date.getDate( ).toString( ).padStart(2, "0")} ${monthNames[date.getMonth( )]}, ${date.getFullYear( )}`;
};

interface IPicker {
  date: Date;
  
  unable: {
    days: number[ ];
    dates: number[ ];
  };

  ignore: {
    days: number[ ];
  };

  type: "year" | "mouth" | "day";

  onChange(date: Date): void;
};

Calendar.getPicker = function GetPicker(props: IPicker) {
  switch(props.type) {
    case "day": {
      return (
        <Calendar.DayPicker
          date={props.date}
          ignoreDays={props.ignore.days}
          unableDays={props.unable.days}
          unableDates={props.unable.dates}
          onClick={(day) => {
            props.date.setDate(day);
            props.onChange(props.date);
          }}
        />
      );
    };

    case "mouth": {
      return (
        <Calendar.MonthPicker
          onClick={(mouth) => {
            props.date.setMonth(mouth);
            props.onChange(props.date);
          }}
        />
      );
    };

    default: {
      return (
        <Calendar.YearPicker
          date={props.date}  
          onClick={(year) => {
            props.date.setFullYear(year);
            props.onChange(props.date);
          }}
        />
      );
    };
  };
};

Calendar.getDayList = function(date: Date, unableDays: number[ ] = [ ], unableDates: number[ ] = [ ], ignoreDays: number[ ]) {
  const list: { key: number, day: number, unable: boolean, disable: boolean }[ ] = [ ];

  
  const start = new Date(date.getFullYear( ), date.getMonth( ), 1).getDay( );
  const finish = new Date(date.getFullYear( ), date.getMonth( ) + 1, 0).getDate( );
  
  const max = finish + start;

  for(let day = 0; day < max; day ++) {
    const now = (day - start) + 1;

    list.push({
      key: day,
      day: now,
      disable: (day < start),
      unable: ignoreDays.includes(now) ? false : (unableDays.includes(now) || unableDates.includes(day % 7)),
    });
  };

  return list;
};

Calendar.getYearList = function(date: Date) {
  const list: string[ ] = [ ];


  for(let i = 0; i < 15 ; i ++) {
    list.push((date.getFullYear( ) - 7 + i).toString( ));
  };

  return list;
};

Calendar.NamesComponent = function(props: { type: "month" | "day", onClick?(name: string, index: number): void; }) {
  return (props.type == "day" ? dayNames : monthNames).map((name, index) => (
    <CalendarBoxStyled className={props.type} onClick={( ) => props.onClick ? props.onClick(name, index) : undefined} key={name}>
      <span>{name.slice(0, 3)}</span>
    </CalendarBoxStyled>
  ));
};

interface IDayPicker {
  date: Date;
  
  ignoreDays: number[ ];
  unableDays: number[ ];
  unableDates: number[ ];

  onClick?(day: number): void;
};

Calendar.DayPicker = function(props: IDayPicker) {
  const [dayList, setDayList] = useState(Calendar.getDayList(props.date, props.unableDays, props.unableDates, props.ignoreDays));

  useEffect(( ) => {
    setDayList(Calendar.getDayList(props.date, props.unableDays, props.unableDates, props.ignoreDays));
  }, [props]);

  return (
    <CalendarBoxStyled style={{ maxWidth: "calc(3rem * 7)" }} className="picker">
      <Calendar.NamesComponent type="day" />

      {dayList.map((day, index) => (
        <div onClick={( ) => day.disable ? undefined : (props.onClick ? props.onClick(day.day) : undefined)} className={`${day.disable ? "invisible" : ""} ${day.unable ? "unable" : ""}`} key={index}>
          <span>{day.day}</span>
        </div>
      ))}
    </CalendarBoxStyled>
  );
};

Calendar.MonthPicker = function(props: { onClick?(index: number): void; }) {
  return (
    <CalendarBoxStyled style={{ maxWidth: "calc(3rem * 4)" }} className="picker">
      <Calendar.NamesComponent onClick={(_, index) => props.onClick ? props.onClick(index) : undefined} type="month" />
    </CalendarBoxStyled>
  );
};

Calendar.YearPicker = function(props: { onClick?(index: number): void; date: Date }) {
  const [yearList] = useState(Calendar.getYearList(props.date));

  return (
    <CalendarBoxStyled style={{ maxWidth: "calc(3rem * 5)" }} className="picker">
      {yearList.map((year) => (
        <div onClick={( ) => props.onClick ? props.onClick(Number(year)) : undefined} key={year}>
          <span>{year}</span>
        </div>
      ))}    
    </CalendarBoxStyled>
  );
};

export default function Calendar(props: ICalendar) {
  const [calendar, setCalendar] = useState({
    date: new Date( ),
    picker: "day" as "day" | "mouth" | "year",
    ignoreDays: [ ] as number[ ],
    unableDays: [ ] as number[ ],
    unableDates: [ ] as number[ ]
  });

  const handleCalendar = (date: Date, picker: any) => {
    setCalendar({
      ...calendar,
      date,
      picker: props.picker || picker,
    });
  };
  
  useEffect(( ) => {
    setCalendar({
      date: props.date || calendar.date,
      picker: props.picker || calendar.picker,
      ignoreDays: (props.ignore ? props.ignore.days : undefined) || [ ],
      unableDays: (props.unable ? props.unable.days : undefined) || [ ],
      unableDates: (props.unable ? props.unable.dates : undefined) || [ ],
    });
  }, [props]);

  return (
    <CalendarStyled>
      <div onClick={( ) => handleCalendar(calendar.date, calendar.picker == "day" ? "mouth" : calendar.picker == "mouth" ? "year" : "day")} className="header">
        {getFormatedDateFromTimestamp(calendar.date.getTime( ))}
      </div>

      {
        Calendar.getPicker({
          date: calendar.date,
          type: calendar.picker,

          ignore: {
            days: calendar.ignoreDays
          },

          unable: {
            days: calendar.unableDays,
            dates: calendar.unableDates,
          },

          onChange(date) {
            handleCalendar(date, calendar.picker);

            if(props.onChange) {
              props.onChange(date);
            };
          },
        })
      }
    </CalendarStyled>
  );
};