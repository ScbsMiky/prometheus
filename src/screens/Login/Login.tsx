import { LoginStyled } from "./styles";
import { BoxStyled } from "../../styles/box";
import { Link } from "react-router-dom";
import { InputStyled } from "../../styles/input";
import { apiDomain } from "../../contexts/globalContext";
import { useState } from "react";

export default function LoginScreen( ) {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = function(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    setLoading(true);
    setErrorMessage("");

    const [login, password] = event.currentTarget.parentElement?.querySelectorAll("input") || [ ];

    fetch(`${apiDomain}/api/custumer/auth`, {
      body: JSON.stringify({
        login: login.value,
        password: password.value
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
        <InputStyled placeholder="Login" />
        <InputStyled type="password" placeholder="Senha" />

        {errorMessage ? <span style={{ padding: ".5rem", display: "block", textAlign: "center", color: "#ff4444" }}>{errorMessage}</span> : <></>}
          
        <BoxStyled onClick={handleSubmit} data-full="true" data-center="true" data-variant="blue">
          {loading ? <div className="spinner"><div style={{ padding: ".37rem" }}></div></div> : <span>Entrar</span>}
        </BoxStyled>

        <Link to={"/signup"}>
          <span>Criar</span>
        </Link>
      </BoxStyled>
    </LoginStyled>
  );
};