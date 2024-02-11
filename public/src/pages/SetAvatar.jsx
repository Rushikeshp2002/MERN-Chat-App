/* eslint-disable no-unused-vars */
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Loader from "../assets/loader.gif";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { setAvatarRoute } from "../utils/APIRoutes";
import { Buffer } from "buffer";

const SetAvatar = () => {
  const navigate = useNavigate();
  const api = "https://api.multiavatar.com/45678945";
  const [avatar, setAvatar] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const setProfilePicture = async () => {
    if(selectedAvatar === undefined) {
        toast.error("Please select an avatar",toastOptions)
    }
    else{
        const user = await JSON.parse(localStorage.getItem("chat-app-user"));
        const {data} = await axios.post(`${setAvatarRoute}/${user._id}`,{
            image:avatar[selectedAvatar],
        });
        console.log(data);

        if(data.isSet){
            user.isAvatarImageSet = true;
            user.avatarImage = data.image;
            localStorage.setItem("chat-app-user",JSON.stringify(user));
            navigate("/");
        }else{
            toast.error("Please Click Again!!",toastOptions);
        }
    }
  };

  useEffect(() => {
    const dataFun = async () => {
      const data = [];
      for (let i = 0; i < 6; i++) {
        const image = await axios.get(
          `${api}/${Math.round(Math.random() * 1000)}`
        );

        const buffer = new Buffer(image.data);
        data.push(buffer.toString("base64"));
      }
      setAvatar(data);
      setIsLoading(false);
    }
    dataFun();
  }, []);

  return (
    <>
      {isLoading ? (
        <Container>
          <img src={Loader} alt="loader" className="loader" />
        </Container>
      ) : (
        <Container>
          <div className="titleContainer">
            <h1>Pick an Avatar as your profile picture</h1>
          </div>
          <div className="avatars">
            {avatar.map((avatar, index) => {
              return (
                <div
                  key={index}
                  className={`avatar ${
                    selectedAvatar === index ? "selected" : ""
                  }`}
                >
                  <img
                    src={`data:image/svg+xml;base64,${avatar}`}
                    alt="avatar"
                    onClick={() => setSelectedAvatar(index)}
                  />
                </div>
              );
            })}
          </div>
          <button className="submit-btn" onClick={setProfilePicture}>
            Set as Profile Picture
          </button>
        </Container>
      )}
      <ToastContainer />
    </>
  );
};
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  height: 100vh;
  width: 100vw;
  background-color: #131324;
  flex-direction: column;
  .loader {
    max-inline-size: 100%;
  }
  .titleContainer {
    h1 {
      color: white;
    }
  }
  .avatars {
    display: flex;
    gap: 2rem;
    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;
      img {
        height: 6rem;
      }
    }
    .selected {
      border: 0.4rem solid #4e0eff;
    }
  }
  .submit-btn {
    background-color: #997af0;
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
      background-color: #4e0eff;
    }
  }
  @media screen and (max-width: 600px){
    gap: 1rem;
    /* whole body*/
   .titleContainer{
    text-align: center;
   }
   .avatars{
    display:inline-flex;
    flex-direction: row;
    justify-content: center;
    flex-wrap:wrap;
    gap: 0.4rem;
    width: 100vw;
   }

  }
`;
export default SetAvatar;
