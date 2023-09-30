import React, { useState } from 'react';
import MessageArea from './MessageArea';
import Sidebar from './Sidebar';

function MessagingApp() {

  const [resNav,setresNav] = useState(false);
  const [chatReload,setChatReload] = useState(false);

  return (
    <div className='messaginghome'>
        <Sidebar setresNav={setresNav} setChatReload={setChatReload}/>
        <MessageArea resNav={resNav} chatReload={chatReload} setresNav={setresNav}/>

    </div>
  )
}

export default MessagingApp