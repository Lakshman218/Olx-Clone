import React, { useState, useContext, useEffect } from 'react';
import {FirebaseContext} from '../../store/FirebaseContext'
import Logo from '../../olx-logo.png';
import './Login.css';
import {useNavigate} from 'react-router-dom'
import { ScaleLoader } from 'react-spinners';


function Login() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  console.log("email",email);
  const [password, setPassword] = useState('')
  const {firebase} = useContext(FirebaseContext)
  const Navigate = useNavigate()

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        Navigate('/');
      }
    });
    return () => unsubscribe();
  }, [firebase, Navigate]);

  const handleLogin = (e)=>{
    e.preventDefault()
    setLoading(true)
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(()=>{
      setLoading(false)
      Navigate('/')
    }).catch((error)=>{
      setLoading(false)
      alert(error.message)
    })
  }
  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        { loading ? (
          <ScaleLoader
          size={150}
          color={'#36D7B7'}
          loading={loading}
        />
        ) : (
        <form onSubmit={handleLogin}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            onChange={(e)=>setEmail(e.target.value)}
            id="fname"
            name="email"
            autoComplete="off"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            onChange={(e)=>setPassword(e.target.value)}
            id="lname"
            name="password"
            autoComplete="off"
          />
          <br />
          <br />
          <button>Login</button>
        </form> 
        )}
        <a onClick={()=>{
          Navigate('/signup')
        }}>Signup</a>
      </div>
    </div>
  );
}

export default Login;
