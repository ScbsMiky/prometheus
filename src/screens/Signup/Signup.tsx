import { LoginStyled } from "../Login/styles";
import { BoxStyled } from "../../styles/box";
import { InputStyled } from "../../styles/input";
import { Link } from "react-router-dom";
import { useState } from "react";
import { apiDomain } from "../../contexts/globalContext";

export default function SignupScreen( ) {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = function(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    setLoading(true);
    setErrorMessage("");

    const [username, phone, login, password] = event.currentTarget.parentElement?.querySelectorAll("input") || [ ];

    fetch(`${apiDomain}/api/custumer/create`, {
      body: JSON.stringify({
        phone: phone.value,
        login: login.value,
        password: password.value,
        username: username.value,
      }),
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((res) => res.json( ))
      .then(({ error, token }) => {
        setLoading(false);

        if(error) {
          setErrorMessage(error);

          return;
        };

        window.localStorage.setItem("token", token);

        window.location.assign("/");
      });
  };

  return (
    <LoginStyled>
      <span>Espaço Vip</span>

      <BoxStyled className="content">
        <InputStyled placeholder="Nome" />
        <InputStyled type="number" placeholder="Telefone" />

        <InputStyled placeholder="Login" />
        <InputStyled type="password" placeholder="Senha" />

        {errorMessage ? <span style={{ padding: ".5rem", display: "block", textAlign: "center", color: "#ff4444" }}>{errorMessage}</span> : <></>}
          
        <BoxStyled onClick={handleSubmit} data-full="true" data-center="true" data-variant="blue">
          {loading ? <div className="spinner"><div style={{ padding: ".37rem" }}></div></div> : <span>Criar conta</span>}
        </BoxStyled>

        <Link to={"/login"}>
          <span>Entrar</span>
        </Link>
      </BoxStyled>
    </LoginStyled>
  );
};