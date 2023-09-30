import {
    Timestamp,
    arrayUnion,
    doc,
    serverTimestamp,
    updateDoc,
} from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { AuthContext } from "../Context/AuthContext";
import { ChatContext } from "../Context/ChatContext";
import { db } from "../firebase";
import send from '../images/send.png';
import Chat from "./Chat";
import Messages from "./Messages";

const MessageArea = ({resNav,setresNav,chatReload}) => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const [style1, setStyle1] = useState({});

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async () => {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setText("");
    setImg(null);
  };


  useEffect(() => {
    function handleResize() {
      if (window.innerWidth <= 1100) {
        if(resNav === false)
            {
                setStyle1({
                    display: 'none'
                  });
            } else {
        setStyle1({
          display: 'block',
          position: 'absolute',
          width: '100%',
          height: '100%',
        });
      }
    }
      else{
        setStyle1();
      }
    }

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [resNav]);


  useEffect(()=> {
    if (resNav === false && window.innerWidth <= 1100) {
        setStyle1({
          display: 'none'
        });
      } else if(window.innerWidth <= 1100) {
        setStyle1({
          display: 'block',
          position: 'absolute',
          width: '100%',
          height: '100%',
        });
      }
  },[resNav])


  return (
    <>
      <div className="messagearea" style={style1}>
        <Chat setResNav={setresNav}/>
        <div className="messageareacenter">
          <div className="ms2">
            <Messages chatReload={chatReload}/>
          </div>
        </div>

        <div className="messageareaend">
          <input
            type="text"
            placeholder="Type your message here ..."
            onChange={(e) => setText(e.target.value)}
            value={text}
          />
          <div style={{ display: "flex", gap: "10px" }}>
            <img
              onClick={handleSend}
              src={send}
              style={{ cursor: "pointer" }}
              alt="Send"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default MessageArea;
