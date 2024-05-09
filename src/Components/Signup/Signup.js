import React, { useContext, useEffect, useState } from 'react';
import Logo from '../../olx-logo.png';
import './Signup.css';
import {FirebaseContext} from '../../store/FirebaseContext';
import { useNavigate } from 'react-router-dom';
import { ScaleLoader } from 'react-spinners';

export default function Signup() {

  const [loading, setlLoading] = useState(false)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const {firebase} = useContext(FirebaseContext)
  const Navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        Navigate('/');
      }
    });
    return () => unsubscribe();
  }, [firebase, Navigate]);


  const handleSubmit = (e)=>{
    e.preventDefault()

    if (!username.trim()) {
      alert('Username cannot be empty or contain only whitespaces.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Invalid email format.');
      return;
    }
    const phoneRegex = /^\d+$/;
    if (!phoneRegex.test(phone)) {
      alert('Phone should contain only numbers.');
      return;
    }
    if (password.length < 6) {
      alert('Password should be at least 6 characters long.');
      return;
    }
    setlLoading(true)
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((result)=>{
      result.user.updateProfile({displayName:username})
      .then(()=>{
        firebase.firestore().collection('users').add({
          id:result.user.uid,
          username:username,
          phone:phone
        }).then(()=>{
        setlLoading(false)
          Navigate('/login')
        })
      })
    })
    .catch((error)=>{
      setlLoading(false)
      console.error('Signup error:', error.message);
    })
  }

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        { loading ? (
          <ScaleLoader
          size={150}
          color={'#36D7B7'}
          loading={loading}
        />
        ) : (
        <form onSubmit={handleSubmit}> 
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            id="name"
            name="name"
            defaultValue="John"
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            id="email"
            name="email"
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            value={phone}
            onChange={(e)=>setPhone(e.target.value)}
            id="phone"
            name="phone"
            defaultValue="Doe"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            id="password"
            name="password"
            defaultValue="Doe"
          />
          <br />
          <br />
          <button>Signup</button>
        </form> 
        )}
        <a onClick={()=>Navigate('/Login')}>Login</a>
      </div>
    </div>
  );
}
