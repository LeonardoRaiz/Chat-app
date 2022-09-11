import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import loader from "../assets/loader.png";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { setAvatarRoute } from "../utils/API_Routes";
import { Buffer } from "buffer";
import { createAvatar } from "@dicebear/avatars";
import * as style from "@dicebear/adventurer";
import randomColor from "randomcolor";

export default function SetAvatar() {
  //const api = "https://avatars.dicebear.com/api/adventurer";
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);
  const toastOptions = {
    position: "top-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const setProfilePicture = async () => {};

  useEffect(() => {
    const data = [];
    for (let i = 0; i < 4; i++) {
      let image = createAvatar(style, {
        seed: `${Math.round(Math.random() * 1000)}`,
        backgroundColor: randomColor(),
      });
      
      const buffer = Buffer(image);
      data.push(buffer.toString("base64"));
      image = "";
    }
    setAvatars(data);
    setIsLoading(false);
  }, []);

  return (
    <>
      {isLoading ? (
        <Container>
          <img src={loader} alt="loader" className="loader" />
        </Container>
      ) : (
        <Container>
          <div className="title-container">
            <h1>Escolha seu avatar!</h1>
          </div>
          <div className="containerAll">
            <div className="avatars">
              {avatars.map((avatar, index) => {
                return (
                  <div
                    className={`avatar ${
                      selectedAvatar === index ? "selected" : ""
                    }`}
                  >
                    <img
                      src={`data:image/svg+xml;base64,${avatar}`}
                      alt="avatar"
                      key={avatar}
                      onClick={() => setSelectedAvatar(index)}
                    />
                  </div>
                );
              })}
            </div>
            <button onClick={setProfilePicture} className="submit-btn">
              Escolheu? Deixe como seu avatar :)
            </button>
          </div>

          <ToastContainer />
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background-color: #3e3e3e;
  height: 100vh;
  width: 100vw;
  .containerAll {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background-color: whitesmoke;
    border-radius: 2rem;
    padding: 3rem 5rem;
  }
  .loader {
    max-inline-size: 100%;
  }
  .title-container {
    h1 {
      color: white;
    }
  }
  .avatars {
    display: flex;
    gap: 2rem;
    .avatar {
      border: 0.2rem solid transparent;
      padding: 0.4rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;
      img {
        height: 8rem;
        transition: 0.5s ease-in-out;
      }
    }
    .selected {
      border: 0.2rem solid #cb1616;
      background-color: #cb1616;
    }
  }
  .submit-btn {
    background-color: #cb1616;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #3e3e3e;
    }
  }
`;
