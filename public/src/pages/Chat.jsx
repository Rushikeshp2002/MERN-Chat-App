/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import styled from 'styled-components'
import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { allUsersRoute, host } from '../utils/APIRoutes';
import Contacts from '../components/Contacts'
import Welcome from '../components/Welcome';
import ChatContainer from '../components/ChatContainer';
import {io} from 'socket.io-client'
import { BiHomeCircle } from 'react-icons/bi';
const Chat = () => {
  const socket = useRef();
  const [contacts,setContacts] = useState([]);
  const [currentUser,setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [isLoading,setIsLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(()=>{
    const checkUser = async()=>{
      if(!localStorage.getItem("chat-app-user")){
        navigate('/login');
      }else{
        setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")));
        setIsLoading(true);
      }
    }
    checkUser();
  },[])
  // Socket Logic
  useEffect(()=>{
    if(currentUser){
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  },[currentUser]);

  useEffect(()=>{
    const getUsers = async()=>{
      if(currentUser){
        if(currentUser.isAvatarImageSet){
          const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
          setContacts(data.data);
        }
        else{
          navigate('/setAvatar');
        }
      }
    }
    getUsers();

  },[currentUser])

  const handleChat=(chat)=>{
    setCurrentChat(chat)
  }
  return (
    <Container>
        <div className="container">
          <Contacts contacts={contacts} currentUser={currentUser} changeChat={handleChat}/>
          {
            isLoading && currentChat === undefined ? <Welcome currentUser={currentUser}/> : <ChatContainer currentChat={currentChat} currentUser={currentUser} socket={socket}/>
          }
        </div>
    </Container>
  )
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  
  .container{
    height: 90vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    border-radius:1.2rem;
    margin-left: 0.7rem;
    box-shadow: 6px 8px 10px 1px #4e0eff;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    } 
    
  }
  @media screen and (max-width: 600px) {
    background-color: #020202;
    padding: 0px;
    margin: 0px;
    overflow: hidden;
    gap: 0rem;
    display: flex;
    flex-direction: row;
    .container{
      height: 100vh;
      width: 100vw;
      margin-left: 0rem;
      border-radius: 0rem;
      grid-template-rows: 20% 80%;
      box-shadow: 0px 0px 0px 0px #000000;
      }
    }
`;

export default Chat