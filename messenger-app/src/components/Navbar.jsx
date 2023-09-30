import { signOut } from 'firebase/auth'
import React, { useContext } from 'react'
import { AuthContext } from '../Context/AuthContext'
import { auth } from '../firebase'
import '../stylehome.css'

const Navbar =  () => {

  const { currentUser } = useContext(AuthContext);
  return (
    <div className='navbar'>
              <h1>RUIX Chat</h1>
              <div className='navbar-side'>
                  <div style={{display:'flex',flexDirection:'column',alignItems: 'center'}}>
                  <img src={currentUser.photoURL} alt={currentUser.displayName}/>
                  </div>
                  <button className='logout' onClick={()=>signOut(auth)}>Log Out</button>
              </div>
        </div>
  )
}

export default Navbar