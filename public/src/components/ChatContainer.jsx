/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import styled from "styled-components";
import LogOut from "./LogOut";
import ChatInput from "./ChatInput";
import Messages from "./Messages";
import { getAllMsgRoute, sendMessageRoute } from "../utils/APIRoutes";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import {v4 as uuidv4} from 'uuid';


const ChatContainer = ({ currentChat, currentUser , socket}) => {
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const scrollRef = useRef();
  useEffect(() => {
    const getMsg = async() => {
      if(currentChat){
        const response = await axios.post(getAllMsgRoute, {
          from: currentUser._id,
          to: currentChat._id,
        });
        setMessages(response.data);
      }
    };
    getMsg();
  },[currentChat]);
  const handleChatMsg = async (msg) => {
    await axios.post(sendMessageRoute, {
      from: currentUser._id,
      to: currentChat._id,
      message: msg,
    });
    socket.current.emit("send-msg",{
      to: currentChat._id,
      from: currentUser._id,
      messages: msg,
    });

    const msgs = [...messages];
    msgs.push({fromSelf:true,message:msg});
    setMessages(msgs);
  };

  useEffect(()=>{
    if(socket.current){
      socket.current.on("msg-received",(msg)=>{
        setArrivalMessage({fromSelf:false,message:msg});})
      }
    }
  ,[]);

  useEffect(()=>{
    arrivalMessage && setMessages((prev)=>[...prev, arrivalMessage])
  },[arrivalMessage]);

  useEffect(()=>{
    scrollRef.current?.scrollIntoView({behaviour:"smooth"})
  },[messages])


  return (
    <>
      {currentChat && (
        <Container>
          <div className="chat-header">
            <div className="user-details">
              <div className="avatar">
                <img
                  src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
                  alt="avatar"
                />
              </div>
              <div className="username">
                <h3>{currentChat.username}</h3>
              </div>
            </div>
            <LogOut />
          </div>

          {/* Chat Messages */}
          <div className="chat-messages">
            {messages.map((message) => {
              return (
                <div key={uuidv4()} ref={scrollRef}>
                  <div
                    className={`message ${
                      message.fromSelf ? "sender" : "receiver"
                    }`}
                  >
                    <div className="content">
                      <p>{message.message}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <ChatInput handleChatMsg={handleChatMsg} />
        </Container>
      )}
    </>
  );
};

const Container = styled.div`
  padding-top: 1rem;
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0rem 2rem;
  }
  .user-details {
    display: flex;
    align-items: center;
    gap: 1rem;
    .avatar {
      img {
        height: 3rem;
      }
    }
    .username {
      h3 {
        color: white;
      }
    }
  }
  .chat-messages{
    padding: 1rem 1.5rem;
    display: flex;
    flex-direction: column;
    height: 57vh;
    gap:0.3rem;
    overflow: auto;
    /* background-color: yellow; */
    &::-webkit-scrollbar{
      width: 5px;
      background-color: #e6dbffa0;
      border-radius: 1rem;
     
    }

    
    .message{
      display: flex;
      align-items: center;
      .content{
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size:1.1rem;
        border-radius: 1rem;
        color: #d1d1d1;
        
      }
    }
    .sender{
      justify-content: flex-end;
      .content{
        background-color:#6320ff8b;
      }
    }
    .receiver{
      justify-content: flex-start;
      .content{
        background-color: #ad20f9b5;
      }
      
    }
  }
  @media screen and (max-width: 600px){
    margin-top: 10rem;
    margin-left: -6.5rem;
    .chat-header{
      /* margin-top: 1rem; */
    }

  }
`;
export default ChatContainer;
