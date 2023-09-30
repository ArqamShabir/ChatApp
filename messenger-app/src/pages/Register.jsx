import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { auth, db, storage } from "../firebase";
import loginImage from "../images/Image.png";
import logo from "../images/Logo.png";
import avatar from "../images/addAvatar.png";
import aus from "../images/australia(1) 1.png";
import "../style.css";


function Register() {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const name = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      const storageRef = ref(storage, name);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
                try {
                    await updateProfile(res.user, {
                      displayName : name,
                      photoURL: downloadURL,
                    });
                    await setDoc(doc(db, "users", res.user.uid), {
                      uid: res.user.uid,
                      displayName : name,
                      email : email,
                      photoURL: downloadURL,
                    });
        
                    await setDoc(doc(db, "userChats", res.user.uid), {});
                    navigate("/");
                  } catch (err) {
                    setErr(true);
                    setLoading(false);
                  }
                });
              });
            } catch (err) {
              setErr(true);
              setLoading(false);
            }
          };
        

  return (
    <div className="main">
      <div className="card">
        <div className="content">
          <div className="navbar1">
            <img src={logo} />
            <div>
              <img src={aus} />
              EN
            </div>
          </div>
          <div className="lowerSection">
            <div className="headings">
              <h1>Welcome Ruix</h1>
              <p>Welcome to your best Private Messenger</p>
            </div>
            <form className="form" onSubmit={handleSubmit}>
              <input type="text" placeholder="Name" />
              <input type="email" placeholder="Email" />
              <input type="password" placeholder="Password" />
              <input type="file" id="file" />
              <label htmlFor="file" id="fileedit">
                <img src={avatar} style={{ width: "3rem" }} />
                <span>Add an avatar</span>
              </label>
              <div style={{ display: "flex", alignItems: "center" }}>
                <input type="checkbox" id="checkbox" />
                <label htmlFor="checkbox">
                  I agree the terms and conditions
                </label>
              </div>
              {loading &&  <span className="error">Uploading and compressing the image please wait...</span>}
              {err && <span className="error">Something went wrong</span>}
              <button type="submit">Register</button>
              <p className="link">
                Already have an account? <Link to='/login' style={{textDecoration:'none'}}><span>Log in</span></Link>
              </p>
            </form>
          </div>
        </div>
        <div className="image">
          <img src={loginImage} alt="Image" />
        </div>
      </div>
    </div>
  );
}

export default Register;
