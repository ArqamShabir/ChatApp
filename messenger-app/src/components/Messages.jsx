import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { ChatContext } from "../Context/ChatContext";
import { db } from "../firebase";
import '../stylehome.css';
import Message from "./Message";

const Messages = ({chatReload}) => {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);

  useEffect(() => {
    if (chatReload !== false) {
    setMessages([]);

    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      
      if (doc.exists()) {
        setMessages(doc.data().messages);
      } else {
        setMessages([]);
      }
    });

    return () => {
      unSub();
    };
  }
  }, [chatReload,data.chatId]);
  
  return (
    <>
      {messages.map((m) => (
        <Message message={m} key={m.id} />
      ))}
    </>
  );
};

export default Messages;
