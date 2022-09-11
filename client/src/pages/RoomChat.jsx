import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Logo from "../assets/logo.svg";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { allUsersRoute } from "../utils/API_Routes";
import axios from "axios";

function RoomChat() {
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/login");
    } else {
      setCurrentUser(
        JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY))
      );
    }
  }, []);

  //localStorage.clear()
  const navigate = useNavigate();
  const user =
    JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) ||
    "teste";
  const avatar = localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    ? JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY))
    : "";
  let avatarLogo = Logo
  useEffect(() => {
    if (currentUser) {
      if (!currentUser.isAvatarImageSet) {
        navigate("/setAvatar");
      } 
    }
  }, [currentUser]);

  if (currentUser) {
    if (currentUser.isAvatarImageSet) {
      avatarLogo = `data:image/svg+xml;base64,${avatar.image}`
    }
  }

  const [values, setValues] = useState({
    room: "Sala 1",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(values);
    const { room } = values;
    navigate(`/chat?room=${room}`);
  };

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  return (
    <>
      <FormContainer>
        <form onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <img src={avatarLogo} alt="logo" />
            <h1>{`Olá ${user.user} escolha sua sala`}</h1>
          </div>
          <select
            type={"select"}
            placeholder="Room"
            name="room"
            onChange={(e) => handleChange(e)}
          >
            <option value="Sala 1">Sala 1</option>
            <option value="Sala 2">Sala 2</option>
            <option value="Sala 3">Sala 3</option>
          </select>
          <button type="submit">Join</button>
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
    select {
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

export default RoomChat;
