import { useEffect, useState } from "react";
import Frame from "../../components/Frame/Frame";
import { BoxStyled } from "../../styles/box";

import { ServicesStyled } from "./styles";
import { apiDomain, request } from "../../contexts/globalContext";
import Blur from "../../components/Blur/Blur";
import { InputStyled } from "../../styles/input";

export default function ServicesScreen( ) {
  const [selectedService, setSelectedService] = useState<any>(undefined);
  const [selectedCategory, setSelectedCategory] = useState({ id: "all", name: "Todos" });

  const [loadingServices, setLoadingServices] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);

  const [blurNewService, setBlurNewService] = useState(false);
  const [blurNewCategory, setBlurNewCategory] = useState(false);

  const [services, setServices] = useState([ ] as any[ ]);
  const [categories, setCategories] = useState([ ] as any[ ]);

  const handleNewService = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const [name, price] = event.currentTarget.parentElement?.querySelectorAll("input") || [];

    request({
      url: `${apiDomain}/api/services/create`,
      body: { name: name.value, price: price.value, category: selectedCategory.id },
      headers: { token: window.localStorage.getItem("token") }
    }).then(( ) => window.location.reload( ));
  };

  const handleChangeService = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const [name, price] = event.currentTarget.parentElement?.querySelectorAll("input") || [];

    request({
      url: `${apiDomain}/api/services/edit`,
      body: { id: selectedService.id, name: name.value, price: price.value, category: selectedCategory.id },
      headers: { token: window.localStorage.getItem("token") }
    }).then(( ) => window.location.reload( ));
  };

  const handleDeleteService = ( ) => {
    request({
      url: `${apiDomain}/api/services/delete`,
      body: { id: selectedService.id },
      headers: { token: window.localStorage.getItem("token") }
    }).then(( ) => window.location.reload( ));
  };

  const handleNewCategory = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const name = event.currentTarget.parentElement?.querySelector("input");

    request({
      url: `${apiDomain}/api/categories/create`,
      body: { name: name?.value },
      headers: { token: window.localStorage.getItem("token") }
    }).then(( ) => window.location.reload( ));
  };

  useEffect(( ) => {
    setLoadingCategories(true);

    request({  url: `${apiDomain}/api/categories/get` })
    .then((data) => {        
      setCategories(data.categories);
      setLoadingCategories(false);
    });
  }, [ ]);

  useEffect(( ) => {
    request({ url: `${apiDomain}/api/services/get?filter=${selectedCategory.id}` })
    .then((data) => {        
      setServices(data.services);
      setLoadingServices(false);
    });
  }, [selectedCategory]);

  return (
    <Frame screen="Services" title="Serviços">
      <ServicesStyled>
        <Frame.SubHeader>
          <span>Categorias</span>
          <svg style={{ width: "1.4rem", height: "1.4rem" }} viewBox="0 0 24 24"><path fill="currentColor" d="M21.41 11.58L12.41 2.58A2 2 0 0 0 11 2H4A2 2 0 0 0 2 4V11A2 2 0 0 0 2.59 12.42L11.59 21.42A2 2 0 0 0 13 22A2 2 0 0 0 14.41 21.41L21.41 14.41A2 2 0 0 0 22 13A2 2 0 0 0 21.41 11.58M13 20L4 11V4H11L20 13M6.5 5A1.5 1.5 0 1 1 5 6.5A1.5 1.5 0 0 1 6.5 5Z" /></svg>
        </Frame.SubHeader>

        <div style={{ display: "flex", alignItems: "center", flexWrap: "nowrap", overflow: "auto" }} className="categories">
          <BoxStyled onClick={( ) => setSelectedCategory({ id: "all", name: "Todos" })} $variant={selectedCategory.id == "all" ? "blue" : "light"} style={{ display: "flex", alignItems: "center", marginRight: "0" }}>
            <span>Todos</span>
          </BoxStyled>

          {categories.map((category) => {
            return (
              <BoxStyled onClick={( ) => setSelectedCategory({ id: category.id, name: category.name })} key={category.id} $variant={selectedCategory.id == category.id ? "blue" : "light"} style={{ display: "flex", alignItems: "center", marginRight: "0" }}>
                <span>{category.name}</span>
              </BoxStyled>
            );
          })}
          
          {loadingCategories ? <div style={{ margin: ".5rem auto" }} className="spinner"><div></div></div> : <></>}
        </div>
        
        <BoxStyled onClick={( ) => setBlurNewCategory(true)} $variant="blue" $center="true">
          <span>Nova categoria</span>
          <svg style={{ marginLeft: ".5rem" }} fill="currentColor" viewBox="0 0 24 24"><path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" /></svg>
        </BoxStyled>

        <br />

        <Frame.SubHeader>
          <span>Serviços</span>
          <svg style={{ width: "1.4rem", height: "1.4rem" }} viewBox="0 0 24 24"><path fill="currentColor" d="M20,6C20.58,6 21.05,6.2 21.42,6.59C21.8,7 22,7.45 22,8V19C22,19.55 21.8,20 21.42,20.41C21.05,20.8 20.58,21 20,21H4C3.42,21 2.95,20.8 2.58,20.41C2.2,20 2,19.55 2,19V8C2,7.45 2.2,7 2.58,6.59C2.95,6.2 3.42,6 4,6H8V4C8,3.42 8.2,2.95 8.58,2.58C8.95,2.2 9.42,2 10,2H14C14.58,2 15.05,2.2 15.42,2.58C15.8,2.95 16,3.42 16,4V6H20M4,8V19H20V8H4M14,6V4H10V6H14Z" /></svg>
        </Frame.SubHeader>

        <div className="services">
          {services.map((service) => {
            return (
              <BoxStyled onClick={( ) => setSelectedService(service)} key={service.id} $full="true">
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: ".35rem" }}>
                  <span style={{ fontWeight: "bold", fontSize: "1.2rem" }}>{service.name}</span>
                  <svg style={{ minWidth: "1.2rem", minHeight: "1.2rem" }} viewBox="0 0 24 24"><path fill="currentColor" d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" /></svg>
                </div>

                <div>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <svg style={{ width: "1.2rem", height: "1.2rem" }} viewBox="0 0 24 24"><path fill="currentColor" d="M7,15H9C9,16.08 10.37,17 12,17C13.63,17 15,16.08 15,15C15,13.9 13.96,13.5 11.76,12.97C9.64,12.44 7,11.78 7,9C7,7.21 8.47,5.69 10.5,5.18V3H13.5V5.18C15.53,5.69 17,7.21 17,9H15C15,7.92 13.63,7 12,7C10.37,7 9,7.92 9,9C9,10.1 10.04,10.5 12.24,11.03C14.36,11.56 17,12.22 17,15C17,16.79 15.53,18.31 13.5,18.82V21H10.5V18.82C8.47,18.31 7,16.79 7,15Z" /></svg>
                    <span style={{ marginBottom: "-.25rem" }}>{service.price.toLocaleString("pt-br", { style: "currency", currency: "brl" }).slice(3)}</span>
                  </div>
                </div>
              </BoxStyled>
            );
          })}
          
          {loadingServices ? <div style={{ margin: ".5rem auto" }} className="spinner"><div></div></div> : <></>}
        </div>
        
        <BoxStyled onClick={( ) => setBlurNewService(true)} $variant="blue" $center="true">
          <span>Novo serviço</span>
          <svg style={{ marginLeft: ".5rem" }} fill="currentColor" viewBox="0 0 24 24"><path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" /></svg>
        </BoxStyled>

        <Blur onClose={( ) => setBlurNewCategory(false)} activated={blurNewCategory}>
          <BoxStyled>
            <span style={{ display: "block", padding: ".5rem", fontWeight: "bold", paddingBottom: "0" }}>Nova categoria</span>
            
            <InputStyled placeholder="Nome" />

            <BoxStyled onClick={handleNewCategory} $variant="blue" $full="true" $center="true">
              <span>Criar</span>
            </BoxStyled>
          </BoxStyled>
        </Blur>

        <Blur onClose={( ) => setBlurNewService(false)} activated={blurNewService}>
          <BoxStyled>
            <span style={{ display: "block", padding: ".5rem", fontWeight: "bold", paddingBottom: "0" }}>Nova serviço</span>
            
            <InputStyled placeholder="Nome" />
            <InputStyled placeholder="Preço" />
            <InputStyled disabled value={selectedCategory.name} />

            <BoxStyled onClick={handleNewService} $variant="blue" $full="true" $center="true">
              <span>Criar</span>
            </BoxStyled>
          </BoxStyled>
        </Blur>

        <Blur onClose={( ) => setSelectedService(undefined)} activated={!!selectedService}>
          {
            selectedService
            ? <BoxStyled>
                <span style={{ display: "block", padding: ".5rem", fontWeight: "bold", paddingBottom: "0" }}>Editar serviço</span>
                
                <InputStyled placeholder="Nome" defaultValue={selectedService.name} />
                <InputStyled placeholder="Preço" defaultValue={selectedService.price} />
                <InputStyled disabled value={selectedCategory.name} />

                <BoxStyled onClick={handleDeleteService} $variant="red" $full="true" $center="true">
                  <span>Deletar</span>
                </BoxStyled>

                <BoxStyled onClick={handleChangeService} $variant="blue" $full="true" $center="true">
                  <span>Alterar</span>
                </BoxStyled>
              </BoxStyled>
            : <></>  
          }
        </Blur>
      </ServicesStyled>
    </Frame>
  );
};