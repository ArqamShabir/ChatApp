import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../Context/AuthContext";
import '../stylehome.css';

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return  message.text.length !==0 ? (
    <>
     {
        message.senderId === currentUser.uid ? 
        <div className="actualmeassage">
        {message.text}
      </div>
      :
      <div className="actualmeassage" style={{background:'#e1e1e1',color:'#000',borderRadius:'0 32px 32px 32px',alignSelf:'start'}}>
      {message.text}
     </div>
     }
     
    </>
  ) : (
    <>
    </>
  );
};

export default Message;