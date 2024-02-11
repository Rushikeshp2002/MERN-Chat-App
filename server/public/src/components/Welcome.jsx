/* eslint-disable react/prop-types */
import styled from 'styled-components';
import Robot from "../assets/robot.gif"

const Welcome = ({currentUser}) => {
  return (
    <Container>
        <img src={Robot} alt="robot-gif" />
        <h1>Welcome, <span>{currentUser.username}!</span></h1>
        <h3>Please select a chat to Start Messaging</h3>
    </Container>
  )
}

const Container = styled.div`

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: white;
    img{
        height:20rem;

    }
    span{
        color: #4e0eff;
    }

    @media screen and (max-width: 600px){
      margin-top: 25rem;
      text-align: center;
      img{
        height: 40rem;
      }
      span{
        text-align: center;
      }
      h1{
        margin-top: -2rem;
        margin-left: -6rem;
      }
      h3{
        margin-left: -6rem;
      }
    }
`;

export default Welcome