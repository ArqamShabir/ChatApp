import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { ChatContext } from "../Context/ChatContext";
import { db } from "../firebase";
import '../stylehome.css';

const Chats = ({responsiveNav,setChatReload}) => {
  const [chats, setChats] = useState([]);

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = (u) => {
    responsiveNav(true);
    setChatReload(true);
    dispatch({ type: "CHANGE_USER", payload: u });
  };

  return (
    <div className="chats">
      {Object.entries(chats)
        ?.sort((a, b) => b[1].date - a[1].date)
        .map((chat) => (
          <div
            className='user'
            key={chat[0]}
            onClick={() => handleSelect(chat[1].userInfo) }
          >
            <img src={chat[1].userInfo.photoURL} alt="" />
              <div>
              <h3>{chat[1].userInfo.displayName}</h3>
              <p>{chat[1].lastMessagey=== undefined ? "Please be nice to everyone" : chat[1].lastMessage.text}</p>
              </div>
            </div>
        ))}
    </div>
  );
};

export default Chats;
