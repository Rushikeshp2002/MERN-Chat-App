/* eslint-disable react/prop-types */
import styled from "styled-components"
import Picker from "emoji-picker-react"
import {IoMdSend} from 'react-icons/io'
import {BsEmojiSmileFill} from 'react-icons/bs'
import { useState } from "react"
const ChatInput = ({handleChatMsg}) => {
    const [showEmoji,setShowEmoji] = useState(false);
    const [msg,setMsg] = useState("");

    const handleShowEmoji = ()=>{
        setShowEmoji(!showEmoji);
    }

    const handleEmojiClick=(event)=>{
        let message = msg;
        message += event.emoji;
        setMsg(message);
    }
    const handleCutPicker = ()=>{
        setShowEmoji(false)
    }

    const sendChat=(e)=>{
        e.preventDefault();
        if(msg.length>0){
            handleChatMsg(msg);
            setMsg("")

        }
    }

  return (
    
    <Container>
        <div className="button-container">
           <div className="emoji">
            <BsEmojiSmileFill onClick={handleShowEmoji}/>
            {
                showEmoji && <Picker className="emoji-picker-react" onEmojiClick={handleEmojiClick}/>
            }
            </div> 

        </div>
        <form className="input-container" onClick={handleCutPicker}  onSubmit={sendChat}>
            <input type="text"  placeholder="Type your message here" value={msg} onChange={(e)=>setMsg(e.target.value)}/>
            <button className="submit">
                <IoMdSend/>
            </button>
        </form>
    </Container>
    
  )
}

const Container = styled.div`
    /* #080420 */
    display: grid;
    position: relative;
    height: 10vh;
    top: 4rem;
    grid-template-columns: 5% 95%;
    align-items: center;
    justify-content: center;
    background-color:#080420 ;
    padding:0 2rem;
    padding-bottom: 0.1rem;
    .button-container{
        display: flex;
        align-items: center;
        color: white;
        gap: 1rem;
        .emoji{
            position: relative;
            svg{
                font-size: 1.5rem;
                color: #ffff00c8;
                cursor: pointer;
            }
            .emoji-picker-react{
                position: absolute;
                top: -31vw;
                background-color: #080420;
                box-shadow: 0 5px 10px #9a86f3;
                border-color:#9a86f3 ;
                ::-webkit-scrollbar{
                    background-color: #080420;
                    width: 7px;
                    
                    &-thumb{
                        background-color: #9a86f3;
                        border-radius: 1rem;
                        
                    }
                }
                .epr-emoji-category-label{
                   background-color: transparent;
                    
                }
                .epr-button:focus{
                    background-color: black;
                }
                
               
                
            }
        }
    }
    .input-container{
        width: 100%;
        border-radius: 2rem;
        display: flex;
        align-items: center;
        gap: 2rem;
        background-color: #ffffff34;
        input{
            width: 90%;
            height: 60%;
            background-color: transparent;
            color: white;
            border: none;
            padding: 1rem;
            padding-left: 1rem;
            font-size: 1.2rem;
            &::selection{
                background-color: #9a86f3;
            }
            &:focus{
                outline: none;
            }
        }
        button{
            padding: 0.5rem 1rem;
            border-radius: 2rem;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #9a86f3;
            border: none;
            svg{
                font-size: 2rem;
                color: white;
                margin-left: 10px;
            }

        }

    }
    @media screen and (max-width: 600px){
        padding: 15px;
        margin-top:-2rem;
        .button-container{
            .emoji{
                position: relative;
                top: 2px;
                svg{
                    font-size: 1.7rem;
                }
            
            .emoji-picker-react{
                position: absolute;
                top: -125vw;
            }
        }
        }
        .input-container{
            margin-left: 1.2rem;
            width: 86vw;
            input{
                width: 100%;
                padding: 6px;
                padding-left: 20px;
            }
        }

    }
`;
export default ChatInput