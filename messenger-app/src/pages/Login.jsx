import { signInWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import { auth } from '../firebase'
import loginImage from '../images/Image.png'
import logo from '../images/Logo.png'
import aus from '../images/australia(1) 1.png'
import '../style.css'


function Login() {

  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try{
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/")
    } catch (error) {
      setErr(true);
    }
  }; 

  return (
    <div className='main'>
        <div className='card'>
            <div className='content'>
                <div className='navbar1'>
                    <img src={logo}/>
                    <div>
                        <img src={aus} />EN
                    </div>
                </div>
                <div className='lowerSection'>
                    <div className='headings'>
                        <h1>Welcome Ruix</h1>
                        <p>Welcome to your best Private Messenger</p>
                    </div>
                    <form className='form' onSubmit={handleSubmit}>
                        <input type='email' placeholder='Email'/>
                        <input type='password' placeholder='Password'/>
                        {err && <span className="error">Something went wrong</span>}
                        <button>Login</button>
                        <p className='link'>Do not have an account? <Link to="/register" style={{textDecoration:'none'}}><span>Register now</span></Link></p>
                    </form>
                </div>
            </div>
            <div className='image'>
                <img src={loginImage} alt='Image' />
            </div>
        </div>
    </div>
  )
}

export default Login