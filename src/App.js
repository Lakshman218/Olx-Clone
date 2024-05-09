import './App.css';
import Home from './Pages/Home'
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import Create from './Pages/Create'
import View from './Pages/ViewPost'
import Post from './store/PostContext';
import React, { useContext, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {AuthContext, FirebaseContext} from './store/FirebaseContext'

function App() {
  const {user,setUser} = useContext(AuthContext)
  const {firebase} = useContext(FirebaseContext)
  useEffect(()=>{
    firebase.auth().onAuthStateChanged((user)=>{
      setUser(user)
    })
  },[user])
  return (
    <div className="App">
      <Post>

      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/signup" element={<Signup/>}></Route>
          <Route path="/Login" element={<Login/>}></Route>
          <Route path="/Create" element={<Create/>}></Route>
          <Route path="/View" element={<View/>}></Route>
        </Routes>
      </BrowserRouter>
      </Post>
    </div>
  );  
}

export default App;
