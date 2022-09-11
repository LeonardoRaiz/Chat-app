import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Logo from "../assets/logo.svg";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { loginRoute } from "../utils/API_Routes";

function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { password, username } = values;
      const { data } = await axios.post(loginRoute, {
        username,
        password,
      });
      if(data.status === false) {
        toast.error(data.msg, toastOptions)
      }
      if(data.status === true) {
        toast.success(data.msg, toastOptions)
        navigate("/")
      }
      
    }
  };

  //#region Validação com React Toast
  //Regras do toast
  const toastOptions = {
    position: "top-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  //Validação do registro com toast
  const handleValidation = () => {
    const { password, username } = values;
    if (password === "") {
      toast.error("Usuário e senha são necessários", toastOptions);
      return false;
    } else if (username.length === "") {
      toast.error("Usuário e senha são necessários", toastOptions);
      return false;
    } 
    return true;
  };
  //#endregion

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };
  return (
    <>
      <FormContainer>
        <form onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h1>Register</h1>
          </div>
          <input
            type={"text"}
            placeholder="Usuário"
            name="username"
            onChange={(e) => handleChange(e)}
            min="3"
          />
          <input
            type={"password"}
            placeholder="Senha"
            name="password"
            onChange={(e) => handleChange(e)}
          />

          <button type="submit">Login</button>
          <span>
            Você não tem uma conta? <Link to="/register"> Register </Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}

//Styled components
const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #3e3e3e;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }

    h1 {
      color: #cb1616;
      text-transform: uppercase;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background-color: whitesmoke;
    border-radius: 2rem;
    padding: 3rem 5rem;
    input {
      background-color: transparent;
      padding: 1rem;
      border: 0.1rem solid #3e3e3e;
      border-radius: 0.4rem;
      width: 100%;
      font-size: 1rem;
      &:focus {
        border: 0.1rem solid #cb1616;
        outline: none;
      }
    }

    button {
      background-color: #cb1616;
      color: white;
      padding: 1rem 2rem;
      border: none;
      font-weight: bold;
      cursor: pointer;
      border-radius: 0.4rem;
      font-size: 1rem;
      text-transform: uppercase;
      transition: 0.5s ease-in-out;
      &:hover {
        background-color: #3e3e3e;
      }
    }

    span {
      text-transform: uppercase;
      a {
        color: #cb1616;
        text-decoration: none;
        font-weight: bold;
      }
    }
  }
`;

export default Login;
