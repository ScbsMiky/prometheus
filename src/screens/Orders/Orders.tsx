import { useEffect, useState } from "react";

import { OrdersStyled } from "./styles";

import Frame from "../../components/Frame/Frame";

import { BoxStyled } from "../../styles/box";

import OrderBox from "../../components/OrderBox/OrderBox";
import Calendar, { dayNames, getFormatedDateFromTimestamp } from "../../components/Calendar/Calendar";
import Blur from "../../components/Blur/Blur";
import { apiDomain, request } from "../../contexts/globalContext";

const dateAfterDays = (date: Date, days: number) => new Date(date.getFullYear( ), date.getMonth( ), date.getDate( ) + days);

function DayCompoent(props: { onClick?( ): void; date: Date; selected?: boolean }) {
  return (
    <BoxStyled onClick={props.onClick} className={props.selected ? "selected" : ""}>
      <span>{props.date.getDate( ).toString( ).padStart(2, "0")}</span>
      <span>{dayNames[props.date.getDay( )]}</span>
    </BoxStyled>
  );
};

export function DaySelector(props: { onClick(after: number): void; date: Date }) {
  return (
    <div className="days">
      <DayCompoent onClick={( ) => props.onClick(-1)} date={dateAfterDays(props.date, -1)} />
      <DayCompoent selected date={props.date} />
      <DayCompoent onClick={( ) => props.onClick(1)} date={dateAfterDays(props.date, 1)} />
    </div>
  );
};

export default function OrdersScreen( ) {
  const [loading, setLoading] = useState(false);

  const [orders, setOrders] = useState([ ] as any[ ]);
  const [calendarActivated, setCalendarActivated] = useState(false);

  const [selectedDate, setSelectedDate] = useState(new Date( ));
  
  useEffect(( ) => {
    setLoading(true);

    request({
      url: `${apiDomain}/api/schedules/get`,
      body: { date: selectedDate },
      headers: { token: window.localStorage.getItem("token") }
    })
      .then(({ error, schedules }) => {
        setLoading(false);

        if(error) {
          return;
        };

        setOrders(schedules);
      });
  }, [selectedDate]);

  return (
    <Frame title="Pedidos" screen="Order">
      <OrdersStyled>
        <Frame.SubHeader onClick={( ) => setCalendarActivated(true)}>
          <span>{getFormatedDateFromTimestamp(selectedDate.getTime( ))}</span>
          <svg style={{ width: "1.8rem", height: "1.8rem" }} viewBox="0 0 24 24"><path fill="currentColor" d="M19,19H5V8H19M16,1V3H8V1H6V3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3H18V1" /></svg>
        </Frame.SubHeader>

        <DaySelector
          date={selectedDate}
          onClick={(after) => setSelectedDate(dateAfterDays(selectedDate, after))}
        />

        {
          loading
          ? <div className="spinner"><div></div></div>
          : <div className="orders">
            {!orders.length ? <div style={{ padding: ".5rem" }}><span>Nenhum pedido</span></div> : orders.map((order) => <OrderBox {...order} key={order.id} />)}
          </div>
        }
        
        <Blur onClose={( ) => setCalendarActivated(false)} activated={calendarActivated}>
          <Calendar />
        </Blur>
      </OrdersStyled>
    </Frame>
  );
};