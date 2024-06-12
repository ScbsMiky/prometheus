import { DiaryStyled } from "./styles"

import Frame from "../../components/Frame/Frame";
import Calendar from "../../components/Calendar/Calendar";
import { BoxStyled } from "../../styles/box";
import { useEffect, useState } from "react";
import { InputStyled } from "../../styles/input";
import { apiDomain, request } from "../../contexts/globalContext";

interface IBox {
  props: any;
  loading: boolean;

  children: JSX.Element | JSX.Element[ ];
  component(props: any): JSX.Element | JSX.Element[ ];
  
  onHeaderClick?( ): void;
};

function Box(props: IBox) {
  return (
    <>
      <Frame.SubHeader onClick={props.onHeaderClick}>{props.children}</Frame.SubHeader>
      {props.loading ? <div className="spinner"><div></div></div> : props.component(props.props)}
    </>
  );
};

function EstablishmentCalendar(props: any) {
  const [dayList, setDayList] = useState({ days: props.invalidDays as number[ ] });
  const [selectedDay, setSelectedDay] = useState(0);

  const handleChangeDay = (valid: boolean) => {
    const index = dayList.days.indexOf(selectedDay);

    if(index >= 0 && !valid) dayList.days.splice(index, 1);
    else if(valid) dayList.days.push(selectedDay);
    
    setDayList({ days: [...dayList.days] });

    props.onChange(dayList);
  };

  const handleChangeDate = (date: Date) => {
    setSelectedDay(date.getDate( ));
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Calendar
          date={props.date}
          unable={{ days: dayList.days }}
          picker={"day"}
          onChange={handleChangeDate}
        />
      </div>

      <br />

      <Frame.SubHeader>
        <span>Dia util</span>
      </Frame.SubHeader>

      <div style={{ display: "flex", alignItems: "center" }}>
        <BoxStyled variant={!dayList.days.includes(selectedDay) ? "blue" : "light"} onClick={( ) => handleChangeDay(false)}>
          <span>Sim</span>
        </BoxStyled>

        <BoxStyled variant={dayList.days.includes(selectedDay) ? "blue" : "light"} onClick={( ) => handleChangeDay(true)}>
          <span>Não</span>
        </BoxStyled>
      </div>
    </>
  );
};

function EstablishmentTimes(props: any) {
  const [times, setTimes] = useState({
    launchTime: props.launchTime,
    serviceTime: props.serviceTime,
    workingTime: props.workingTime
  });

  const handleChange = (name: string, index: number, date: string) => {
    // @ts-ignore
    if(index == -1) times[name] = date;
    
    // @ts-ignore
    else times[name][index] = date;
    
    setTimes({ ...times });

    props.onChange(times);
  };

  return (
    <>
      <span style={{ padding: "0 .5rem", fontWeight: "bold" }}>Tempo dos serviços</span>
      
      <div style={{ display: "flex", alignItems: "center" }}>
        <InputStyled value={times.serviceTime} style={{ width: "fit-content" }} onChange={(data) => handleChange("serviceTime", -1, data.currentTarget.value)} type="time" />
      </div>

      <br />
      
      <span style={{ padding: "0 .5rem", fontWeight: "bold" }}>Horários de Almoço</span>
      
      <div style={{ display: "flex", alignItems: "center" }}>
        <InputStyled value={times.launchTime[0]} style={{ width: "fit-content" }} onChange={(data) => handleChange("launchTime", 0, data.currentTarget.value)} type="time" />
        
        <span>até</span>

        <InputStyled value={times.launchTime[1]} style={{ width: "fit-content" }} onChange={(data) => handleChange("launchTime", 1, data.currentTarget.value)} type="time" />
      </div>

      <br />
      
      <span style={{ padding: "0 .5rem", fontWeight: "bold" }}>Horários de Funcionamento</span>
      
      <div style={{ display: "flex", alignItems: "center" }}>
        <InputStyled value={times.workingTime[0]} style={{ width: "fit-content" }} onChange={(data) => handleChange("workingTime", 0, data.currentTarget.value)} type="time" />
        
        <span>até</span>

        <InputStyled value={times.workingTime[1]} style={{ width: "fit-content" }} onChange={(data) => handleChange("workingTime", 1, data.currentTarget.value)} type="time" />
      </div>

      <br />
    </>
  );
};

export default function DiaryScreen( ) {
  const [selectedDate] = useState(new Date( ));
  
  const [calendar, setCalendar] = useState<any>(undefined);
  const [establishment, setEstablishment] = useState<any>(undefined);
  
  const [submitLoading, setSubmitLoading] = useState(false);
  const [loadingCalendar, setLoadingCalendar] = useState(true);
  const [loadingEstablishment, setLoadingEstablishment] = useState(true);

  const [daysToSubmit, setDaysToSubmit] = useState([ ] as number[ ]);
  const [timesToSubmit, setTimesToSubmit] = useState({ launchTime: undefined, serviceTime: undefined, workingTime: undefined  });

  const handleSchedule = (times: any) => {
    if(times.launchTime) timesToSubmit.launchTime = times.launchTime;
    if(times.serviceTime) timesToSubmit.serviceTime = times.serviceTime;
    if(times.workingTime) timesToSubmit.workingTime = times.workingTime;

    setTimesToSubmit({ ...times });
  };

  const handleSubmit = async ( ) => {
    if(submitLoading) return;

    setSubmitLoading(true);

    await Promise.all([
      request({
        url: `${apiDomain}/api/establishment/edit/calendar`,
        method: "POST",
        headers: { token: window.localStorage.getItem("token") },
        body: { date: selectedDate, days: daysToSubmit }
      }),
      request({
        url: `${apiDomain}/api/establishment/edit/times`,
        method: "POST",
        headers: { token: window.localStorage.getItem("token") },
        body: timesToSubmit
      })
    ]);

    window.location.reload( );
  };

  useEffect(( ) => {
    request({ url: `${apiDomain}/api/establishment/get` }).then((data) => {
      setEstablishment(data.establishment);

      setTimesToSubmit({
        launchTime: data.establishment.launchTime,
        serviceTime: data.establishment.serviceTime,
        workingTime: data.establishment.workingTime
      });

      setLoadingEstablishment(false);
    });
  }, [ ]);

  useEffect(( ) => {
    setLoadingCalendar(true);

    request({
      url: `${apiDomain}/api/establishment/calendar`,
      method: "POST",
      body: { date: selectedDate }
    }).then((data) => {
      data.calendar.date = selectedDate;

      setDaysToSubmit(data.calendar.invalidDays);

      setCalendar(data.calendar);
      setLoadingCalendar(false);
    });
  }, [selectedDate]);

  return (
    <Frame screen="Diary" title="Calendário">
      <DiaryStyled>
        <Box loading={loadingCalendar} props={{ ...calendar, onChange: ({ days }: any) => setDaysToSubmit(days) }} component={EstablishmentCalendar}>
          <span>Calendário</span>
          <svg style={{ width: "1.6rem", height: "1.6rem" }} viewBox="0 0 24 24"><path fill="currentColor" d="M19,19H5V8H19M16,1V3H8V1H6V3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3H18V1" /></svg>
        </Box>

        <br />

        <Box loading={loadingEstablishment} props={{ ...establishment, onChange: handleSchedule }} component={EstablishmentTimes}>
          <span>Horários</span>
        </Box>
      </DiaryStyled>

      <BoxStyled onClick={handleSubmit} style={{ width: "calc(100% - 1rem)", textAlign: "center", padding: ".75rem", background: "#313F4D", color: "white" }}>
        {submitLoading ? <div className="spinner"><div style={{ padding: ".37rem" }}></div></div> : <span>Salvar alterações</span>}
      </BoxStyled>
    </Frame>
  );
};