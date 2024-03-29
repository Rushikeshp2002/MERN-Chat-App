/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import styled from "styled-components";
import Logo from "../assets/logo.svg";
import { useEffect, useState } from "react";

// eslint-disable-next-line no-unused-vars, react/prop-types
const Contacts = ({ contacts, currentUser, changeChat }) => {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  
  useEffect(() => {
    if (currentUser) {
      setCurrentUserImage(currentUser.avatarImage);
      setCurrentUserName(currentUser.username);
    }
  }, [currentUser]);
  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };
  return (
    <>
      {currentUserImage && currentUserName && (
        <Container>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h3>Convoia</h3>
          </div>
          <div className="contacts">
            {contacts.map((contact, index) => {
              return (
                <div
                  key={index}
                  onClick={()=>changeCurrentChat(index,contact)}
                  className={`contact ${
                    index === currentSelected ? "selected" : ""
                  }`}
                >
                  <div className="avatar">
                    <img
                      src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                      alt="avatar"
                    />
                  </div>
                  <div className="username">
                    <h3>{contact.username}</h3>
                  </div>
                </div>
              );
            })}
            
          </div>
          <div className="current-user">
            <div className="avatar">
              <img
                src={`data:image/svg+xml;base64,${currentUserImage}`}
                alt="avatar"
              />
            </div>
            <div className="username">
              <h2>{currentUserName}</h2>
            </div>
          </div>
        
        </Container>
      )}
    </>
  );
};

const Container = styled.div`
    display: grid;
    grid-template-rows: 10% 75% 15%;
    overflow: hidden;
    background-color:#080440;
    border-radius: 1rem 0 0 1rem;
    .brand{
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        img{
            height: 2rem;
        }
        h3{
            color: white;
            text-transform: uppercase;

        }
    }
    .contacts{
        display: flex;
        flex-direction: column;
        align-items:center;
        overflow:auto;
        gap: 0.8rem;&::-webkit-scrollbar{
            width:0.2rem;
            &-thumb{
                background-color: #ffffff39;
                width:0.1rem;
                border-radius:1rem;
            }
        }
        .contact{
            background-color: #ffffff39;
            min-height: 5rem;
            width: 90%;
            display: flex;
            cursor: pointer;
            border-radius: 0.5rem;
            padding: 1rem 1rem;
            gap: 1rem;
            align-items: center;
            transition: 0.5s ease-in-out;
            color: white;
            .avatar{
                img{
                    height: 3rem;
                }
            }
            .username{
                h3{
                    color: white !important;

                }
            }

        }
        .selected{
            background-color:#9886f3;

        }
    }
    .current-user{
        background-color: #0d0d30;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 2rem;
        .avatar{
            img{
                height: 4rem;
                max-inline-size: 100%;
            }
        }
        .username{
            h2{
                color: white;
            }
        }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap:5rem;
      .username{
        h2{
            font-size:1rem;
        }
      }
    }
    @media screen and (max-width: 600px){
      border-radius:0rem;
      display: grid;
      overflow-x: scroll;
      grid-template-rows: 30% 70% 0%;
      width: 100vw;
      padding: 4px 13px;

      .brand{
        margin-top: 2rem;
      }
      
      .contacts{
          display: flex;
          flex-direction: row;

          width: 100%;
          overflow-x: scroll;
          &::-webkit-scrollbar{
            width:10px;
            &-thumb{
                background-color: transparent;
                width:10px;
                border-radius:0rem;
            }
        }

        .contact{
          min-height: 1rem;
          padding: 3px 10px;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 6px;
          .avatar{
            img{
              height: 2rem;
              margin-top: 2px;
            }
          }
          /* background-color: transparent; */
      }
      }
      .current-user{
        display: none;
        background-color: transparent;
        gap: 0rem;
      }
    }

`;
export default Contacts;
