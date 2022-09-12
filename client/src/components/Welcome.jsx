import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Robot from "../assets/hello.gif";
export default function Welcome() {
  const [userName, setUserName] = useState("");
  useEffect(() => {
    async function check() {
      setUserName(
        await JSON.parse(
          localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
        ).user
      );
    }
    check();
  }, []);
  return (
    <Container>
      <img src={Robot} alt="" />
      <h1>
        Bem vindo!, <span>{userName}!</span>
      </h1>
      <h3>Selecione uma conversa para iniciar o chat</h3>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  img {
    height: 20rem;
  }
  span {
    color: #cb1616;
  }
`;
