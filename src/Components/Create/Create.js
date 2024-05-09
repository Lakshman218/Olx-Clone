import React, { Fragment, useContext, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import {AuthContext, FirebaseContext} from '../../store/FirebaseContext'
import { useNavigate } from 'react-router-dom';

const Create = () => {
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState('')
  const [image, setImage] = useState(null)

  const {firebase} = useContext(FirebaseContext)
  const {user} = useContext(AuthContext)
  const Navigate = useNavigate()
  const date = new Date()

  const handleSubmit = ()=>{
    if (!name.trim()) {
      alert('Name cannot be empty or contain only whitespaces.');
      return;
    }
    if (!category.trim()) {
      alert('Category cannot be empty or contain only whitespaces.');
      return;
    }
    const parsedPrice = parseFloat(price);
  if (isNaN(parsedPrice) || !isFinite(parsedPrice) || parsedPrice <= 0) {
    alert('Price should be a valid number greater than 0.');
    return;
  }
    if (!image) {
      alert('Please choose an image.');
      return;
    }
    firebase.storage().ref(`/image/${image.name}`).put(image).then(({ref})=>{
      ref.getDownloadURL().then((url)=>{
        console.log(url);
        firebase.firestore().collection('products').add({
          name,
          category,
          price,
          url,
          userId:user.uid,
          CreatedAt:date.toDateString()
        })
        Navigate('/')
      })
    })
  }

  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              value={name}
              onChange={(e)=>setName(e.target.value)}
              id="fname"
              name="Name"
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              value={category}
              onChange={(e)=>setCategory(e.target.value)}
              id="fname"
              name="category"
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input className="input" 
            type="number"
            value={price}
            onChange={(e)=>setPrice(e.target.value)} 
            id="fname" 
            name="Price" />
            <br />
          
          <br />
          <img alt="Posts" width="200px" height="200px" src={image?URL.createObjectURL(image):''}></img>
          
            <br />
            <input onChange={(e)=>{
              setImage(e.target.files[0])
            }} type="file" />
            <br />
            <button onClick={handleSubmit} className="uploadBtn">upload and Submit</button>
          
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
