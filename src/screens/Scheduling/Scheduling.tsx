import { SchedulingStyled } from "./styles";
import Frame from "../../components/Frame/Frame";
import { BoxStyled } from "../../styles/box";
import { InputStyled } from "../../styles/input";
import { useEffect, useState } from "react";
import useStorage from "../../hooks/useStorage";8
import Blur from "../../components/Blur/Blur";
import { SelectStyled } from "../../styles/select";
import { apiDomain, request } from "../../contexts/globalContext";
import OrderBox from "../../components/OrderBox/OrderBox";

export default function SchedulingScreen( ) {
  const [phone] = useStorage("phone", "");
  const [username] = useStorage("username", "");

  const [serviceTime, setServiceTime] = useState("00:00");
  const [servicePrice, setServicePrice] = useState(0);

  const [mySchedules, setMySchedules] = useState([ ] as any[ ]);

  const [newSchedule, setNewSchedule] = useState(false);

  const [services, setServices] = useState([ ] as any[ ]);
  const [schedules, setSchedules] = useState([ ] as any[ ]);

  const [loadingService, setLoadingService] = useState(true);
  const [loadingSchedule, setLoadingSchedule] = useState(true);
  const [loadingMySchedules, setLoadingMySchedules] = useState(true);

  const [selectedService, setSelectedService] = useState("");

  const [selectedDate, setSelectedDate] = useState(new Date( ));

  const handleSubmit = ( ) => {
    if(!selectedService) return;
    
    request({
      url: `${apiDomain}/api/schedules/create`,
      method: "POST",
      body: { date: selectedDate, type: selectedService },
      headers: { token: window.localStorage.getItem("token") }
    }).then(console.log);
  };

  useEffect(( ) => {
    request({ url: `${apiDomain}/api/services/get` })
    .then((data) => {
      setLoadingService(false);
      setServices(data.services);
    });

    request({
      url: `${apiDomain}/api/custumer/schedules`,
      method: "POST",
      headers: { token: window.localStorage.getItem("token") }
    }).then((data) => {
      setMySchedules(data.schedules);
      setLoadingMySchedules(false);
    })
  }, [ ]);

  useEffect(( ) => {
    setLoadingSchedule(true);

    request({
      url: `${apiDomain}/api/schedules/available`,
      method: "POST",
      body: {  }
    })
    .then((data) => {
      setSchedules(data.schedules);
      setLoadingSchedule(false);
    });
  }, [selectedDate]);

  useEffect(( ) => {
    setServicePrice(0);
    setServiceTime("00:00");

    const service = services.find((service) => service.id == selectedService);

    if(!service) return;
    
    setServicePrice(service.price);
    setServiceTime(service.duration);
  }, [selectedService]);

  return (
    <Frame isCustumer title="Espaço Vip">
      <SchedulingStyled>
        <Frame.SubHeader>
          <span>Meus dados</span>
        </Frame.SubHeader>

        <div>
          <InputStyled disabled value={phone} placeholder="Nome completo" />
          <InputStyled disabled value={username} placeholder="Numero de celular" />
        </div>

        <br />

        <Frame.SubHeader>
          <span>Agendamentos</span>
        </Frame.SubHeader>

        {
          loadingMySchedules
          ? <div className="spinner"><div></div></div>
          : <div className="orders">
            {!mySchedules.length ? <div style={{ padding: ".5rem" }}><span>Sem agenda</span></div> : mySchedules.map((order) => <OrderBox {...order} key={order.id} />)}
          </div>
        }
      </SchedulingStyled>
      
      <BoxStyled onClick={( ) => setNewSchedule(true)} style={{ padding: ".75rem" }} $full="true" $center="true" $variant="blue">
        <span>Novo agendamento</span>
      </BoxStyled>

      <Blur onClose={( ) => setNewSchedule(false)} activated={newSchedule}>
        <BoxStyled>
          <span style={{ display: "block", marginBottom: ".5rem", textAlign: "center", fontWeight: "bold", fontSize: "1.2rem" }}>Agendamento</span>
          
          {loadingService ? <div className="spinner"><div style={{ padding: ".4rem", margin: ".5rem" }}></div></div> : <SelectStyled onChange={(data) => setSelectedService(data.target.value)}><option>Serviços</option>{services.map((service) => <option key={service.id} value={service.id}>{service.name}</option>)}</SelectStyled>}
          {loadingSchedule ? <div className="spinner"><div style={{ padding: ".4rem", margin: ".5rem" }}></div></div> : <SelectStyled><option>Horários</option>{schedules.map((schedule) => <option key={schedule} value={schedule}>{schedule}</option>)}</SelectStyled>}

          <InputStyled onChange={({ target: { value } }) => setSelectedDate(new Date(value.replace(/-/g, "/")))} value={`${selectedDate.getFullYear( )}-${selectedDate.getMonth( ).toString( ).padStart(2, "0")}-${selectedDate.getDate( ).toString( ).padStart(2, "0")}`} style={{ width: "100%", margin: ".5rem 0" }} type="date" />

          <BoxStyled $full="true" style={{ display: "flex", alignItems: "center", margin: ".5rem 0", width: "100%" }}>
            <svg viewBox="0 0 24 24"><path fill="currentColor" d="M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C6.47,22 2,17.5 2,12A10,10 0 0,1 12,2M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z" /></svg>
            <span style={{ marginLeft: ".2rem", marginBottom: "-.2rem" }}>{serviceTime}</span>
          </BoxStyled>

          <BoxStyled $full="true" style={{ display: "flex", alignItems: "center", margin: ".5rem 0", width: "100%" }}>
            <svg style={{ width: "1.1rem", height: "1.1rem" }} viewBox="0 0 24 24"><path fill="currentColor" d="M7,15H9C9,16.08 10.37,17 12,17C13.63,17 15,16.08 15,15C15,13.9 13.96,13.5 11.76,12.97C9.64,12.44 7,11.78 7,9C7,7.21 8.47,5.69 10.5,5.18V3H13.5V5.18C15.53,5.69 17,7.21 17,9H15C15,7.92 13.63,7 12,7C10.37,7 9,7.92 9,9C9,10.1 10.04,10.5 12.24,11.03C14.36,11.56 17,12.22 17,15C17,16.79 15.53,18.31 13.5,18.82V21H10.5V18.82C8.47,18.31 7,16.79 7,15Z" /></svg>
            <span style={{ marginBottom: "-.14rem" }}>{(servicePrice).toLocaleString("pt-br", { style: "currency", currency: "brl" }).slice(3)}</span>
          </BoxStyled>

          <BoxStyled onClick={handleSubmit} style={{ padding: ".75rem", margin: "0", width: "100%" }} $full="true" $center="true" $variant="blue">
            <span>Confirmar</span>
          </BoxStyled>
        </BoxStyled>
      </Blur>
    </Frame>
  );
};