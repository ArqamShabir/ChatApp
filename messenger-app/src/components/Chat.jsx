import React, { useContext } from "react";
import { ChatContext } from "../Context/ChatContext";

const Chat = ({setResNav}) => {
  const { data } = useContext(ChatContext);

  const handleBtn = () => {
    setResNav(false);
  }
  

  return (
    <>
        <div className='navbar navbar2'>
              <h1>{data.user.displayName ? <>
                <span onClick={() => handleBtn()}> ← </span>
                {data.user.displayName}
              </> 
              : 
              <>
              <span onClick={() => handleBtn()}> ← </span>
                Welcome to Chat
              </>
              }</h1>
        </div>
    </>
  )
}

export default Chat