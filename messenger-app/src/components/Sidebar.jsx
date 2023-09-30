import React from 'react'
import '../stylehome.css'
import Chats from './Chats'
import Navbar from './Navbar'
import Search from './Search'

function Sidebar({setresNav,setChatReload}) {

  return (
    <div className='sidebar'>
        <Navbar/>
        <Search setChatReload={setChatReload}/>
        <Chats responsiveNav={setresNav} setChatReload={setChatReload}/>
    </div>
  )
}

export default Sidebar